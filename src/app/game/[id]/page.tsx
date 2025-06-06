"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Импорты кейсов
import { caseData as knifeinback } from "@/data/cases/knife-in-back";
import { caseData as lasttrain } from "@/data/cases/last-train";
import { caseData as lastrehearsal } from "@/data/cases/last-rehearsal";

// Карта кейсов
const caseMap = {
    "knife-in-back": knifeinback,
    "last-train": lasttrain,
    "last-rehearsal": lastrehearsal,
};

    // можно добавить другие кейсы тут

export default function CasePage() {
    const { id } = useParams();
    const data = caseMap[id as string];
    const STORAGE_KEY = `detective-game-progress-${id}`;

    const [movesLeft, setMovesLeft] = useState(5);
    const [openedCard, setOpenedCard] = useState<number[]>([]);
    const [visibleCards, setVisibleCards] = useState<boolean[]>(data.cards.map(c => !c.locked));
    const [selectedCard, setSelectedCard] = useState<null | { title: string; description: string }>(null);

    // Загрузка из localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setOpenedCard(parsed.openedCard || []);
            setVisibleCards(parsed.visibleCards || data.cards.map(c => !c.locked));
            setMovesLeft(parsed.movesLeft ?? 5);
        }
    }, []);

    // Сохранение в localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ openedCard, visibleCards, movesLeft }));
    }, [openedCard, visibleCards, movesLeft]);

    // Обработка клика по карточке
    const handleCardClick = (index: number) => {
        const card = data.cards[index];
        const alreadyOpened = openedCard.includes(index);
        if (!visibleCards[index]) return;
        if (!alreadyOpened && card.requiresStep && movesLeft <= 0) return;

        setSelectedCard(card);

        if (!alreadyOpened) {
            if (card.requiresStep) setMovesLeft((prev) => prev - 1);
            setOpenedCard((prev) => [...prev, index]);
        }

        if (card.unlocks) {
            setVisibleCards((prev) => {
                const updated = [...prev];
                card.unlocks.forEach(i => updated[i] = true);
                return updated;
            });
        }
    };

    // Сброс прогресса
    const resetProgress = () => {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    };

    if (!data) {
        return <div className="text-white flex justify-center items-center min-h-screen">Расследование не найдено</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-12">
            <div className="flex justify-between max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <Button variant="destructive" onClick={resetProgress}>Сбросить игру</Button>
            </div>

            <p className="text-center text-gray-400 mb-8">Осталось ходов: {movesLeft}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {data.cards.map((card, index) =>
                    visibleCards[index] ? (
                        <Card key={index}
                              onClick={() => handleCardClick(index)}
                              className={clsx(
                                  "bg-zinc-900 text-white border-zinc-800 transition cursor-pointer",
                                  {
                                      "border-white": openedCard.includes(index),
                                      "opacity-30 pointer-events-none": !openedCard.includes(index) && movesLeft <= 0,
                                      "hover:border-white": !openedCard.includes(index) && movesLeft > 0,
                                  }
                              )}
                        >
                            <CardHeader><CardTitle>{card.title}</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-300">
                                    {openedCard.includes(index) ? "Просмотрено" : "Нажмите, чтобы изучить"}
                                </p>
                            </CardContent>
                        </Card>
                    ) : null
                )}
            </div>

            <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{selectedCard?.title}</DialogTitle></DialogHeader>
                    <p>{selectedCard?.description}</p>
                </DialogContent>
            </Dialog>
        </div>
    );
}