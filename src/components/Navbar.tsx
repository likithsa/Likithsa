'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check, { passive: true });
        return () => window.removeEventListener('resize', check);
    }, []);

    // Track scroll & active section
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const nameMap: Record<string, string> = {
                        'hero': 'Home', 'about': 'About', 'experience': 'Experience',
                        'skills': 'Skills', 'projects': 'Work', 'contact': 'Contact'
                    };
                    if (id && nameMap[id]) setActiveLink(nameMap[id]);
                }
            });
        }, { threshold: 0, rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(sec => observer.observe(sec));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    // Update sliding pill indicator position
    useEffect(() => {
        if (!navRef.current) return;
        const activeEl = navRef.current.querySelector(`[data-nav-link="${activeLink}"]`) as HTMLElement;
        if (activeEl) {
            const navRect = navRef.current.getBoundingClientRect();
            const elRect = activeEl.getBoundingClientRect();
            setPillStyle({
                left: elRect.left - navRect.left,
                width: elRect.width,
            });
        }
    }, [activeLink]);

    // Close menu on scroll
    useEffect(() => {
        if (!menuOpen) return;
        const close = () => setMenuOpen(false);
        window.addEventListener('scroll', close, { passive: true });
        return () => window.removeEventListener('scroll', close);
    }, [menuOpen]);

    return (
        <>
            {/* Custom cursor glow — desktop only */}
            {!isMobile && <CursorGlow />}

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center"
                style={{ padding: scrolled ? '12px 0' : '20px 0' }}
            >
                {/* ── Desktop: Floating Liquid Glass Pill ────────────────────── */}
                <div
                    className="hidden md:block relative top-[10px]"
                    style={{
                        borderRadius: '60px',
                        padding: '1px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 50%, rgba(255,165,0,0.1) 100%)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                    }}
                >
                    <div
                        className="relative flex items-center"
                        style={{
                            borderRadius: '59px',
                            padding: '6px 8px',
                            /* Liquid Glass Background */
                            background: 'rgba(15, 15, 15, 0.35)',
                            backdropFilter: 'blur(30px) saturate(1.8)',
                            WebkitBackdropFilter: 'blur(30px) saturate(1.8)',
                            /* Inner reflections for liquid feel */
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.4)',
                        }}
                    >
                        {/* Logo inside the pill */}
                        <Link
                            href="#hero"
                            className="relative z-10 font-orbitron text-sm font-bold tracking-wider px-5 py-2 group"
                            onClick={(e) => {
                                e.preventDefault();
                                window.dispatchEvent(new Event('replay-hero'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <span className="text-white group-hover:text-[#FFA500] transition-colors duration-300">L</span>
                            <span style={{ color: '#FFA500' }}>S</span>
                            <span className="text-white group-hover:text-[#FFA500] transition-colors duration-300">A</span>
                        </Link>

                        {/* Separator */}
                        <div style={{
                            width: '1px', height: '20px',
                            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)',
                            margin: '0 4px',
                        }} />

                        {/* Nav links with sliding active pill */}
                        <ul ref={navRef} className="relative flex items-center gap-1">
                            {/* Sliding active pill indicator */}
                            <motion.div
                                className="absolute top-0 bottom-0 z-0"
                                animate={{
                                    left: pillStyle.left,
                                    width: pillStyle.width,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 350,
                                    damping: 30,
                                }}
                                style={{
                                    borderRadius: '50px',
                                    background: 'rgba(255,165,0,0.12)',
                                    boxShadow: 'inset 0 1px 1px rgba(255,165,0,0.2)',
                                }}
                            />

                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        data-nav-link={link.name}
                                        onClick={(e) => {
                                            setActiveLink(link.name);
                                            if (link.href.startsWith('#')) {
                                                e.preventDefault();
                                                if (link.href === '#hero') {
                                                    window.dispatchEvent(new Event('replay-hero'));
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                } else {
                                                    const target = document.querySelector(link.href);
                                                    if (target) {
                                                        target.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }
                                                window.history.pushState(null, '', link.href);
                                            }
                                        }}
                                        className="relative z-10 flex items-center justify-center px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-300"
                                        style={{
                                            fontFamily: 'var(--font-inter-gf, Inter), sans-serif',
                                            color: activeLink === link.name
                                                ? '#FFA500'
                                                : 'rgba(255,255,255,0.5)',
                                            borderRadius: '50px',
                                        }}
                                    >
                                        <span className="hover:text-[rgba(255,255,255,0.9)] transition-colors duration-200">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Mobile: Compact glass pill ────────────────────────────── */}
                <div className="md:hidden flex items-center gap-3 px-4 w-full" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
                    {/* Logo */}
                    <Link
                        href="#hero"
                        className="font-orbitron text-lg font-bold tracking-wider"
                        onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new Event('replay-hero'));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <span className="text-white">L</span>
                        <span style={{ color: '#FFA500' }}>S</span>
                        <span className="text-white">A</span>
                    </Link>

                    <div className="flex-1" />

                    {/* Hamburger inside a glass pill */}
                    <button
                        className="flex items-center justify-center p-3 rounded-full"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open menu"
                        style={{
                            background: 'rgba(10, 12, 18, 0.55)',
                            backdropFilter: 'blur(40px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            minWidth: 44,
                            minHeight: 44,
                        }}
                    >
                        <div className="flex flex-col gap-1.5 w-5">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    className="block h-0.5 bg-[#FFA500] rounded-full"
                                    animate={{
                                        width: menuOpen
                                            ? (i === 1 ? 0 : 20)
                                            : (i === 1 ? 14 : 20),
                                        rotate: menuOpen
                                            ? (i === 0 ? 45 : i === 2 ? -45 : 0)
                                            : 0,
                                        y: menuOpen
                                            ? (i === 0 ? 8 : i === 2 ? -8 : 0)
                                            : 0,
                                        opacity: i === 1 && menuOpen ? 0 : 1,
                                    }}
                                    transition={{ duration: 0.25 }}
                                />
                            ))}
                        </div>
                    </button>
                </div>

                {/* ── Mobile dropdown ─────────────────────────────────────── */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-4 right-4 mt-2 md:hidden overflow-hidden"
                            style={{
                                borderRadius: '24px',
                                background: 'rgba(10, 12, 18, 0.85)',
                                backdropFilter: 'blur(40px) saturate(1.8)',
                                WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                            }}
                        >
                            <ul className="p-4 flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.li
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                setActiveLink(link.name);
                                                setMenuOpen(false);
                                                if (link.href.startsWith('#')) {
                                                    e.preventDefault();
                                                    if (link.href === '#hero') {
                                                        window.dispatchEvent(new Event('replay-hero'));
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    } else {
                                                        const target = document.querySelector(link.href);
                                                        if (target) {
                                                            target.scrollIntoView({ behavior: 'smooth' });
                                                        }
                                                    }
                                                    window.history.pushState(null, '', link.href);
                                                }
                                            }}
                                            className="block px-4 py-3 text-sm uppercase tracking-widest rounded-xl transition-all duration-200"
                                            style={{
                                                color: activeLink === link.name ? '#FFA500' : 'rgba(255,255,255,0.6)',
                                                fontFamily: 'var(--font-inter-gf, Inter), sans-serif',
                                                background: activeLink === link.name ? 'rgba(255,165,0,0.08)' : 'transparent',
                                                minHeight: 44,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

const CursorGlow = () => {
    const x = useMotionValue(-500);
    const y = useMotionValue(-500);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener('mousemove', move, { passive: true });
        return () => window.removeEventListener('mousemove', move);
    }, [x, y]);

    return (
        <motion.div
            className="pointer-events-none fixed z-[9998] rounded-full"
            style={{
                x,
                y,
                translateX: '-50%',
                translateY: '-50%',
                width: 500,
                height: 500,
                background: 'radial-gradient(circle, rgba(255,200,80,0.08) 0%, rgba(255,165,0,0.03) 40%, transparent 70%)',
            }}
        />
    );
};

export default Navbar;
