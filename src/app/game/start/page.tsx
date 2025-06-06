"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMemo, useEffect, useState } from "react";
import { investigations } from "@/data/investigations";
import TypewriterLine from "@/components/effects/TypewriterLine";

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