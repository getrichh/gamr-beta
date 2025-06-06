"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
    const router = useRouter();

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4"
            style={{
                backgroundImage: "url('/images/base2.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "contain", // <== 🔥 не обрезает, не растягивает
                opacity: 1,
            }}
        >
            {/* Затемняющая вуаль */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* Контент */}
            <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                    Детектив: Начало
                </h1>
                <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-gray-200">
                    Погрузись в мир загадок, улик и допросов. Каждый выбор — шаг к раскрытию правды.
                </p>
                <Button
                    className="text-lg px-10 py-6 rounded-2xl bg-red-800 hover:bg-red-700 shadow-lg hover:scale-105 transition-transform duration-300"
                    onClick={() => router.push("/game")}
                >
                    Начать игру
                </Button>
            </motion.div>
        </div>
    );
}