"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
    text: string;
    delay?: number;
    skip?: boolean;
}

export default function TypewriterLine({ text, delay = 0, skip = false }: Props) {
    const [displayed, setDisplayed] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const chars = text.split("");
        let index = 0;
        let timeoutId: NodeJS.Timeout;

        const startTypingSound = () => {
            if (!audioRef.current) {
                const audio = new Audio("/type.wav");
                audio.loop = true;
                audio.volume = 0.4;
                audioRef.current = audio;
            }
            audioRef.current.play().catch(() => {});
        };

        const stopTypingSound = () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };

        const type = () => {
            if (skip) {
                stopTypingSound();
                setDisplayed(text);
                return;
            }

            const currentChar = chars[index];

            if (index === 0 && ![" ", "\n"].includes(currentChar)) {
                startTypingSound();
            }

            setDisplayed((prev) => prev + currentChar);
            index++;

            if (index < chars.length) {
                const isPunctuation = [",", ".", "—", "…", "!", "?"].includes(currentChar);
                const baseDelay = Math.floor(Math.random() * 40) + 40;
                const extraPause = isPunctuation ? 200 : 0;
                timeoutId = setTimeout(type, baseDelay + extraPause);
            } else {
                stopTypingSound();
            }
        };

        const initialTimeout = setTimeout(type, delay);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(initialTimeout);
            stopTypingSound();
        };
    }, [text, delay, skip]);

    return (
        <p className="text-lg text-gray-300 font-mono whitespace-pre-wrap">
            {displayed}
            <span className="animate-pulse text-white">▌</span>
        </p>
    );
}