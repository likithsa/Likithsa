'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';



export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#e8e8e8', position: 'relative' }}>
      <AnimatedBackground />
      <Navbar />

      {/* Hero handles its own sticky parallax */}
      <Hero />

      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />

      <Footer />
    </main>
  );
}
