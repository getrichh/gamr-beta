"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMemo, useEffect, useState, useRef } from "react";

// 🎭 Описание интро
const investigations = {
        "last-rehearsal": {
            title: "Показания: Последняя репетиция",
            intro: [
                "Театр «Сфера». Когда-то — место, где рождались роли. Сейчас — сцена преступления. Режиссёр Илья Шестаков исчез после банкета закрытия сезона. Ни записки, ни тела. Только пустой сценарий с фразой на обложке: «Настоящее искусство живёт в неведении».Ты прибыл на место по странному зову — неофициальному. Ты — детектив, которому придётся распутать чужую постановку. Если всё это — постановка.Занавес уже поднят. Добро пожаловать в «Последнюю репетицию».",
            ]
    },
};

// 🔊 Компонент печати с цикличным звуком
function TypewriterLine({
                            text,
                            delay = 0,
                            skip = false,
                        }: { text: string; delay?: number; skip?: boolean }) {
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
// 📜 Основной экран старта игры
export default function StartPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const [skipAll, setSkipAll] = useState(false);

    const data = useMemo(() => investigations[id as keyof typeof investigations], [id]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") setSkipAll(true);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!id || !data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Расследование не найдено.</p>
            </div>
        );
    }

    const handleStart = () => {
        router.push(`/game/${id}`);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">{data.title}</h1>

            <div className="max-w-3xl mb-10 space-y-4">
                {Array.isArray(data.intro) ? (
                    data.intro.map((line, idx) => (
                        <TypewriterLine key={idx} text={line} delay={idx * 1400} skip={skipAll} />
                    ))
                ) : (
                    <TypewriterLine text={data.intro as string} skip={skipAll} />
                )}
            </div>

            <Button onClick={handleStart} className="text-lg px-8 py-6 rounded-xl">
                Приступить к расследованию
            </Button>
        </div>
    );
}