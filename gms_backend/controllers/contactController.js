import db from "../config.js";
import { sendEmail } from "../utils/mailer.js";

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

  const sent = await sendEmail({
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

  if (sent) {
    res.status(200).json({ message: "Reply email sent successfully!" });
  } else {
    res.status(500).json({ error: "Failed to send reply email." });
  }
};

