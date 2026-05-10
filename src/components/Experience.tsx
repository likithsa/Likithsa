'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeline = [
    {
        type: 'passion',
        period: '2026 — Present',
        title: 'Vibe Coder',
        company: 'freelancing',
        description: 'Exploring new tools and building cool projects through vibe coding.',
        tags: ['Claude Code', 'Antigravity', 'Google Gemini', 'Open AI'],
        icon: '◈',
        color: '#FFA500',
    },
    {
        type: 'work',
        period: '2025 — Present',
        title: 'Programmer Analyst Trainee',
        company: 'Cognizant',
        description: 'Building and optimizing middleware APIs to connect and streamline core banking services.',
        tags: ['Java', 'Enterprise Java', 'IBM MQ', 'IBM ACE', 'ESQL', 'SQL'],
        icon: '◈',
        color: '#FFA500',
    },
    {
        type: 'internsjip',
        period: '2024 — 2025',
        title: 'Backend Developer',
        company: 'MetatronCube software solutions - Cannada',
        description: 'Worked on building a backend solution using Facebook developer to automate Instagram engagement using OPENAI API.',
        tags: ['Node.js', 'Express.js', 'webhooks', 'Facebook Developer API', 'OPENAI API'],
        icon: '◎',
        color: '#FFB830',
    },
    {
        type: 'education',
        period: '2021 — 2025',
        title: 'Computer science and engineering',
        company: 'Global Academy of Technology',
        description: 'Specialized in Computer Science Engineering with expertise in software development, system design, and problem-solving across domains like algorithms, databases, and networks.',
        tags: ['React', 'MongoDB', 'AWS', 'Docker'],
        icon: '◇',
        color: '#FF8C00',
    },
];

const Experience = () => {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <section id="experience" className="relative pt-12 pb-20 md:pt-20 md:pb-32 scroll-mt-4 overflow-hidden">
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
                width: 800, height: 400,
                background: 'radial-gradient(ellipse, rgba(255,140,0,0.04) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <span className="font-orbitron text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(255,165,0,0.6)' }}>
                        — Journey —
                    </span>
                    <h2 className="font-orbitron font-black mt-3" style={{
                        fontSize: 'clamp(2rem, 6vw, 5rem)',
                        background: 'linear-gradient(135deg, #fff 0%, #FFA500 60%, #FF8C00 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                        EXPERIENCE
                    </h2>
                </motion.div>

                {/* ── Desktop: Alternating timeline ── */}
                <div className="hidden md:block relative">
                    {/* Glowing center line */}
                    <div style={{
                        position: 'absolute', left: '50%', top: 0, bottom: 0,
                        width: 2, transform: 'translateX(-50%)',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,165,0,0.5) 20%, rgba(255,165,0,0.5) 80%, transparent 100%)',
                    }}>
                        {/* Animated glow ball */}
                        <motion.div
                            style={{
                                width: 8, height: 8, borderRadius: '50%',
                                background: '#FFA500',
                                boxShadow: '0 0 15px rgba(255,165,0,0.9), 0 0 30px rgba(255,165,0,0.5)',
                                marginLeft: -3, position: 'absolute',
                            }}
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>

                    {/* Timeline items — Desktop */}
                    <div className="space-y-12">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Content side */}
                                <div className={`w-[calc(50%-2rem)] ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <TimelineCard item={item} i={i} expanded={expanded} setExpanded={setExpanded} align={i % 2 === 0 ? 'right' : 'left'} />
                                </div>

                                {/* Center dot */}
                                <div style={{
                                    position: 'absolute', left: '50%', top: 20,
                                    transform: 'translateX(-50%)',
                                    width: 16, height: 16, borderRadius: '50%',
                                    background: item.color,
                                    boxShadow: `0 0 12px ${item.color}, 0 0 30px ${item.color}60`,
                                    border: '2px solid rgba(0,0,0,0.6)',
                                    zIndex: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <div style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.9)',
                                    }} />
                                </div>

                                {/* Empty side */}
                                <div className="w-[calc(50%-2rem)]" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Mobile: Vertical left-aligned timeline ── */}
                <div className="md:hidden relative pl-8">
                    {/* Left line */}
                    <div style={{
                        position: 'absolute', left: 8, top: 0, bottom: 0,
                        width: 2,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,165,0,0.5) 10%, rgba(255,165,0,0.5) 90%, transparent 100%)',
                    }} />

                    {/* Timeline items — Mobile */}
                    <div className="space-y-6">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                                className="relative"
                            >
                                {/* Left dot */}
                                <div style={{
                                    position: 'absolute', left: -24, top: 20,
                                    width: 14, height: 14, borderRadius: '50%',
                                    background: item.color,
                                    boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}60`,
                                    border: '2px solid rgba(0,0,0,0.6)',
                                    zIndex: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <div style={{
                                        width: 5, height: 5, borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.9)',
                                    }} />
                                </div>

                                <TimelineCard item={item} i={i} expanded={expanded} setExpanded={setExpanded} align="left" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── Reusable Timeline Card ── */
const TimelineCard = ({
    item,
    i,
    expanded,
    setExpanded,
    align,
}: {
    item: typeof timeline[0];
    i: number;
    expanded: number | null;
    setExpanded: (v: number | null) => void;
    align: 'left' | 'right';
}) => (
    <motion.div
        className="glass-panel rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => setExpanded(expanded === i ? null : i)}
        whileHover={{ scale: 1.02, borderColor: 'rgba(255,165,0,0.3)' }}
        transition={{ duration: 0.2 }}
        style={{ border: `1px solid ${expanded === i ? 'rgba(255,165,0,0.35)' : 'rgba(255,165,0,0.1)'}` }}
    >
        {/* Card top */}
        <div className="p-4 sm:p-6 relative">
            <div className="font-orbitron text-[10px] sm:text-xs tracking-widest mb-2" style={{ color: item.color, opacity: 0.8 }}>
                {item.period}
            </div>
            <h3 className="font-orbitron font-bold text-xs sm:text-sm mb-1" style={{ color: '#fff' }}>
                {item.title}
            </h3>
            <div style={{ color: 'rgba(255,165,0,0.6)', fontSize: '0.7rem', fontFamily: 'var(--font-inter-gf, Inter)', letterSpacing: '0.05em' }}>
                {item.company}
            </div>

            {/* Expand indicator */}
            <motion.div
                style={{
                    position: 'absolute', top: 14,
                    [align === 'right' ? 'left' : 'right']: 14,
                    color: 'rgba(255,165,0,0.75)', fontSize: '1.25rem',
                    fontFamily: 'var(--font-inter-gf, Inter)', lineHeight: 1,
                }}
                animate={{ rotate: expanded === i ? 180 : 0 }}
                transition={{ duration: 0.25 }}
            >
                ▾
            </motion.div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
            {expanded === i && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <div style={{ height: 1, background: 'rgba(255,165,0,0.15)', marginBottom: 16 }} />
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', fontFamily: 'var(--font-inter-gf, Inter)', lineHeight: 1.65, marginBottom: 14, textAlign: 'left' }}>
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2" style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
                            {item.tags.map((tag) => (
                                <span key={tag} style={{
                                    padding: '3px 10px', borderRadius: 20,
                                    background: 'rgba(255,165,0,0.08)', border: '1px solid rgba(255,165,0,0.2)',
                                    color: 'rgba(255,165,0,0.8)', fontSize: '0.65rem', fontFamily: 'var(--font-inter-gf, Inter)',
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

export default Experience;
