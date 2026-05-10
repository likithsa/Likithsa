'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Register GSAP plugin (client-only) ──────────────────────────────────────
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Frame sequence configuration ─────────────────────────────────────────────
// Use a reduced subset of frames for smooth, jitter-free performance.
// Original 23 frames → 12 key frames (skip alternating in the scroll section)
const FRAME_INDICES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61
]; // 33 frames
const TOTAL_FRAMES = FRAME_INDICES.length;
const INTRO_END_IDX = 3;    // indices 0-3 (frames 1-4) auto-play on load
const SCROLL_END_IDX = TOTAL_FRAMES - 1; // last frame index

// Build public paths from selected frame indices
const FRAME_SRCS = FRAME_INDICES.map(
    (n) => `/asset/heroImageCollection/ezgif-frame-${String(n).padStart(3, '0')}.jpg`
);

// ─────────────────────────────────────────────────────────────────────────────

const Hero = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);
    const frameRef = useRef(0);
    const lastDrawnFrameRef = useRef<number>(-1);
    const stRef = useRef<ScrollTrigger | null>(null);

    const [loaded, setLoaded] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [hintVisible, setHintVisible] = useState(false);

    // ── Draw a single clean pre-decoded frame (no blending) ───────────────────
    const drawFrame = useCallback((idx: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const frameIdx = Math.round(Math.max(0, Math.min(idx, TOTAL_FRAMES - 1)));
        if (frameIdx === lastDrawnFrameRef.current) return;
        lastDrawnFrameRef.current = frameIdx;

        const cw = canvas.width;
        const ch = canvas.height;

        const bmp = bitmapsRef.current[frameIdx];
        if (!bmp) return;

        // Cover-fit the bitmap to the canvas
        const vr = bmp.width / bmp.height;
        const cr = cw / ch;
        let sx = 0, sy = 0, sw = bmp.width, sh = bmp.height;
        if (vr > cr) { sw = sh * cr; sx = (bmp.width - sw) / 2; }
        else { sh = sw / cr; sy = (bmp.height - sh) / 2; }

        ctx.clearRect(0, 0, cw, ch);
        ctx.globalAlpha = 1;
        ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, cw, ch);
    }, []);

    // ── Size canvas to viewport (retina-aware) ────────────────────────────────
    const resizeCanvas = useCallback(() => {
        const c = canvasRef.current;
        if (!c) return;
        const isMobile = window.innerWidth < 768;
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
        c.width = window.innerWidth * dpr;
        c.height = window.innerHeight * dpr;
        c.style.width = `${window.innerWidth}px`;
        c.style.height = `${window.innerHeight}px`;
        drawFrame(frameRef.current);
    }, [drawFrame]);

    // ── Preload & pre-decode all frames as ImageBitmaps ───────────────────────
    useEffect(() => {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let cancelled = false;

        const loadAllBitmaps = async () => {
            const bitmaps: (ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);

            // Load all images in parallel and decode into GPU-ready bitmaps
            const promises = FRAME_SRCS.map(async (src, i) => {
                try {
                    const res = await fetch(src);
                    const blob = await res.blob();
                    const bmp = await createImageBitmap(blob);
                    bitmaps[i] = bmp;
                } catch {
                    console.warn(`Failed to load frame: ${src}`);
                }
            });

            await Promise.all(promises);

            if (!cancelled) {
                bitmapsRef.current = bitmaps;
                setLoaded(true);
            }
        };

        loadAllBitmaps();

        return () => {
            cancelled = true;
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [resizeCanvas]);

    // ── Intro: auto-animate frames 0 → INTRO_END_IDX (lights turning on) ────
    useEffect(() => {
        if (!loaded) return;

        frameRef.current = 0;
        drawFrame(0);

        let raf = 0;
        const DURATION = 1400;

        const startNow = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - startNow) / DURATION, 1);
            const eased = 1 - Math.pow(1 - t, 2);
            const fi = eased * INTRO_END_IDX;
            frameRef.current = fi;
            drawFrame(fi);

            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                frameRef.current = INTRO_END_IDX;
                drawFrame(INTRO_END_IDX);
                setTimeout(() => {
                    setTextVisible(true);
                    setTimeout(() => setHintVisible(true), 1200);
                }, 150);
            }
        };

        const delay = setTimeout(() => { raf = requestAnimationFrame(tick); }, 250);

        return () => {
            clearTimeout(delay);
            cancelAnimationFrame(raf);
        };
    }, [loaded, drawFrame]);

    // ── Scroll: scrub frames, fade text, morph, scanner ──────────────────────
    useEffect(() => {
        if (!loaded) return;
        const section = sectionRef.current;
        if (!section) return;

        const textEl = section.querySelector<HTMLElement>('[data-hero-text]');
        const hintEl = section.querySelector<HTMLElement>('[data-hero-hint]');

        const FRAME_RANGE = SCROLL_END_IDX - INTRO_END_IDX;

        // Quadratic ease-out: smooth initial speed, gentle deceleration without stalling
        const smoothEaseOut = (t: number): number => {
            return t * (2 - t);
        };

        stRef.current = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: window.innerWidth < 768 ? '+=120%' : '+=150%',
            scrub: 1.5,
            onUpdate: (self) => {
                const p = self.progress;

                // ── 1) Frames scrub from 0 to 0.60 with smooth ease-out ──
                let scrubP = p / 0.6;
                if (scrubP > 1) scrubP = 1;
                const easedScrub = smoothEaseOut(scrubP);
                const fi = INTRO_END_IDX + easedScrub * FRAME_RANGE;
                frameRef.current = fi;
                drawFrame(fi);

                // ── 2) Text fades out (0 to 0.12) ──
                if (textEl) {
                    const alpha = Math.max(0, 1 - p / 0.12);
                    const ty = -(1 - alpha) * 80;
                    textEl.style.opacity = String(alpha);
                    textEl.style.transform = `translateY(${ty}px)`;
                }
                if (hintEl) {
                    hintEl.style.opacity = String(Math.max(0, 1 - p / 0.06));
                }

                // ── 3) Morph transition from 0.55 to 0.78 ──
                const cvsContainer = document.getElementById('hero-canvas-container');
                const targetBox = document.getElementById('about-image-target');
                const scannerLine = document.getElementById('about-scanner-line');
                const aboutImage = document.getElementById('about-character-image');
                const vignette = document.getElementById('hero-vignette');
                const isMobile = window.innerWidth < 768;

                if (cvsContainer && targetBox) {
                    let morphP = 0;
                    if (p > 0.55) morphP = (p - 0.55) / 0.20;
                    if (morphP > 1) morphP = 1;
                    // Morph transitions in smoothly along with the finish of the frames
                    const easedMorph = smoothEaseOut(morphP);

                    vignette && (vignette.style.opacity = String(Math.max(0, 1 - easedMorph * 2)));

                    if (easedMorph > 0) {
                        if (isMobile) {
                            cvsContainer.style.opacity = String(1 - easedMorph);
                            if (scannerLine && aboutImage) {
                                scannerLine.style.opacity = '0';
                                aboutImage.style.opacity = '1';
                            }
                            if (morphP >= 1 && p >= 0.99) {
                                cvsContainer.style.pointerEvents = 'none';
                            }
                        } else {
                            const rect = targetBox.getBoundingClientRect();
                            const vw = window.innerWidth;
                            const vh = window.innerHeight;

                            const curW = vw + easedMorph * (rect.width - vw);
                            const curH = vh + easedMorph * (rect.height - vh);
                            const curLeft = easedMorph * rect.left;
                            const curTop = easedMorph * rect.top;
                            const curRadius = easedMorph * 24;

                            cvsContainer.style.width = `${curW}px`;
                            cvsContainer.style.height = `${curH}px`;
                            cvsContainer.style.transform = `translate3d(${curLeft}px, ${curTop}px, 0)`;
                            cvsContainer.style.borderRadius = `${curRadius}px`;

                            // ── 4) Scanner from 0.75 to 0.90 ──
                            if (scannerLine && aboutImage) {
                                let scanP = 0;
                                if (p > 0.75) scanP = (p - 0.75) / 0.15;
                                if (scanP > 1) scanP = 1;

                                scannerLine.style.opacity = scanP > 0 && scanP < 1 ? '1' : '0';
                                scannerLine.style.top = `${scanP * 100}%`;

                                if (scanP > 0) {
                                    aboutImage.style.opacity = '1';
                                    canvasRef.current!.style.clipPath = `inset(${scanP * 100}% 0 0 0)`;
                                } else {
                                    aboutImage.style.opacity = '0';
                                    canvasRef.current!.style.clipPath = 'none';
                                }
                            }

                            if (morphP >= 1 && p >= 0.90) {
                                // Final fade out for ultra-smooth exit
                                const finalAlpha = Math.max(0, 1 - (p - 0.90) / 0.10);
                                cvsContainer.style.opacity = String(finalAlpha);
                                cvsContainer.style.pointerEvents = 'none';
                            } else {
                                cvsContainer.style.opacity = '1';
                                cvsContainer.style.pointerEvents = 'auto';
                            }
                        }
                    } else {
                        cvsContainer.style.width = `100vw`;
                        cvsContainer.style.height = `100dvh`;
                        cvsContainer.style.transform = `translate3d(0, 0, 0)`;
                        cvsContainer.style.borderRadius = `0px`;
                        cvsContainer.style.opacity = '1';
                        vignette && (vignette.style.opacity = '1');

                        if (scannerLine && aboutImage && canvasRef.current) {
                            aboutImage.style.opacity = '0';
                            scannerLine.style.opacity = '0';
                            canvasRef.current.style.clipPath = 'none';
                        }
                    }
                }
            },
        });

        return () => {
            stRef.current?.kill();
            stRef.current = null;
        };
    }, [loaded, drawFrame]);

    // ── Replay (triggered by navbar logo click) ───────────────────────────────
    useEffect(() => {
        const handle = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        window.addEventListener('replay-hero', handle);
        return () => window.removeEventListener('replay-hero', handle);
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative h-[120dvh] md:h-[150dvh]"
            style={{ background: '#000' }}
        >
            {/* ─── Sticky fullscreen viewport ──────────────────────────────── */}
            <div
                id="hero-canvas-container"
                className="fixed top-0 left-0 z-40 overflow-hidden shadow-2xl"
                style={{ width: '100vw', height: '100dvh', background: 'transparent', pointerEvents: 'none' }}
            >
                {/* Canvas — renders every frame */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />

                {/* Cinematic vignette (always on) */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(0,0,0,0.52) 100%)',
                    }}
                />

                {/* ── Text overlay ─────────────────────────────────────────── */}
                <div
                    data-hero-text
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
                    style={{
                        // This mask hides the text in the very center, creating the illusion that it is BEHIND the character!
                        WebkitMaskImage: 'radial-gradient(ellipse 15vw 22vh at 50% 50%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 100%)',
                        maskImage: 'radial-gradient(ellipse 15vw 22vh at 50% 50%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 100%)',
                    }}
                >
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: '0.6em' }}
                        animate={{
                            opacity: textVisible ? 1 : 0,
                            letterSpacing: textVisible ? '0.45em' : '0.6em',
                        }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-aquire text-[10px] md:text-xs uppercase mb-8"
                        style={{ color: 'rgba(255, 255, 255, 1)' }}
                    >
                        — PORTFOLIO —
                    </motion.div>

                    {/* Name - Cinematic Wallpaper Effect like the Ronaldo poster */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: textVisible ? 1 : 0,
                            scale: textVisible ? 1 : 0.95,
                        }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                        className="font-aquire font-black flex items-center justify-center text-center leading-none"
                        style={{
                            fontSize: 'clamp(2.5rem, 12vw, 14rem)',
                            color: 'transparent',
                            WebkitTextStroke: '3px rgba(223, 128, 1, 0.62)',
                            textShadow: '6px 6px 9px rgba(133, 71, 6, 0.26)',
                            mixBlendMode: 'screen',
                        }}
                    >
                        LIKITH&nbsp;S&nbsp;A
                    </motion.h1>

                    {/* Gold divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: textVisible ? 1 : 0 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                        style={{
                            height: '1px',
                            width: '400px',
                            maxWidth: '85vw',
                            background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.4), transparent)',
                            margin: '36px auto',
                        }}
                    />

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: textVisible ? 1 : 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="text-center text-sm md:text-base uppercase tracking-[0.35em]"
                        style={{
                            color: 'rgba(255, 255, 255, 1)',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            textShadow: '0 4px 12px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.8)',
                        }}
                    >
                        Design &nbsp;·&nbsp; Develop &nbsp;·&nbsp; Deploy
                    </motion.p>
                </div>

                {/* ── Scroll hint ───────────────────────────────────────────── */}
                <motion.div
                    data-hero-hint
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hintVisible ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
                >
                    <span
                        className="font-aquire text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: 'rgba(255,165,0,0.45)' }}
                    >
                        Scroll
                    </span>
                    <div
                        className="relative flex justify-center pt-1.5"
                        style={{
                            width: 20, height: 36, borderRadius: 12,
                            border: '1px solid rgba(255,165,0,0.3)',
                        }}
                    >
                        <motion.div
                            style={{ width: 4, height: 8, borderRadius: 4, background: '#FFA500' }}
                            animate={{ y: [0, 14, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>

                {/* ── Floating particles ────────────────────────────────────── */}
                <Particles active={textVisible} />
            </div>

            {/* ── Spinner keyframe ─────────────────────────────────────────── */}
            <style>{`@keyframes heroSpin { to { transform: rotate(360deg); } }`}</style>
        </section>
    );
};

// ── Subtle dust/ambient particles ─────────────────────────────────────────────
const Particles = ({ active }: { active: boolean }) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

    const particles = useRef(
        Array.from({ length: isMobile ? 8 : 18 }, (_, i) => ({
            id: i,
            x: 30 + Math.random() * 40,
            y: 20 + Math.random() * 60,
            delay: Math.random() * 5,
            duration: 6 + Math.random() * 8,
            size: 0.8 + Math.random() * 1.8,
            opacity: 0.15 + Math.random() * 0.4,
            driftX: Math.random() > 0.5 ? 15 : -15,
        }))
    ).current;

    return (
        <div className="absolute inset-0 z-[25] pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: 'rgba(255,180,60,0.7)',
                    }}
                    animate={active ? {
                        y: [0, -60, 0],
                        x: [0, p.driftX, 0],
                        opacity: [0, p.opacity, 0],
                    } : { opacity: 0 }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

export default Hero;
