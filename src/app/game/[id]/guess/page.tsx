"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GuessPage() {
    const [text, setText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { id } = useParams();
    const router = useRouter();
    const STORAGE_KEY = `detective-guess-${id}`;

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setText(saved);
            setSubmitted(true);
        }
    }, []);

    const handleSubmit = () => {
        if (text.trim().length === 0) return;
        localStorage.setItem(STORAGE_KEY, text);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-center">Твоя версия событий</h1>

            {!submitted ? (
                <>
                    <p className="text-gray-400 text-center mb-4">
                        Напиши, что, по твоему мнению, произошло на самом деле.
                    </p>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full max-w-2xl h-40 rounded-md border border-white bg-zinc-900 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring focus:ring-emerald-500"
                        placeholder="Опиши свою версию расследования..."
                    />
                    <Button className="mt-4" onClick={handleSubmit}>
                        Отправить версию
                    </Button>
                </>
            ) : (
                <div className="max-w-xl text-center">
                    <p className="text-green-400 text-lg mb-4">Версия сохранена!</p>
                    <p className="text-gray-300 mb-6">
                        Теперь ты можешь перейти к финальной карточке и узнать правду.
                    </p>
                    <Button variant="secondary" onClick={() => router.push(`/game/${id}`)}>
                        Вернуться к расследованию
                    </Button>
                </div>
            )}
        </div>
    );
}