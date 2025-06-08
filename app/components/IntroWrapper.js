'use client';
import { useState, useEffect } from 'react';
import Intro from './Intro';

export default function IntroWrapper() {
    const [mounted, setMounted] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        setMounted(true);
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (hasVisited) {
            setShowIntro(false);
        } else {
            // Set the flag after a short delay to ensure the intro is shown
            setTimeout(() => {
                sessionStorage.setItem('hasVisited', 'true');
            }, 100);
        }
    }, []);

    // Always show intro until we confirm it should be hidden
    if (!mounted || showIntro) {
        return <Intro />;
    }

    return null;
} 