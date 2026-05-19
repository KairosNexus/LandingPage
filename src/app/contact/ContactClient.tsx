"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Send, MessageCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_m61nt2b";
const TEMPLATE_ID = "template_8dwls2b";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE";

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    intent: "talent",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.intent === "talent" ? "Job Seeker Inquiry" : "Business Hiring Inquiry",
          company: formData.company || "N/A",
          intent: formData.intent === "talent" ? "Job Seeker" : "Business/Hiring",
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", company: "", intent: "talent", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@kairosng.com", "security@kairosng.com"],
      desc: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Schedule a Call",
      details: ["Book a demo", "Speak with our team"],
      desc: "Mon–Fri, 9am–6pm EST",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["Kairos Nexus Global"],
      desc: "Remote-first, globally distributed",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-zinc-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <Link
            href="/"
            className="inline-flex items-center text-zinc-500 hover:text-[#C2185B] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="text-center">
            <span className="text-[#C2185B] font-bold text-xs uppercase tracking-widest mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold dark:text-white leading-tight mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
              Whether you're seeking talent or seeking work, we're here to help. Reach out and let's explore how Kairos can work for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800"
              >
                <div className="w-12 h-12 bg-[#C2185B]/10 rounded-xl mb-4 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-[#C2185B]" />
                </div>
                <h3 className="font-bold text-lg mb-3 dark:text-white">{info.title}</h3>
                <div className="space-y-1 mb-2">
                  {info.details.map((detail, dIdx) => (
                    <p key={dIdx} className="text-zinc-900 dark:text-white font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{info.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-zinc-900 p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-pink-500/5 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="w-6 h-6 text-[#C2185B]" />
                <h2 className="text-2xl font-bold dark:text-white">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:border-transparent outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:border-transparent outline-none transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      I am a...
                    </label>
                    <select
                      value={formData.intent}
                      onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:border-transparent outline-none transition-all"
                    >
                      <option value="talent">Job Seeker (Talent)</option>
                      <option value="company">Business (Hiring Company)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your goals, challenges, or questions..."
                  />
                </div>

                {status === "success" && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl mb-4">
                    <p className="text-green-700 dark:text-green-300 font-medium text-center">
                      Thanks for reaching out! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl mb-4">
                    <p className="text-red-700 dark:text-red-300 font-medium text-center">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#C2185B] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#A3154D] transition-all shadow-lg shadow-pink-500/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How quickly will I hear back?",
                a: "We respond to all inquiries within 24 hours. For urgent matters, please indicate in your message.",
              },
              {
                q: "Do you support international clients?",
                a: "Yes! Kairos is built for global connectivity. We support users from over 50 countries worldwide.",
              },
              {
                q: "What's the best way to reach you for security concerns?",
                a: "For security issues, please email security@kairosng.com directly for our dedicated team.",
              },
              {
                q: "Can I schedule a demo?",
                a: "Absolutely! Book a demo call through our contact form and we'll walk you through the platform.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800"
              >
                <h3 className="font-bold text-lg mb-3 dark:text-white">{faq.q}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
