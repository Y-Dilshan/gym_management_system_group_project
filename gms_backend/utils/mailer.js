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
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { user, pass } = getCredentials();

    if (!user || !pass) {
      const errMsg = `EMAIL_PASS environment variable is missing on server. Please check Render Environment settings for gym_management_system_group_project-3.`;
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

