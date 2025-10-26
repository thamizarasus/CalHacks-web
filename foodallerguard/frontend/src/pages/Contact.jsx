import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Message sent! Our team will get back to you shortly.");
  };

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Heading */}
        <h3 className="text-center text-[#A64C2E] font-semibold mb-2">Get in Touch</h3>
        <p className="text-center text-gray-600 mb-10">
          Have questions, feedback, or need support? We'd love to hear from you. Our team typically
          responds within 24 hours.
        </p>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-5">
            <div className="flex gap-4">
              <input
                required name="name" value={formData.name} onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#A64C2E]"
              />
              <input
                required name="email" value={formData.email} onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#A64C2E]"
              />
            </div>

            <input
              required name="subject" value={formData.subject} onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#A64C2E]"
            />

            <textarea
              required name="message" value={formData.message} onChange={handleChange}
              placeholder="Message"
              rows="4"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#A64C2E]"
            />

            <button
              type="submit"
              className="w-full bg-[#A64C2E] text-white py-3 rounded-lg font-semibold hover:bg-[#883E25]"
            >
              ✈ Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <div className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-[#A64C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                support@foodallerguard.com
              </div>
              <div className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-[#A64C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                +1 (555) ALLERGEN
              </div>
              <div className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-[#A64C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                123 Health Tech Drive, San Francisco, CA 94102
              </div>
              <div className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-[#A64C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Live Chat: Mon–Fri, 9 AM – 6 PM PST
              </div>
            </div>

            <div className="bg-[#FFF7E8] rounded-xl shadow p-6">
              <h4 className="font-semibold mb-3">Quick Response Time</h4>
              <p className="text-gray-500 mb-4">
                Our support team is committed to responding to inquiries within business hours.
              </p>
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-[#A64C2E] text-3xl font-bold">&lt;24h</p>
                  <p className="text-gray-600 text-sm">Email Response</p>
                </div>
                <div>
                  <p className="text-[#A64C2E] text-3xl font-bold">&lt;2min</p>
                  <p className="text-gray-600 text-sm">Live Chat</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <h3 className="text-center font-semibold mt-16 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4 mx-auto max-w-2xl">
          {[
            "How accurate is FoodAllerGuard?",
            "Is my data secure?",
            "Can I use FoodAllerGuard for family members?",
            "What if a menu item isn't recognized?"
          ].map((q, index) => (
            <details key={index} className="bg-white rounded-lg shadow p-4 cursor-pointer">
              <summary className="font-medium">{q}</summary>
              <p className="text-gray-600 mt-3">
                We are constantly improving our AI model to provide the best possible results.
              </p>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}

