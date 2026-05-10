'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

/* ── EmailJS Config from Environment Variables ── */
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_CONTACT_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

interface ContactProps {
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

const contactItems = [
    {
        icon: <FaEnvelope size={22} />,
        label: 'EMAIL',
        sublabel: 'likithsa01@gmail.com',
        href: 'mailto:likithsa01@gmail.com',
        color: '#FFA500',
        glow: 'rgba(255,165,0,0.4)',
        delay: 0,
    },
    {
        icon: <FaLinkedin size={22} />,
        label: 'LINKEDIN',
        sublabel: '/in/likithsa',
        href: 'https://www.linkedin.com/in/likith-sa/',
        color: '#0A95D0',
        glow: 'rgba(10,149,208,0.4)',
        delay: 0.1,
    },
    {
        icon: <FaGithub size={22} />,
        label: 'GITHUB',
        sublabel: '/likithsa',
        href: 'https://github.com/likithsa',
        color: '#e0e0e0',
        glow: 'rgba(220,220,220,0.3)',
        delay: 0.2,
    },
    {
        icon: <FaInstagram size={22} />,
        label: 'INSTAGRAM',
        sublabel: '@likith_s_a',
        href: 'https://www.instagram.com/likith_s_a',
        color: '#E1306C',
        glow: 'rgba(225,48,108,0.3)',
        delay: 0.3,
    },
];

const Contact = ({ onHoverStart, onHoverEnd }: ContactProps) => {
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        /* Validate email with regex */
        const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('error');
            setErrorMsg('INVALID COMMLINK — Enter a valid email address');
            setTimeout(() => setStatus('idle'), 4000);
            return;
        }

        /* Validate message length */
        if (formData.message.trim().length < 10) {
            setStatus('error');
            setErrorMsg('MESSAGE TOO SHORT — Minimum 10 characters required');
            setTimeout(() => setStatus('idle'), 4000);
            return;
        }

        setStatus('sending');

        const now = new Date();
        const timeStr = now.toLocaleString('en-IN', {
            dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata',
        });

        const templateParams = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            time: timeStr,
        };

        try {
            /* Send contact notification to you.
               The auto-reply to the visitor is handled by the
               Auto-Reply tab configured on this template in EmailJS,
               so we only need a single send call. */
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_CONTACT_TEMPLATE,
                templateParams,
                EMAILJS_PUBLIC_KEY,
            );

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            if (formRef.current) formRef.current.reset();

            /* Reset back to idle after 5 seconds */
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err: any) {
            console.error('EmailJS Error:', err);
            setErrorMsg(err?.text || 'Transmission failed. Please try again.');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden flex flex-col justify-center pt-12 md:pt-16 pb-16 md:pb-10 scroll-mt-4"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >

            {/* Ambient glow center */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 600, height: 400, borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(255,140,0,0.07) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-6"
                >
                    <span className="font-orbitron text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(255,165,0,0.5)' }}>
                        — Establish Connection —
                    </span>
                    <h2 className="font-orbitron font-black mt-3 mb-3" style={{
                        fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                        background: 'linear-gradient(135deg, #fff 0%, #FFD700 40%, #FF8C00 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                        LET'S BUILD
                    </h2>
                    <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
                        INITIATE · CONNECT · CREATE
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mt-4 lg:mt-6 w-full">

                    {/* LEFT COLUMN: Contact Items */}
                    <div className="lg:col-span-5 flex flex-col w-full">
                        {/* System status bar — holographic UI element */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full mb-4"
                            style={{
                                height: 1,
                                background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.6), transparent)',
                                boxShadow: '0 0 15px rgba(255,165,0,0.3)',
                            }}
                        />

                        {/* Futuristic control panel — contact items */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-panel rounded-3xl overflow-hidden relative"
                            style={{ border: '1px solid rgba(255,165,0,0.15)' }}
                        >
                            {/* Panel header */}
                            <div style={{
                                borderBottom: '1px solid rgba(255,165,0,0.1)',
                                padding: '16px 24px',
                                display: 'flex', alignItems: 'center', gap: 10,
                            }}>
                                {/* Traffic lights */}
                                {['rgba(255,100,80,0.7)', 'rgba(255,180,0,0.7)', 'rgba(0,200,80,0.7)'].map((c, i) => (
                                    <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                                ))}
                                <span className="font-orbitron text-xs ml-4 tracking-widest" style={{ color: 'rgba(255,165,0,0.5)' }}>
                                    COMM_INTERFACE v2.4
                                </span>
                                {/* Animated status dot */}
                                <motion.div
                                    style={{
                                        marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                                        background: '#00FF88',
                                        boxShadow: '0 0 8px #00FF88',
                                    }}
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span style={{ color: '#00FF88', fontSize: '0.65rem', fontFamily: 'Orbitron, monospace' }}>ONLINE</span>
                            </div>

                            {/* Contact items */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                                {contactItems.map((item, i) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        transition={{ duration: 0.8, delay: 0.3 + item.delay, ease: [0.16, 1, 0.3, 1] }}
                                        onMouseEnter={() => setActiveItem(i)}
                                        onMouseLeave={() => setActiveItem(null)}
                                        className="relative group flex items-center gap-4 p-4 sm:p-6 cursor-pointer border-[#FFA500]/10 border-b last:border-b-0 sm:border-b-0 sm:[&:nth-child(-n+2)]:border-b sm:odd:border-r sm:even:border-r-0"
                                        style={{
                                            textDecoration: 'none',
                                            transition: 'background 0.3s',
                                            background: activeItem === i ? `${item.color}08` : 'transparent',
                                            minHeight: 64,
                                        }}
                                    >
                                        {/* Hover glow */}
                                        <AnimatePresence>
                                            {activeItem === i && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    style={{
                                                        position: 'absolute', inset: 0, pointerEvents: 'none',
                                                        background: `radial-gradient(ellipse at 20% 50%, ${item.color}10 0%, transparent 70%)`,
                                                    }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Icon circle */}
                                        <motion.div
                                            animate={{
                                                boxShadow: activeItem === i
                                                    ? `0 0 20px ${item.glow}, 0 0 40px ${item.glow}`
                                                    : `0 0 5px ${item.glow}`,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: `1px solid ${item.color}40`,
                                                background: `${item.color}10`,
                                                color: item.color,
                                                position: 'relative', zIndex: 1,
                                            }}
                                        >
                                            {item.icon}
                                        </motion.div>

                                        {/* Label */}
                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                            <div className="font-orbitron font-bold text-sm tracking-widest" style={{ color: activeItem === i ? item.color : '#fff' }}>
                                                {item.label}
                                            </div>
                                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
                                                {item.sublabel}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <motion.div
                                            animate={{ x: activeItem === i ? 4 : 0, opacity: activeItem === i ? 1 : 0.3 }}
                                            style={{ marginLeft: 'auto', color: item.color, fontSize: '1rem', position: 'relative', zIndex: 1 }}
                                        >
                                            →
                                        </motion.div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Footer strip */}
                            <div style={{
                                borderTop: '1px solid rgba(255,165,0,0.08)',
                                padding: '12px 24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <span style={{ color: 'rgba(255,165,0,0.3)', fontSize: '0.65rem', fontFamily: 'Orbitron, monospace', letterSpacing: '0.15em' }}>
                                    SYS/CONTACT_MODULE
                                </span>
                                <motion.span
                                    style={{ color: 'rgba(255,165,0,0.5)', fontSize: '0.65rem', fontFamily: 'Orbitron, monospace' }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    ● READY
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* CTA message */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center sm:text-left mt-4 text-sm"
                            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', lineHeight: 1.6 }}
                        >
                            Whether you have a project, a question, or just want to discuss the future of tech — I'm here.
                        </motion.p>
                    </div>

                    {/* RIGHT COLUMN: Contact Form */}
                    <div className="lg:col-span-7 w-full">
                        <motion.form
                            ref={formRef}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-panel rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden h-full justify-between"
                            style={{ border: '1px solid rgba(255,165,0,0.15)' }}
                            onSubmit={handleSubmit}
                        >
                            {/* Background glow for form */}
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(255,165,0,0.05) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 flex flex-col gap-2 relative z-10">
                                    <label className="font-orbitron text-xs tracking-widest text-[#FFA500]/70 uppercase">Name</label>
                                    <input required type="text" name="name" placeholder="Enter Designation"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        disabled={status === 'sending'}
                                        className="bg-black/40 border border-[#FFA500]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#FFA500]/60 focus:bg-[#FFA500]/10 transition-all font-inter disabled:opacity-50" />
                                </div>
                                <div className="flex-1 flex flex-col gap-2 relative z-10">
                                    <label className="font-orbitron text-xs tracking-widest text-[#FFA500]/70 uppercase">Email</label>
                                    <input required type="email" name="email" placeholder="Enter Commlink"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        disabled={status === 'sending'}
                                        className="bg-black/40 border border-[#FFA500]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#FFA500]/60 focus:bg-[#FFA500]/10 transition-all font-inter disabled:opacity-50" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 relative z-10 flex-1">
                                <label className="font-orbitron text-xs tracking-widest text-[#FFA500]/70 uppercase">Message</label>
                                <textarea required name="message" placeholder="Transmit Data Payload..."
                                    value={formData.message}
                                    minLength={10}
                                    maxLength={500}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    disabled={status === 'sending'}
                                    className="bg-black/40 border border-[#FFA500]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#FFA500]/60 focus:bg-[#FFA500]/10 transition-all font-inter resize-none h-full min-h-[120px] disabled:opacity-50" />
                                <div className="flex justify-end mt-1">
                                    <span style={{
                                        fontFamily: 'Orbitron, monospace', fontSize: '0.55rem', letterSpacing: '0.1em',
                                        color: formData.message.length > 480 ? 'rgba(255,68,68,0.7)'
                                            : formData.message.length < 10 && formData.message.length > 0 ? 'rgba(255,165,0,0.5)'
                                                : 'rgba(255,255,255,0.25)',
                                    }}>
                                        {formData.message.length} / 500
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="relative group overflow-hidden rounded-xl mt-2 p-[1px] z-10 cursor-pointer w-full sm:w-auto self-end disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#FFD700] rounded-xl opacity-70 group-hover:opacity-100 transition-opacity blur-[2px]" />
                                <div className="relative bg-black/80 group-hover:bg-transparent transition-colors duration-300 rounded-xl px-12 py-4 flex items-center justify-center gap-3">
                                    {status === 'sending' ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            <span className="font-orbitron font-bold text-sm tracking-widest text-white uppercase">Transmitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-orbitron font-bold text-sm tracking-widest text-white uppercase group-hover:text-black transition-colors duration-300">Transmit</span>
                                            <span className="text-[#FFA500] group-hover:text-black transition-colors duration-300 font-bold">↗</span>
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* Status feedback */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2 mt-2 z-10"
                                        style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#00FF88', letterSpacing: '0.12em' }}
                                    >
                                        <span style={{ fontSize: '1rem' }}>✓</span>
                                        TRANSMISSION SUCCESSFUL — Check your INBOX
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2 mt-2 z-10"
                                        style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#FF4444', letterSpacing: '0.12em' }}
                                    >
                                        <span style={{ fontSize: '1rem' }}>✗</span>
                                        {errorMsg || 'TRANSMISSION FAILED — Please retry'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
