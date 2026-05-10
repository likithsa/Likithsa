'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ── SVG icon components ── */
const NextJsIcon = () => (
    <svg viewBox="0 0 180 180" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <mask id="nxt-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="white" />
        </mask>
        <g mask="url(#nxt-mask)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path d="M149.508 157.52L69.142 54H54v71.97h13.374V72.28l73.894 95.68a90.133 90.133 0 008.24-10.44z" fill="white" />
            <rect x="108" y="54" width="13.5" height="72" fill="white" />
        </g>
    </svg>
);

const GitIcon = () => (
    <svg viewBox="0 0 92 92" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <path d="M90.156 41.965 50.036 1.848a5.918 5.918 0 0 0-8.372 0l-8.328 8.332 10.566 10.566a7.03 7.03 0 0 1 7.23 1.684 7.043 7.043 0 0 1 1.672 7.266l10.184 10.184a7.032 7.032 0 0 1 7.269 1.672 7.043 7.043 0 0 1 0 9.957 7.043 7.043 0 0 1-9.957 0 7.05 7.05 0 0 1-1.528-7.664l-9.5-9.496V59.36a7.044 7.044 0 0 1 1.86 11.29 7.043 7.043 0 0 1-9.957 0 7.044 7.044 0 0 1 0-9.957 7.063 7.063 0 0 1 2.304-1.539V33.926a7.01 7.01 0 0 1-2.304-1.535 7.05 7.05 0 0 1-1.547-7.704L29.996 14.086 1.848 42.233a5.918 5.918 0 0 0 0 8.371L41.97 90.723a5.92 5.92 0 0 0 8.371 0l39.816-39.816a5.92 5.92 0 0 0 0-8.942z" fill="#F05032" />
    </svg>
);

const OracleSQLIcon = () => (
    <svg viewBox="0 0 100 40" width="38" height="16" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="20" rx="48" ry="18" fill="none" stroke="#F80000" strokeWidth="4" />
        <text x="50" y="26" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#F80000">SQL</text>
    </svg>
);

const IbmAceIcon = () => (
    <svg viewBox="0 0 60 30" width="38" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect width="8" height="22" x="2" y="4" rx="1" fill="#1F70C1" />
        <rect width="8" height="4" x="2" y="4" rx="1" fill="#1F70C1" />
        <rect width="8" height="4" x="2" y="13" rx="1" fill="#1F70C1" />
        <rect width="8" height="4" x="2" y="22" rx="1" fill="#1F70C1" />
        <text x="14" y="22" fontFamily="Arial" fontWeight="900" fontSize="15" fill="#1F70C1">IBM</text>
        <text x="2" y="30" fontFamily="Arial" fontWeight="700" fontSize="7" fill="#1F70C1" letterSpacing="0.5">ACE</text>
    </svg>
);

const VibeCodingIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="vibe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
        </defs>
        <path d="M9.5 3.5L6 9h3l-4 11.5L18 8.5h-4L18 3.5z" fill="url(#vibe-grad)" />
    </svg>
);

const AiToolsIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="33%" stopColor="#9B72CB" />
                <stop offset="66%" stopColor="#D96570" />
                <stop offset="100%" stopColor="#F4B400" />
            </linearGradient>
        </defs>
        <path d="M12 2L8 7H2l4 5-2 8 8-4 8 4-2-8 4-5h-6z" fill="url(#gem-grad)" />
    </svg>
);

const skills = [
    { name: 'Next.js', iconType: 'nextjs', category: 'Frontend', slot: 'A1' },
    { name: 'TypeScript', iconType: 'emoji', icon: 'TS', category: 'Language', slot: 'A2' },
    { name: 'Node.js', iconType: 'emoji', icon: '⬡', category: 'Backend', slot: 'A3' },
    { name: 'Python', iconType: 'emoji', icon: '🐍', category: 'Language', slot: 'B1' },
    { name: 'Java', iconType: 'emoji', icon: '☕', category: 'Language', slot: 'B2' },
    { name: 'Git', iconType: 'git', category: 'DevOps', slot: 'B3' },
    { name: 'AWS / Cloud', iconType: 'emoji', icon: '☁', category: 'DevOps', slot: 'C1' },
    { name: 'IBM ACE', iconType: 'ibmace', category: 'DevOps', slot: 'C2' },
    { name: 'TensorFlow', iconType: 'emoji', icon: '🧠', category: 'AI / ML', slot: 'C3' },
    { name: 'AI Tools', iconType: 'aitools', category: 'AI / ML', slot: 'D1' },
    { name: 'Oracle SQL', iconType: 'oraclesql', category: 'Database', slot: 'D2' },
    { name: 'Vibe Coding', iconType: 'vibe', category: 'Creative', slot: 'D3' },
];

const renderSkillIcon = (skill: typeof skills[0]) => {
    switch (skill.iconType) {
        case 'nextjs': return <NextJsIcon />;
        case 'git': return <GitIcon />;
        case 'oraclesql': return <OracleSQLIcon />;
        case 'ibmace': return <IbmAceIcon />;
        case 'vibe': return <VibeCodingIcon />;
        case 'aitools': return <AiToolsIcon />;
        default: return <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{skill.icon}</span>;
    }
};

const categoryColors: Record<string, string> = {
    Frontend: '#FFA500',
    Language: '#FFD700',
    Backend: '#FF8C00',
    Database: '#FFB830',
    DevOps: '#FF6A00',
    'AI / ML': '#FF4500',
    API: '#FFC300',
    Creative: '#a855f7',
};

/* ── Side panel ad slides ── */
const adSlides = [
    {
        icon: '◎',
        headline: 'NEURAL TAP',
        sub: 'Pay with a blink',
        tag: '2047 READY',
        color: '#00FFCC',
    },
    {
        icon: '◈',
        headline: 'RETINAL SCAN',
        sub: 'Eyes = identity',
        tag: 'BIO-CHAIN',
        color: '#FF4DC4',
    },
    {
        icon: '⬡',
        headline: 'CRYPTO PULSE',
        sub: 'Heartbeat wallet',
        tag: 'DEFI 4.0',
        color: '#FFA500',
    },
    {
        icon: '✦',
        headline: 'HOLO-COIN',
        sub: 'Light-speed ledger',
        tag: 'QUANTUM PAY',
        color: '#7DF9FF',
    },
];

/* ── Side Ad Panel ── */
const SidePanel = ({ side, className }: { side: 'left' | 'right', className?: string }) => {
    const [idx, setIdx] = useState(side === 'left' ? 0 : 2);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(i => (i + 1) % adSlides.length);
            setTick(t => t + 1);
        }, 3200);
        return () => clearInterval(id);
    }, []);

    const ad = adSlides[idx];
    const progress = (tick % 1); // just used to trigger re-render; bar handled by CSS animation key

    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className={`flex-col relative shrink-0 overflow-hidden rounded-2xl border border-[rgba(255,165,0,0.2)] bg-gradient-to-b from-[#0c0900] to-[#060400] ${className || 'flex'}`}
            style={{
                width: 140,
                alignSelf: 'stretch',
            }}
        >
            {/* Top strip */}
            <div style={{
                background: 'linear-gradient(90deg, #0a0700, #1a1100)',
                borderBottom: '1px solid rgba(255,165,0,0.2)',
                padding: '6px 8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
                {[0, 1, 2].map(i => (
                    <motion.div key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
                        style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#FFA500', boxShadow: '0 0 4px #FFA500' }}
                    />
                ))}
            </div>

            {/* Ad display area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 8px', position: 'relative' }}>

                {/* Scanlines */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,165,0,0.012) 3px, rgba(255,165,0,0.012) 4px)',
                }} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', zIndex: 2 }}
                    >
                        {/* Glow icon */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], filter: [`drop-shadow(0 0 6px ${ad.color})`, `drop-shadow(0 0 14px ${ad.color})`, `drop-shadow(0 0 6px ${ad.color})`] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: '1.8rem', color: ad.color, lineHeight: 1 }}
                        >
                            {ad.icon}
                        </motion.div>

                        {/* Headline */}
                        <span style={{
                            fontFamily: 'Orbitron, monospace', fontSize: '0.55rem',
                            letterSpacing: '0.1em', color: ad.color,
                            textAlign: 'center', fontWeight: 700, lineHeight: 1.2,
                        }}>
                            {ad.headline}
                        </span>

                        {/* Sub */}
                        <span style={{
                            fontFamily: 'Inter, sans-serif', fontSize: '0.47rem',
                            color: 'rgba(220,220,220,0.55)', textAlign: 'center', letterSpacing: '0.04em', lineHeight: 1.3,
                        }}>
                            {ad.sub}
                        </span>

                        {/* Tag badge */}
                        <div style={{
                            border: `1px solid ${ad.color}55`,
                            borderRadius: 3,
                            padding: '2px 5px',
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '0.38rem',
                            color: `${ad.color}99`,
                            letterSpacing: '0.12em',
                            background: `${ad.color}0d`,
                        }}>
                            {ad.tag}
                        </div>

                        {/* Fake QR-code grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 6px)', gap: 1.5, marginTop: 4 }}>
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} style={{
                                    width: 6, height: 6, borderRadius: 1,
                                    backgroundColor: Math.random() > 0.45 ? `${ad.color}88` : 'rgba(255,255,255,0.04)',
                                }} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress bar at bottom */}
            <div style={{ height: 2, background: 'rgba(255,165,0,0.1)', position: 'relative' }}>
                <motion.div
                    key={`bar-${idx}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.2, ease: 'linear' }}
                    style={{ height: '100%', background: ad.color, boxShadow: `0 0 6px ${ad.color}` }}
                />
            </div>

            {/* Bottom label */}
            <div style={{
                borderTop: '1px solid rgba(255,165,0,0.15)',
                padding: '5px 4px',
                textAlign: 'center',
                fontFamily: 'Orbitron, monospace',
                fontSize: '0.35rem',
                color: 'rgba(255,165,0,0.3)',
                letterSpacing: '0.1em',
            }}>
                {side === 'left' ? '◀ AD SYS' : 'AD SYS ▶'}
            </div>
        </motion.div>
    );
};

/* ── Individual vending slot (shorter) ── */
const SkillSlot = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
    const [hovered, setHovered] = useState(false);
    const [dispensed, setDispensed] = useState(false);
    const color = categoryColors[skill.category] ?? '#FFA500';

    const handleHover = () => {
        setHovered(true);
        setDispensed(true);
        setTimeout(() => setDispensed(false), 600);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={handleHover}
            onHoverEnd={() => setHovered(false)}
            onClick={handleHover}
            style={{ position: 'relative', cursor: 'pointer' }}
        >
            <motion.div
                animate={hovered
                    ? { borderColor: `${color}88`, boxShadow: `0 0 18px ${color}44, 0 0 5px ${color}22 inset` }
                    : { borderColor: 'rgba(255,165,0,0.15)', boxShadow: '0 0 0px transparent' }
                }
                transition={{ duration: 0.25 }}
                style={{
                    position: 'relative',
                    border: '1px solid rgba(255,165,0,0.15)',
                    borderRadius: 7,
                    background: 'rgba(4,3,1,0.9)',
                    overflow: 'hidden',
                    height: 'clamp(68px, 10vw, 80px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    padding: '6px 4px',
                }}
            >
                {/* Scanlines */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,165,0,0.015) 3px, rgba(255,165,0,0.015) 4px)',
                    zIndex: 1,
                }} />

                {/* Inner glass */}
                <motion.div
                    animate={hovered
                        ? { background: 'linear-gradient(135deg, rgba(20,14,2,0.95) 0%, rgba(40,26,2,0.9) 100%)' }
                        : { background: 'linear-gradient(135deg, rgba(10,7,1,0.9) 0%, rgba(18,12,1,0.85) 100%)' }
                    }
                    style={{ position: 'absolute', inset: 2, borderRadius: 5, backdropFilter: 'blur(6px)' }}
                />

                {/* Content */}
                <motion.div
                    animate={dispensed ? { y: [0, 5, -2, 0] } : { y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                >
                    <motion.div
                        animate={hovered ? { filter: `drop-shadow(0 0 7px ${color})`, scale: 1.15 } : { filter: 'none', scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ lineHeight: 1, userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {renderSkillIcon(skill)}
                    </motion.div>

                    <motion.span
                        animate={hovered ? { color } : { color: '#c8c8c8' }}
                        transition={{ duration: 0.2 }}
                        style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.5rem', letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.2, fontWeight: 600 }}
                    >
                        {skill.name}
                    </motion.span>
                </motion.div>

                {/* Slot label */}
                <div style={{ position: 'absolute', top: 4, left: 5, zIndex: 3, fontFamily: 'Orbitron, monospace', fontSize: '0.38rem', color: 'rgba(255,165,0,0.3)', letterSpacing: '0.08em' }}>
                    {skill.slot}
                </div>

                {/* Bottom LED */}
                <motion.div
                    animate={hovered ? { opacity: 1, backgroundColor: color } : { opacity: 0.25, backgroundColor: 'rgba(255,165,0,0.4)' }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', zIndex: 3 }}
                />

                {/* Flash */}
                <AnimatePresence>
                    {dispensed && (
                        <motion.div
                            initial={{ opacity: 0.3 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            style={{ position: 'absolute', inset: 0, borderRadius: 5, zIndex: 4, background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`, pointerEvents: 'none' }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

/* ── Main ── */
const Skills = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

    return (
        <section id="skills" ref={ref} className="relative pt-12 pb-20 md:pt-20 md:pb-28 scroll-mt-4 overflow-hidden">
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
                <div style={{
                    position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
                    width: 900, height: 900, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,140,0,0.04) 0%, transparent 65%)',
                    filter: 'blur(80px)',
                }} />
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="font-orbitron text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(255,165,0,0.6)' }}>
                        — Capabilities —
                    </span>
                    <h2 className="font-aquire font-black mt-3" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        background: 'linear-gradient(135deg, #fff 0%, #FFA500 60%, #FF8C00 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                        SKILLS
                    </h2>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.5), transparent)', maxWidth: 240, margin: '12px auto 0' }} />
                </motion.div>

                {/* ── VENDING MACHINE + SIDE PANELS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 14, position: 'relative' }}
                >
                    {/* Left ad panel — desktop only */}
                    <SidePanel side="left" className="hidden lg:flex" />

                    {/* Machine body */}
                    <div className="relative w-full lg:w-[580px] flex-auto lg:flex-none" style={{ maxWidth: 580 }}>
                        <div style={{
                            background: 'linear-gradient(160deg, #0e0b04 0%, #070500 60%, #0a0700 100%)',
                            border: '2px solid rgba(255,165,0,0.25)',
                            borderRadius: 20,
                            boxShadow: '0 0 60px rgba(255,140,0,0.08), 0 0 120px rgba(255,140,0,0.04), 0 2px 0 rgba(255,165,0,0.3) inset',
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                            {/* Top marquee */}
                            <div style={{
                                background: 'linear-gradient(90deg, #0a0700, #1a1000, #0a0700)',
                                borderBottom: '1.5px solid rgba(255,165,0,0.3)',
                                padding: '9px 20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['#FF4500', '#FFA500', '#FFD700'].map((c, i) => (
                                        <motion.div key={i}
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                                            style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: c, boxShadow: `0 0 6px ${c}` }}
                                        />
                                    ))}
                                </div>
                                <motion.span
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', letterSpacing: '0.35em', color: 'rgba(255,165,0,0.8)', textTransform: 'uppercase' }}
                                >
                                    ◈ SKILL-O-MATIC ◈
                                </motion.span>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.5rem', color: 'rgba(255,165,0,0.35)', letterSpacing: '0.1em' }}>
                                    v2.0.26
                                </div>
                            </div>

                            {/* Scan line */}
                            <motion.div
                                animate={{ y: ['-100%', '200%'] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                                style={{
                                    position: 'absolute', left: 0, right: 0, height: 2, zIndex: 20, pointerEvents: 'none',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.2), rgba(255,215,0,0.4), rgba(255,165,0,0.2), transparent)',
                                    filter: 'blur(1px)',
                                }}
                            />

                            {/* Grid area */}
                            <div style={{ padding: '12px 10px' }}>
                                <div style={{
                                    border: '1px solid rgba(255,165,0,0.12)',
                                    borderRadius: 10,
                                    background: 'rgba(255,165,0,0.015)',
                                    padding: '12px',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: '0 0 30px rgba(255,140,0,0.05) inset',
                                    position: 'relative',
                                }}>
                                    {/* Corner brackets */}
                                    {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
                                        <div key={i} style={{
                                            position: 'absolute', [v]: 5, [h]: 5, width: 12, height: 12,
                                            borderTop: v === 'top' ? '1.5px solid rgba(255,165,0,0.5)' : 'none',
                                            borderBottom: v === 'bottom' ? '1.5px solid rgba(255,165,0,0.5)' : 'none',
                                            borderLeft: h === 'left' ? '1.5px solid rgba(255,165,0,0.5)' : 'none',
                                            borderRight: h === 'right' ? '1.5px solid rgba(255,165,0,0.5)' : 'none',
                                        }} />
                                    ))}

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                                        {skills.map((skill, i) => (
                                            <SkillSlot key={skill.name} skill={skill} index={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom control panel */}
                            <div style={{
                                borderTop: '1.5px solid rgba(255,165,0,0.2)',
                                background: 'linear-gradient(90deg, #080500, #110c02, #080500)',
                                padding: '10px 22px',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                            }}>
                                <div style={{
                                    background: 'rgba(0,20,0,0.8)', border: '1px solid rgba(0,255,80,0.2)',
                                    borderRadius: 6, padding: '5px 12px',
                                    fontFamily: 'Orbitron, monospace', fontSize: '0.52rem',
                                    color: 'rgba(0,255,80,0.7)', letterSpacing: '0.15em',
                                    boxShadow: '0 0 10px rgba(0,255,80,0.08) inset',
                                }}>
                                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                        HOVER TO DISPENSE_
                                    </motion.span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                    <div style={{ width: 34, height: 5, borderRadius: 3, border: '1px solid rgba(255,165,0,0.4)', background: 'rgba(0,0,0,0.6)', boxShadow: '0 0 6px rgba(255,165,0,0.15) inset' }} />
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.35rem', color: 'rgba(255,165,0,0.35)', letterSpacing: '0.12em' }}>INSERT</span>
                                </div>

                                <div style={{ display: 'flex', gap: 5 }}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <motion.div key={i}
                                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                                            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                                            style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: i % 2 === 0 ? '#FFA500' : '#FF6A00', boxShadow: `0 0 5px ${i % 2 === 0 ? '#FFA500' : '#FF6A00'}` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3D side depth */}
                        <div style={{ position: 'absolute', top: 8, right: -9, bottom: -7, width: 9, background: 'linear-gradient(90deg, rgba(255,140,0,0.08), rgba(20,12,0,0.9))', borderRadius: '0 8px 8px 0', border: '1px solid rgba(255,165,0,0.15)', borderLeft: 'none' }} />
                        <div style={{ position: 'absolute', left: 8, right: -2, bottom: -9, height: 9, background: 'linear-gradient(180deg, rgba(255,140,0,0.06), rgba(10,7,0,0.9))', borderRadius: '0 0 8px 8px', border: '1px solid rgba(255,165,0,0.12)', borderTop: 'none' }} />

                        {/* Floor glow */}
                        <div style={{ position: 'absolute', bottom: -38, left: '10%', right: '10%', height: 38, background: 'radial-gradient(ellipse, rgba(255,140,0,0.1) 0%, transparent 70%)', filter: 'blur(8px)', pointerEvents: 'none' }} />
                    </div>

                    {/* Right ad panel — desktop only */}
                    <SidePanel side="right" className="hidden lg:flex" />
                </motion.div>

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}
                    style={{ textAlign: 'center', marginTop: 28, fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: 'rgba(255,165,0,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                    <span className="hidden md:inline">◈ hover over a slot to inspect skill ◈</span>
                    <span className="md:hidden">◈ tap a slot to inspect skill ◈</span>
                </motion.p>
            </div>
        </section>
    );
};

export default Skills;
