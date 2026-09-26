"use client"

import { Card } from "@/components/Card";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import React from "react";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Let's Talk</h1>
            <p className="text-xl text-dim-gray dark:text-silver leading-relaxed mb-12">
                Have a project in mind? We'd love to hear about it. Every inquiry is personally reviewed by our founders.
            </p>

            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dim-gray/5 dark:bg-white/5 flex items-center justify-center">
                        <Mail size={20} className="text-rich-black dark:text-white-smoke" />
                    </div>
                    <div>
                        <p className="text-sm text-dim-gray dark:text-silver">Email us at</p>
                        <a href="mailto:neuralabs.marketing02@gmail.com" className="text-lg font-semibold hover:text-gold transition-colors">neuralabs.marketing02@gmail.com</a>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dim-gray/5 dark:bg-white/5 flex items-center justify-center">
                        <MapPin size={20} className="text-rich-black dark:text-white-smoke" />
                    </div>
                    <div>
                         <p className="text-sm text-dim-gray dark:text-silver">Based in</p>
                        <p className="text-lg font-semibold">Pangasinan, Philippines & Remote</p>
                    </div>
                </div>
            </div>
            
             <p className="mt-12 text-sm text-dim-gray dark:text-silver">
                We usually respond within 24 hours.
            </p>
        </div>

        <div className="md:w-1/2">
            <Card className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-dim-gray/5 dark:bg-white/5 border border-transparent focus:border-gold outline-none transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                             <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-dim-gray/5 dark:bg-white/5 border border-transparent focus:border-gold outline-none transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                        <textarea 
                            id="message"
                            rows={6} 
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-dim-gray/5 dark:bg-white/5 border border-transparent focus:border-gold outline-none transition-colors resize-none"
                            placeholder="Tell us about your project..."
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 rounded-full bg-rich-black text-white dark:bg-white-smoke dark:text-rich-black font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Sending..." : "Send Message"} <ArrowRight size={20} />
                    </button>

                    {status === "success" && (
                        <p className="text-green-600 dark:text-green-400 text-center font-medium">
                            Message sent successfully! We'll get back to you soon.
                        </p>
                    )}
                    {status === "error" && (
                        <p className="text-red-600 dark:text-red-400 text-center font-medium">
                            Failed to send message. Please try again or email us directly.
                        </p>
                    )}
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}
