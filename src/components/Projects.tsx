'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'This Portfolio',
        subtitle: 'Latest Project · 2026',
        description: 'A motion-first portfolio engineered around immersive scroll narratives, dynamic lighting aesthetics, and interactive UI systems with a sleek gold-accented visual identity.',
        tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
        accent: '#FFD700',
        icon: '◎',
        link: '#',
    },
    {
        id: 2,
        title: 'Skin Cancer AI',
        subtitle: 'Medical AI System',
        description: 'Deep Learning based web application for early skin cancer diagnosis. Built with ResNet101 achieving 80%+ accuracy on dermoscopy images.',
        tags: ['Python', 'TensorFlow', 'ResNet101', 'Flask'],
        accent: '#FF6B35',
        icon: '⬡',
        link: '#',
    },
    {
        id: 3,
        title: 'Instagram Bot',
        subtitle: 'AI Automation',
        description: 'AI-driven Instagram automation platform using GPT-4 for bio optimization, smart engagement, and content scheduling via Meta Graph API.',
        tags: ['Node.js', 'Meta API', 'OpenAI GPT-4', 'Automation'],
        accent: '#FF8C00',
        icon: '◇',
        link: '#',
    },
];

/* ── Animated Nuclear / Plasma Sphere ── */
const NuclearSphere = ({ size = 110 }: { size?: number }) => (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        {/* Outer rings */}
        {[1, 1.35, 1.7].map((scale, i) => (
            <motion.div
                key={i}
                animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [scale, scale * 1.04, scale],
                }}
                transition={{
                    rotate: { duration: 4 + i * 1.5, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2.5, repeat: Infinity, delay: i * 0.4 },
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto',
                    width: `${100 / scale}%`,
                    height: `${100 / scale}%`,
                    borderRadius: '50%',
                    border: `1px solid rgba(160,80,255,${0.5 - i * 0.12})`,
                    boxShadow: `0 0 ${8 + i * 6}px rgba(160,80,255,${0.25 - i * 0.06})`,
                }}
            />
        ))}

        {/* Orbiting electron dots */}
        {[0, 120, 240].map((deg, i) => (
            <motion.div
                key={`e${i}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5 + i * 0.7, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}
            >
                <div style={{
                    position: 'absolute',
                    top: '5%',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${deg}deg)`,
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#BF5FFF',
                    boxShadow: '0 0 8px #BF5FFF, 0 0 16px #BF5FFF',
                }} />
            </motion.div>
        ))}

        {/* Core plasma ball */}
        <motion.div
            animate={{
                boxShadow: [
                    '0 0 20px 6px rgba(160,80,255,0.5), 0 0 50px 14px rgba(120,40,220,0.2)',
                    '0 0 30px 10px rgba(160,80,255,0.7), 0 0 70px 20px rgba(120,40,220,0.35)',
                    '0 0 20px 6px rgba(160,80,255,0.5), 0 0 50px 14px rgba(120,40,220,0.2)',
                ],
                scale: [1, 1.06, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute',
                inset: '28%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #e0b0ff, #a040f0 40%, #4a0080 100%)',
            }}
        />

        {/* Inner shimmer */}
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
                position: 'absolute',
                inset: '30%',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.25) 80%, transparent 100%)',
            }}
        />
    </div>
);

const Projects = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check, { passive: true });
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
        const y = -((e.clientY - rect.top) / rect.height - 0.5) * 15;
        setTilt({ x, y });
        setHovered(id);
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setHovered(null);
    };

    return (
        <section id="projects" className="relative overflow-hidden flex flex-col justify-center pt-12 md:pt-16 pb-16 md:pb-20 scroll-mt-4">
            {/* Background */}
            <div style={{
                position: 'absolute', bottom: '10%', right: '5%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,140,0,0.04) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div style={{ width: 32, height: 1, background: 'rgba(255,165,0,0.6)' }} />
                        <span className="font-orbitron text-xs tracking-[0.35em] uppercase" style={{ color: 'rgba(255,165,0,0.6)' }}>
                            Selected Work
                        </span>
                    </div>
                    <h2 className="font-orbitron font-black" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        background: 'linear-gradient(135deg, #fff 0%, #FFA500 60%, #FF8C00 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                        PROJECTS
                    </h2>
                </motion.div>

                {/* Projects grid — 2×2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                    {/* ── Regular project cards (boxes 1–3) ── */}
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onMouseMove={(e) => handleMouseMove(e, project.id)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: hovered === project.id
                                    ? `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`
                                    : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
                                transition: 'transform 0.15s ease',
                            }}
                        >
                            <div
                                className="relative glass-panel rounded-2xl overflow-hidden h-full"
                                style={{
                                    border: hovered === project.id
                                        ? `1px solid ${project.accent}55`
                                        : '1px solid rgba(255,165,0,0.1)',
                                    boxShadow: hovered === project.id
                                        ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.accent}25`
                                        : '0 4px 30px rgba(0,0,0,0.3)',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                    minHeight: 180,
                                }}
                            >
                                {/* Top edge glow */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                                    background: `linear-gradient(90deg, transparent, ${project.accent}88, transparent)`,
                                    opacity: hovered === project.id ? 1 : 0.4,
                                    transition: 'opacity 0.3s',
                                }} />

                                {/* Ambient inner glow on hover */}
                                <AnimatePresence>
                                    {hovered === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute', inset: 0,
                                                background: `radial-gradient(ellipse at 50% 0%, ${project.accent}12 0%, transparent 60%)`,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Content */}
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="font-orbitron text-xs tracking-widest" style={{ color: project.accent, opacity: 0.7 }}>
                                                {project.subtitle}
                                            </span>
                                            <h3 className="font-orbitron font-bold text-xl mt-1 text-white">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <span style={{
                                            fontSize: '1.8rem', color: project.accent, opacity: 0.5,
                                            fontFamily: 'monospace', lineHeight: 1,
                                        }}>
                                            {project.icon}
                                        </span>
                                    </div>

                                    <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
                                        {project.description}
                                    </p>

                                    <div style={{
                                        height: 1, marginTop: 20, marginBottom: 16,
                                        background: `linear-gradient(90deg, transparent, ${project.accent}30, transparent)`,
                                    }} />

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} style={{
                                                padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem',
                                                background: `${project.accent}12`, border: `1px solid ${project.accent}30`,
                                                color: `${project.accent}CC`, fontFamily: 'Inter, sans-serif',
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* ── Box 4: Upcoming Work (nuclear sphere) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onMouseMove={(e) => handleMouseMove(e, 99)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: hovered === 99
                                ? `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`
                                : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
                            transition: 'transform 0.15s ease',
                        }}
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden h-full"
                            style={{
                                border: hovered === 99
                                    ? '1px solid rgba(160,80,255,0.4)'
                                    : '1px solid rgba(160,80,255,0.15)',
                                boxShadow: hovered === 99
                                    ? '0 20px 60px rgba(0,0,0,0.5), 0 0 50px rgba(160,80,255,0.15)'
                                    : '0 4px 30px rgba(0,0,0,0.3)',
                                background: 'linear-gradient(135deg, rgba(12,5,22,0.97) 0%, rgba(6,2,14,0.99) 100%)',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                minHeight: 180,
                            }}
                        >
                            {/* Top edge glow */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                                background: 'linear-gradient(90deg, transparent, rgba(160,80,255,0.7), transparent)',
                                opacity: hovered === 99 ? 1 : 0.35,
                                transition: 'opacity 0.3s',
                            }} />

                            {/* Scanlines */}
                            <div style={{
                                position: 'absolute', inset: 0, pointerEvents: 'none',
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160,80,255,0.018) 3px, rgba(160,80,255,0.018) 4px)',
                            }} />

                            {/* INCOMING badge */}
                            <div style={{
                                position: 'absolute', top: 12, right: 14,
                                border: '1px solid rgba(160,80,255,0.35)', borderRadius: 4,
                                padding: '2px 8px',
                                fontFamily: 'Orbitron, monospace', fontSize: '0.42rem',
                                color: 'rgba(160,80,255,0.6)', letterSpacing: '0.18em',
                                background: 'rgba(160,80,255,0.06)',
                            }}>
                                INCOMING
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(160,80,255,0.6)', textTransform: 'uppercase' }}>
                                        Upcoming Work
                                    </span>
                                    <h3 className="font-orbitron font-bold text-xl mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                                        Project — Classified
                                    </h3>
                                </div>

                                {/* Sphere + info */}
                                <div className="flex flex-col md:flex-row items-center gap-6 flex-1 w-full">
                                    <div className="flex-shrink-0 scale-75 md:scale-100 origin-center md:origin-left">
                                        <NuclearSphere />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                                        {/* Launch date badge */}
                                        <div style={{
                                            display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                                            background: 'rgba(160,80,255,0.07)',
                                            border: '1px solid rgba(160,80,255,0.25)',
                                            borderRadius: 10, padding: '10px 18px',
                                        }}>
                                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.45rem', letterSpacing: '0.25em', color: 'rgba(160,80,255,0.55)', marginBottom: 4 }}>
                                                LAUNCH DATE
                                            </span>
                                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.1rem', fontWeight: 700, color: '#BF5FFF', letterSpacing: '0.06em', lineHeight: 1 }}>
                                                JUL 01
                                            </span>
                                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.55rem', color: 'rgba(160,80,255,0.45)', marginTop: 3 }}>
                                                2026
                                            </span>
                                        </div>

                                        {/* Status pulse */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                            <motion.div
                                                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                                                transition={{ duration: 1.4, repeat: Infinity }}
                                                style={{ width: 7, height: 7, borderRadius: '50%', background: '#BF5FFF', boxShadow: '0 0 8px #BF5FFF' }}
                                            />
                                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.5rem', color: 'rgba(160,80,255,0.65)', letterSpacing: '0.12em' }}>
                                                IN DEVELOPMENT
                                            </span>
                                        </div>

                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>
                                            Details withheld pending deployment clearance.
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom divider + redacted tags */}
                                <div style={{
                                    height: 1, marginTop: 18, marginBottom: 14,
                                    background: 'linear-gradient(90deg, transparent, rgba(160,80,255,0.25), transparent)',
                                }} />
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['███████', '█████', '████████'].map((r) => (
                                        <span key={r} style={{
                                            padding: '3px 10px', borderRadius: 20, fontSize: '0.62rem',
                                            background: 'rgba(160,80,255,0.07)', border: '1px solid rgba(160,80,255,0.18)',
                                            color: 'rgba(160,80,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.05em',
                                        }}>
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
