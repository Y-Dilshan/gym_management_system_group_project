import db from "../config.js";
import { sendEmail } from "../utils/mailer.js";

// Ensure table exists on server start
const initContactTable = () => {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS contact_messages (
      message_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(createTableSql, (err) => {
    if (err) console.error("Error creating contact_messages table:", err);
  });
};
initContactTable();

// 1. Submit a new contact message (User)
export const createContactMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields (name, email, message) are required" });
  }

  const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error saving message:", err);
      return res.status(500).json({ error: "Failed to send message" });
    }
    res.status(201).json({ message: "Your message has been sent successfully!" });
  });
};

// 2. Get all contact messages (Admin)
export const getContactMessages = (req, res) => {
  const sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
    res.status(200).json(results);
  });
};

// 3. Send email reply to user (Admin)
export const replyContactMessage = async (req, res) => {
  const { email, replyText, name, originalMessage } = req.body;

  if (!email || !replyText) {
    return res.status(400).json({ error: "Email and reply text are required" });
  }

  const result = await sendEmail({
    to: email,
    subject: "Reply from Power Zone Gym Support",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #D4AF37;">Power Zone Gym</h2>
        <p>Hi ${name || "Member"},</p>
        <p>Thank you for reaching out to us. Here is our reply to your message:</p>
        <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #D4AF37; margin: 15px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 15px; color: #111;">${replyText}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">Your original message: <em>"${originalMessage || ""}"</em></p>
      </div>
    `,
  });

  const isSuccess = result === true || result?.success === true;

  if (isSuccess) {
    res.status(200).json({ message: "Reply email sent successfully!" });
  } else {
    const errMsg = result?.error || "Failed to send reply email.";
    res.status(500).json({ error: errMsg });
  }
};

