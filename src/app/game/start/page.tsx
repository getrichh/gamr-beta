"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const investigations = {
    "knife-in-back": {
        title: "Нож в спину",
        intro: "Тело мужчины найдено в библиотеке старого особняка. Все окна закрыты изнутри, а дверь была заперта. В комнате — трое подозреваемых.",
    },
    "last-train": {
        title: "Последний Поезд",
        intro: "Поезд мчится в ночь. Один из пассажиров найден мёртвым. Осталось три остановки, чтобы найти убийцу.",
    },
    "masquerade": {
        title: "Маскарад Смерти",
        intro: "Бал в особняке закончился трагедией. Среди масок скрывается убийца. Ваша задача — узнать, кто он.",
    },
};

export default function StartPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const data = useMemo(() => investigations[id as keyof typeof investigations], [id]);

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
            <p className="text-lg max-w-xl text-gray-300 mb-10">{data.intro}</p>
            <Button onClick={handleStart} className="text-lg px-8 py-6 rounded-xl">
                Приступить к расследованию
            </Button>
        </div>
    );
}