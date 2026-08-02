import nodemailer from "nodemailer";

const getCredentials = () => {
  const user = (
    process.env.EMAIL_USER ||
    process.env.email_user ||
    process.env.MAIL_USER ||
    process.env.GMAIL_USER ||
    process.env.SENDER_EMAIL ||
    "powerzonefitnesssupport@gmail.com"
  ).trim().replace(/^["']|["']$/g, "");

  const pass = (
    process.env.EMAIL_PASS ||
    process.env.email_pass ||
    process.env.MAIL_PASS ||
    process.env.GMAIL_PASS ||
    process.env.EMAIL_PASSWORD ||
    ""
  ).replace(/\s+/g, "").replace(/^["']|["']$/g, "");

  return { user, pass };
};

export const getTransporter = () => {
  const { user, pass } = getCredentials();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  const { user, pass } = getCredentials();

  if (!user || !pass) {
    const errMsg = `EMAIL_PASS environment variable is missing on server. Please check Render Environment settings.`;
    console.error("❌ Email failed:", errMsg);
    return { success: false, error: errMsg };
  }

  // 1. HTTP Resend API fallback if RESEND_API_KEY is provided
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Power Zone Gym <onboarding@resend.dev>",
          to: [to],
          subject,
          html
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Email sent via Resend HTTP API to ${to}`);
        return { success: true, info: data };
      }
    } catch (e) {
      console.error("Resend API failed, falling back to SMTP:", e.message);
    }
  }

  // 2. Try Port 587 (STARTTLS)
  try {
    const transporter587 = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
      tls: { rejectUnauthorized: false }
    });

    const info = await transporter587.sendMail({
      from: `"Power Zone Gym" <${user}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent via SMTP Port 587 to ${to} (ID: ${info.messageId})`);
    return { success: true, info };
  } catch (err587) {
    console.warn("⚠️ Port 587 connection timed out, trying Port 465 (SSL)...", err587.message);

    // 3. Try Port 465 (SSL)
    try {
      const transporter465 = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user, pass },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000,
        tls: { rejectUnauthorized: false }
      });

      const info = await transporter465.sendMail({
        from: `"Power Zone Gym" <${user}>`,
        to,
        subject,
        html,
      });

      console.log(`✅ Email sent via SMTP Port 465 to ${to} (ID: ${info.messageId})`);
      return { success: true, info };
    } catch (err465) {
      console.error(`❌ Both SMTP ports timed out. Render may be blocking outbound SMTP.`, err465.message);
      return { success: false, error: "Outbound SMTP port blocked on cloud host: " + err465.message };
    }
  }
};


