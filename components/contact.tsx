"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const contactInfo = [
  {
    Icon: Mail,
    label: "Email",
    value: "info@mobilograf.uz",
    href: "mailto:info@mobilograf.uz",
  },
  {
    Icon: Phone,
    label: "Telefon",
    value: "+998 90 123 45 67",
    href: "tel:+998901234567",
  },
  {
    Icon: MapPin,
    label: "Manzil",
    value: "Toshkent, O'zbekiston",
    href: null,
  },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => setStatus("idle");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&family=Anton&display=swap');

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(220,38,38,0.15);
          color: #fff;
          padding: 14px 18px;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          resize: none;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.18); }
        .contact-input:focus {
          border-color: rgba(220,38,38,0.55);
          background: rgba(220,38,38,0.04);
          box-shadow: 0 0 20px rgba(220,38,38,0.08);
        }

        .contact-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          display: block;
          margin-bottom: 7px;
        }

        .send-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          width: 100%;
          padding: 16px;
          background: #dc2626;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .send-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.06);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .send-btn:hover:not(:disabled)::after { opacity: 1; }
        .send-btn:hover:not(:disabled) {
          background: #b91c1c;
          box-shadow: 0 0 40px rgba(220,38,38,0.4);
        }
        .send-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(220,38,38,0.04);
          border: 1px solid rgba(220,38,38,0.12);
          transition: border-color 0.3s, background 0.3s;
        }
        .info-card:hover {
          border-color: rgba(220,38,38,0.3);
          background: rgba(220,38,38,0.07);
        }
        .info-icon {
          width: 40px; height: 40px;
          border: 1px solid rgba(220,38,38,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .section-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(220,38,38,0.7);
        }
        .section-title {
          font-family: 'Anton', sans-serif;
          letter-spacing: 0.02em;
          line-height: 0.9;
        }
        .mono { font-family: 'Space Mono', monospace; }
      `}</style>

      <section
        id="contact"
        className="relative py-28 px-6 overflow-hidden"
        style={{ background: "#060606" }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Red glow top-right */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        {/* Left vertical accent */}
        <div
          className="absolute left-0 top-1/4 bottom-1/4 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(220,38,38,0.3), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <p className="section-tag mb-3">▸ Aloqa</p>
            <h2
              className="section-title text-white"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              BOG'LANING VA
              <br />
              <span style={{ color: "#dc2626" }}>BOSHLANG</span>
            </h2>
            <div
              className="mt-6"
              style={{
                height: 1,
                width: 80,
                background: "linear-gradient(90deg, #dc2626, transparent)",
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-4"
            >
              <p className="mono text-xs text-white/25 tracking-widest mb-2">
                MA'LUMOTLAR
              </p>

              {contactInfo.map(({ Icon, label, value, href }) => (
                <div key={label} className="info-card">
                  <div className="info-icon">
                    <Icon size={16} color="#dc2626" />
                  </div>
                  <div>
                    <p className="mono text-xs text-white/25 tracking-widest mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mono text-xs text-white/75 hover:text-red-400 transition-colors tracking-wide"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mono text-xs text-white/75 tracking-wide">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Decorative block */}
              <div
                className="mt-4 p-5"
                style={{
                  border: "1px solid rgba(220,38,38,0.1)",
                  background: "rgba(220,38,38,0.03)",
                }}
              >
                <p className="mono text-xs text-white/20 tracking-widest leading-relaxed">
                  Kurs yoki hamkorlik bo'yicha savollaringiz bo'lsa — yozing. 24
                  soat ichida javob beramiz.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="mono text-xs text-white/20 tracking-widest">
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <AnimatePresence mode="wait">
                {/* SUCCESS */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center gap-6 py-20 text-center"
                    style={{
                      border: "1px solid rgba(34,197,94,0.2)",
                      background: "rgba(34,197,94,0.03)",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 14,
                        delay: 0.1,
                      }}
                    >
                      <CheckCircle
                        size={56}
                        color="#22c55e"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <div>
                      <p className="section-title text-white text-3xl mb-3">
                        YUBORILDI!
                      </p>
                      <p className="mono text-xs text-white/30 tracking-widest leading-relaxed">
                        Xabaringiz muvaffaqiyatli qabul qilindi.
                        <br />
                        Tez orada siz bilan bog'lanamiz.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="send-btn"
                      style={{
                        maxWidth: 240,
                        background: "transparent",
                        border: "1px solid rgba(220,38,38,0.4)",
                      }}
                    >
                      Yana yuborish
                    </button>
                  </motion.div>
                )}

                {/* ERROR */}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center gap-6 py-20 text-center"
                    style={{
                      border: "1px solid rgba(220,38,38,0.2)",
                      background: "rgba(220,38,38,0.03)",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 14,
                        delay: 0.1,
                      }}
                    >
                      <AlertCircle
                        size={56}
                        color="#dc2626"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <div>
                      <p className="section-title text-white text-3xl mb-3">
                        XATOLIK!
                      </p>
                      <p className="mono text-xs text-white/30 tracking-widest leading-relaxed">
                        Xabar yuborilmadi. Iltimos,
                        <br />
                        qayta urinib ko'ring.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="send-btn"
                      style={{ maxWidth: 240 }}
                    >
                      Qayta urinish
                    </button>
                  </motion.div>
                )}

                {/* FORM */}
                {(status === "idle" || status === "loading") && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="contact-label">Ismingiz</label>
                        <input
                          className="contact-input"
                          type="text"
                          name="firstName"
                          placeholder="SHOXJAXON"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          disabled={status === "loading"}
                        />
                      </div>
                      <div>
                        <label className="contact-label">Familiya</label>
                        <input
                          className="contact-input"
                          type="text"
                          name="lastName"
                          placeholder="Ahmedov"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          disabled={status === "loading"}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="contact-label">
                        Telefon raqamingiz
                      </label>
                      <input
                        className="contact-input"
                        type="text"
                        name="phone"
                        placeholder="+998 90 123 45 67"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="contact-label">Xabar</label>
                      <textarea
                        className="contact-input"
                        name="message"
                        placeholder="Xabaringizni yozing..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="send-btn"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Yuborilmoqda...
                        </>
                      ) : (
                        "Xabar yuborish"
                      )}
                    </button>

                    {/* Bottom info */}
                    <p className="mono text-xs text-white/15 tracking-widest text-center">
                      Xabaringiz Telegram orqali qabul qilinadi
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
