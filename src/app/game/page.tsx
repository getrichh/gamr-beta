"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useRouter } from "next/navigation";

const games = [
    {
        id: "knife-in-back",
        title: "Нож в спину",
        description: "Жертва найдена в особняке. Никто не ушёл. Все под подозрением.",
        image: "/images/base.png",
        gradient: "from-red-900 via-black to-black",
    },
    {
        id: "last-train",
        title: "Последний Поезд",
        description: "Пассажиры исчезают один за другим. Сможешь ли ты выжить до конечной?",
        image: "/images/base.png",
        gradient: "from-purple-900 via-black to-black",
    },
    {
        id: "masquerade",
        title: "Маскарад Смерти",
        description: "Бал, тайные личности и один смертельный секрет.",
        image: "/images/base.png",
        gradient: "from-yellow-900 via-black to-black",
    },
    {
        id: "last-rehearsal",
        title: "Показания: Последняя репетиция",
        description: "Исчезновение режиссёра на закрытом вечере. Каждое показание ведёт к другой правде.",
        image: "/images/base.png",
        gradient: "from-blue-900 via-black to-black",
    },
    {
        id: "quiet-dressing-room",
        title: "Тишина в гримёрке",
        description: "За час до премьеры — кто-то упал без сознания. Кто сорвёт спектакль?",
        image: "/images/base.png",
        gradient: "from-pink-900 via-black to-black",
    },
];

export default function GameScrollPage() {
    const [index, setIndex] = useState(0);
    const [canScroll, setCanScroll] = useState(true);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!canScroll) return;

            if (e.deltaY > 30 && index < games.length - 1) {
                setIndex((i) => i + 1);
                setCanScroll(false);
            } else if (e.deltaY < -30 && index > 0) {
                setIndex((i) => i - 1);
                setCanScroll(false);
            }
        };

        const enableScroll = () => setCanScroll(true);
        const timeout = setTimeout(enableScroll, 1000);

        window.addEventListener("wheel", handleWheel);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("wheel", handleWheel);
        };
    }, [index, canScroll]);

    const game = games[index];


    const router = useRouter();
    const handlePlay = () => {
        router.push(`/start?id=${game.id}`);
    };
    return (
        <div className={`relative w-full h-screen overflow-hidden transition duration-700 bg-gradient-to-b ${game.gradient}`}>

            <AnimatePresence mode="wait">
                <motion.div
                    key={game.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
                >
                    <div className="max-w-xl w-full text-center">
                        <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-80 object-cover rounded-2xl shadow-lg mb-8"
                        />
                        <h1 className="text-4xl font-bold mb-4 drop-shadow-md">{game.title}</h1>
                        <p className="text-lg text-gray-200 mb-6">{game.description}</p>
                        <button
                            onClick={handlePlay}
                            className="px-6 py-3 bg-red-800 hover:bg-red-700 transition rounded-xl shadow-md"
                        >
                            Играть
                        </button>
                        <ScrollIndicator />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}