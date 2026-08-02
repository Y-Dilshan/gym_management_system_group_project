import nodemailer from "nodemailer";

export const getTransporter = () => {
  const user = (process.env.EMAIL_USER || "").trim().replace(/^["']|["']$/g, "");
  const pass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").replace(/^["']|["']$/g, "");

  if (!user || !pass) {
    console.warn("⚠️ EMAIL_USER or EMAIL_PASS environment variables are missing!");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const user = (process.env.EMAIL_USER || "").trim().replace(/^["']|["']$/g, "");
    const pass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").replace(/^["']|["']$/g, "");

    if (!user || !pass) {
      const errMsg = `EMAIL_USER or EMAIL_PASS environment variables are missing (EMAIL_USER set: ${!!user}, EMAIL_PASS set: ${!!pass})`;
      console.error("❌ Email failed:", errMsg);
      return { success: false, error: errMsg };
    }

    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Power Zone Gym" <${user}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent successfully to ${to} (Message ID: ${info.messageId})`);
    return { success: true, info };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};
