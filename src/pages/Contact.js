import React, { useState } from "react";
import "../App.css";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "" // honeypot
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot

    if (!form.subject.trim() || !form.message.trim() || !isValidEmail(form.email)) {
      setStatus({ state: "error", msg: "Please provide a valid email, subject, and message." });
      return;
    }

    try {
      setStatus({ state: "sending", msg: "Sending…" });

      const templateParams = {
        from_name: form.name || "Anonymous",
        reply_to: form.email,
        subject: form.subject,
        message: form.message
      };

      // Owner notification (the one that emails you)
      await emailjs.send(
        "service_c1cyzaw",   // your Service ID
        "owner_notify",      // your owner template ID
        templateParams,
        "oyDRRTpTqxSpLSskx"  // your Public Key
      );

      // If using EmailJS Auto-Reply tab, no second send needed here.

      setStatus({ state: "sent", msg: "Thanks for reaching out! I’ll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      console.error(err);
      setStatus({ state: "error", msg: "Something went wrong. Please try again later." });
    }
  };

  const showSuccess = status.state === "sent";

  return (
    <div className="page-root">
      <main className="contact-wrap" role="main">
        <section className="contact-card">
          {!showSuccess ? (
            <>
              <header className="contact-header">
                <h1 className="contact-title">Contact</h1>
                <p className="contact-sub">Send me a note and I’ll get back to you.</p>
              </header>

              <form className="contact-form" onSubmit={onSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="hp"
                  aria-hidden="true"
                />

                <div className="grid">
                  <div className="field">
                    <label htmlFor="name">Name (optional)</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={onChange} autoComplete="name" />
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="subject">Subject *</label>
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={onChange} required />
                </div>

                <div className="field">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="8" value={form.message} onChange={onChange} required />
                </div>

                <div className="actions">
                  <button className="btn-primary" type="submit" disabled={status.state === "sending"}>
                    {status.state === "sending" ? "Sending…" : "Submit"}
                  </button>
                  {status.msg && status.state === "error" && (
                    <span className="status status-error" role="status">{status.msg}</span>
                  )}
                </div>
              </form>
            </>
          ) : (
            // Success screen
            <div className="contact-success">
              <h1 className="contact-title">Thanks for reaching out!</h1>
              <p className="contact-sub">Your message was sent successfully. I’ll reply as soon as I can.</p>
              <div style={{ marginTop: 12 }}>
                <a href="/" className="btn-primary">Return Home</a>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}