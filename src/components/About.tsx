'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    // Subtle parallax on the background only
    const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '3%']);

    return (
        <section id="about" ref={ref} className="relative pt-12 md:pt-16 pb-16 scroll-mt-24 overflow-hidden">
            {/* Ambient background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ x: bgX }}
            >
                <div className="hidden md:block" style={{
                    position: 'absolute', top: '10%', right: '5%',
                    width: '500px', height: '600px',
                    background: 'radial-gradient(ellipse, rgba(255,140,0,0.05) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', left: '-5%',
                    width: '300px', height: '300px',
                    background: 'radial-gradient(ellipse, rgba(255,165,0,0.03) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }} />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

                    {/* Left — content panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Section label */}
                        <div className="flex items-center gap-3 mb-6">
                            <div style={{ width: 32, height: 1, background: 'rgba(255,165,0,0.6)' }} />
                            <span className="font-orbitron text-xs tracking-[0.35em] uppercase" style={{ color: 'rgba(255,165,0,0.6)' }}>
                                About Me
                            </span>
                        </div>

                        <h2 className="font-orbitron font-black leading-none mb-8" style={{
                            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                            background: 'linear-gradient(135deg, #fff 0%, #FFD700 50%, #FFA500 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            BUILDING THE<br />FUTURE
                        </h2>

                        {/* Glass panel */}
                        <div className="glass-panel rounded-2xl p-5 sm:p-8 mb-8 relative overflow-hidden">
                            {/* Top edge glow */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                                background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.4), transparent)',
                            }} />

                            <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter-gf, Inter), sans-serif', textAlign: 'justify' }}>
                                A developer who enjoys building things that feel right, both in how they work and how they look.
                                Mostly working across web and interactive systems, with a focus on keeping things clean, intuitive, and a little fun to use.

                            </p>
                            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter-gf, Inter), sans-serif' }}>
                                From medical AI systems to social platforms that connect communities. I engineer solutions that matter, built with intent.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {[
                                { value: '5+', label: 'Projects' },
                                { value: '2025', label: 'Graduate' },
                                { value: '∞', label: 'Drive' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                                    className="glass-panel rounded-xl p-3 sm:p-4 text-center"
                                >
                                    <div className="font-orbitron font-black text-xl sm:text-2xl" style={{ color: '#FFA500' }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs mt-1 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter-gf, Inter), sans-serif' }}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-2 mt-6"
                        >
                            {['Software Engineer', 'Full-Stack Dev', 'AI Enthusiast', 'Creative Coder'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs tracking-wide"
                                    style={{
                                        border: '1px solid rgba(255,165,0,0.25)',
                                        color: 'rgba(255,165,0,0.8)',
                                        background: 'rgba(255,165,0,0.05)',
                                        fontFamily: 'var(--font-inter-gf, Inter), sans-serif',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — Character visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Outer glow ring — hidden on mobile */}
                        <motion.div
                            className="absolute hidden md:block"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: 340, height: 340, borderRadius: '50%',
                                border: '1px solid rgba(255,165,0,0.12)',
                            }}
                        />
                        <motion.div
                            className="absolute hidden md:block"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: 280, height: 280, borderRadius: '50%',
                                border: '1px dashed rgba(255,165,0,0.08)',
                            }}
                        />

                        {/* Portrait placeholder — catches the Hero last frame */}
                        <div
                            id="about-image-target"
                            className="relative z-10 glass-panel rounded-3xl overflow-hidden w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
                            style={{
                                aspectRatio: '340 / 440',
                                background: 'linear-gradient(160deg, rgba(255,165,0,0.08) 0%, rgba(0,0,0,0.4) 100%)',
                            }}
                        >
                            {/* Side profile character illustration */}
                            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

                                {/* Ambient glow behind figure */}
                                <div style={{
                                    position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
                                    width: 180, height: 250,
                                    background: 'radial-gradient(ellipse, rgba(255,140,0,0.25) 0%, transparent 70%)',
                                    filter: 'blur(30px)',
                                }} />

                                {/* about_image.png injected seamlessly */}
                                <div id="about-character-image" className="absolute inset-0">
                                    <Image
                                        src="/asset/about_image.png"
                                        alt="About Character Image"
                                        fill
                                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                                        style={{ objectFit: 'cover' }}
                                        priority={false}
                                    />
                                </div>

                                {/* Scanner line controlled by Hero.tsx tracker */}
                                <div
                                    id="about-scanner-line"
                                    className="absolute left-0 w-full z-[60] pointer-events-none"
                                    style={{
                                        height: 4,
                                        background: '#FFA500',
                                        boxShadow: '0 0 15px 5px rgba(255,165,0,0.6)',
                                        opacity: 0,
                                        transform: 'translateY(-50%)'
                                    }}
                                />

                                {/* Orange side rim light */}
                                <div style={{
                                    position: 'absolute', top: 0, right: 0, bottom: 0, width: 40,
                                    background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.15))',
                                }} />

                                {/* Name overlay */}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px',
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                }}>
                                    <div className="font-orbitron text-xs tracking-widest" style={{ color: '#FFA500' }}>LIKITH S A</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontFamily: 'var(--font-inter-gf, Inter), sans-serif', letterSpacing: '0.15em', marginTop: 2 }}>
                                        Software Engineer
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges — hidden on small mobile */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="hidden sm:block"
                            style={{
                                position: 'absolute', top: '10%', right: '-4%',
                                padding: '8px 14px', borderRadius: 12,
                                background: 'rgba(255,165,0,0.08)', border: '1px solid rgba(255,165,0,0.2)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div className="font-orbitron text-xs" style={{ color: '#FFA500' }}>CURIOUS </div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', fontFamily: 'var(--font-inter-gf, Inter)' }}>BUILDER</div>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="hidden sm:block"
                            style={{
                                position: 'absolute', bottom: '50%', left: '-4%',
                                padding: '8px 14px', borderRadius: 12,
                                background: 'rgba(255,165,0,0.06)', border: '1px solid rgba(255,165,0,0.15)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div className="font-orbitron text-xs" style={{ color: '#FFB830' }}>BRICOLEUR<br /></div>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="hidden sm:block"
                            style={{
                                position: 'absolute', bottom: '15%', right: '-4%',
                                padding: '8px 14px', borderRadius: 12,
                                background: 'rgba(255,165,0,0.06)', border: '1px solid rgba(255,165,0,0.15)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div className="font-orbitron text-xs" style={{ color: '#FFB830' }}>ITERANT<br /></div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
