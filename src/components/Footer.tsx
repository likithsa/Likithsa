'use client';

import { motion } from 'framer-motion';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="relative py-12 border-t" style={{ borderColor: 'rgba(255,165,0,0.08)' }}>
            {/* Glow line at top */}
            <div style={{
                position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                width: '60%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.5), transparent)',
                boxShadow: '0 0 12px rgba(255,165,0,0.4)',
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="font-orbitron text-xl font-bold tracking-wider">
                    <span style={{ color: '#FFA500' }}>L</span>
                    <span style={{ color: 'rgba(255,165,0,0.4)' }}>S</span>
                    <span style={{ color: '#FFA500' }}>A</span>
                </div>

                <motion.p
                    className="font-orbitron text-xs tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                    animate={{ opacity: [0.25, 0.5, 0.25] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    © {year} LIKITH S A &nbsp;·&nbsp; ALL SYSTEMS OPERATIONAL
                </motion.p>

                <div style={{ color: 'rgba(255,165,0,0.3)', fontSize: '0.7rem', fontFamily: 'Orbitron, monospace' }}>
                    v2.0.26
                </div>
            </div>
        </footer>
    );
};

export default Footer;
