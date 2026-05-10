'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 15 : 40;
        const particles: Array<{ x: number; y: number; r: number; speed: number; opacity: number; phase: number }> = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 0.5 + Math.random() * 1.5,
                speed: 0.2 + Math.random() * 0.4,
                opacity: 0.1 + Math.random() * 0.3,
                phase: Math.random() * Math.PI * 2,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            t += 0.008; // slightly slower for global background

            // Wave lines
            for (let wi = 0; wi < 2; wi++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255,${140 + wi * 20},0,${0.03 + wi * 0.01})`;
                ctx.lineWidth = 1;
                for (let x = 0; x <= canvas.width; x += 6) {
                    const y = canvas.height * 0.5 + Math.sin(x * 0.005 + t + wi * 0.8) * (50 + wi * 30);
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Particles
            particles.forEach((p) => {
                p.y -= p.speed;
                p.x += Math.sin(t + p.phase) * 0.3;
                if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,165,0,${p.opacity})`;
                ctx.fill();
            });

            // Very faint grid lines — desktop only
            if (!isMobile) {
                ctx.strokeStyle = 'rgba(255,165,0,0.015)';
                ctx.lineWidth = 0.5;
                for (let gx = 0; gx < canvas.width; gx += 80) {
                    ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke();
                }
                for (let gy = 0; gy < canvas.height; gy += 80) {
                    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke();
                }
            }

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default AnimatedBackground;
