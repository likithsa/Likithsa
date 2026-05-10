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
import Script from 'next/script';



export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#e8e8e8', position: 'relative' }}>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Likith S A",
            "url": "https://likithsa.vercel.app",
            "jobTitle": "Software Engineer",
            "sameAs": [
              "https://github.com/likithsa",
              "https://linkedin.com/in/likithsa",
              "https://instagram.com/likith_s_a"
            ],
            "description": "Software Engineer specializing in AI and Full-Stack development."
          })
        }}
      />
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
