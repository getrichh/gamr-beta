"use client";

import { useEffect, useRef, useState } from "react";

const finalLines = [
    "Ночь исчезновения была тщательно спланирована.Илья зашёл в гримёрку Лиды, чтобы оставить на её столе финальный сценарий — с той самой фразой:«Настоящее искусство живёт в неведении».Он не нашёл Лиду — её не было на месте. Усталый, взволнованный, он заметил бокал на столе. Для храбрости — залпом осушил его.Бокал предназначался Лиде.Анна, движимая ревностью, хотела избавиться от соперницы. Она знала, что Лида ждёт ребёнка. Знала — и всё равно поднесла ей бокал.Но план дал сбой.Илья выпил яд. Он не почувствовал сразу — и отправился в потайную комнату, которую заранее подготовил с Виктором.Там он должен был спрятаться, исчезнуть на глазах у всех — как часть грандиозного финала. Виктор помогал ему: отключил камеры, запер за ним дверь.Но когда яд начал действовать, помощи ждать было неоткуда. Виктор, не зная о подмене, думал, что всё идёт по сценарию.Анна — не подозревала, что отравила не того.Так и закончился спектакль, в котором каждый сыграл не ту роль.А аплодисментов — не было."
];

// Компонент анимации печати с озвучкой
function TypewriterLine({ text, delay = 0 }: { text: string; delay?: number }) {
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
    }, [text, delay]);

    return (
        <p className="text-lg text-gray-300 font-mono whitespace-pre-wrap mb-6">
            {displayed}
            <span className="animate-pulse text-white">▌</span>
        </p>
    );
}

// Финальная страница
export default function TruthPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
            <h1 className="text-4xl font-bold mb-10">Правда</h1>
            <div className="max-w-3xl">
                {finalLines.map((line, idx) => (
                    <TypewriterLine key={idx} text={line} delay={idx * 1600} />
                ))}
            </div>
        </div>
    );
}