import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaReply, FaPaperPlane } from "react-icons/fa";
import { API_BASE_URL } from "../../utils/api.js";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get(`${API_BASE_URL}/contact`)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSendReply = async (msg) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setSending(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/contact/reply`, {
        email: msg.email,
        name: msg.name,
        originalMessage: msg.message,
        replyText: replyText,
      });

      toast.success(res.data.message || "Reply sent successfully!");
      setActiveReplyId(null);
      setReplyText("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8 bg-[#0A0A0A] text-white min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#D4AF37]">Contact Us Messages</h1>
          <p className="text-zinc-400 text-sm mt-1">View user inquiries and reply directly via email</p>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-zinc-400">No contact messages received yet.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl">
          {messages.map((msg) => (
            <div key={msg.message_id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                  <p className="text-sm text-[#D4AF37] font-medium">{msg.email}</p>
                </div>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>

              <div className="bg-black/60 p-4 rounded-xl border border-zinc-800/80 text-zinc-200 text-sm whitespace-pre-line leading-relaxed">
                "{msg.message}"
              </div>

              {/* Reply Button / Form */}
              {activeReplyId === msg.message_id ? (
                <div className="mt-2 bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Replying to {msg.email}
                  </h4>
                  <textarea
                    rows={4}
                    placeholder="Type your reply message to the user..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#D4AF37] p-3 rounded-xl text-sm text-white outline-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setActiveReplyId(null);
                        setReplyText("");
                      }}
                      className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(msg)}
                      disabled={sending}
                      className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-yellow-500 transition flex items-center gap-2 cursor-pointer"
                    >
                      <FaPaperPlane size={12} />
                      {sending ? "Sending Email..." : "Send Email Reply"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setActiveReplyId(msg.message_id);
                      setReplyText("");
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    <FaReply size={12} /> Reply to User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
