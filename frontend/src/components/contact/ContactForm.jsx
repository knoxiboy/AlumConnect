import React, { useState } from 'react';
import { User, Mail, MessageCircle, Send } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                            placeholder="Your name"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                    placeholder="Subject of your message"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all resize-none"
                        placeholder="Your message..."
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ backgroundColor: '#9966CC' }}
            >
                <Send className="w-4 h-4" />
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;


