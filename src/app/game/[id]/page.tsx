"use client";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState, useMemo } from "react";
import { caseData as knifeinback } from "@/data/cases/knife-in-back";
import { caseData as lasttrain } from "@/data/cases/last-train";
import { caseData as lastrehearsal } from "@/data/cases/last-rehearsal";

const caseMap = {
    "knife-in-back": knifeinback,
    "last-train": lasttrain,
    "last-rehearsal": lastrehearsal,
};

const ownerColor: Record<string, string> = {
    анна: "bg-rose-300 border-rose-300",
    лида: "bg-green-900 border-green-900",
    виктор: "bg-sky-900 border-sky-600",
    Концовка: "bg-red-500 border-zinc-600",
    detective: "bg-emerald-900 border-emerald-600",
};

export default function CasePage() {
    const { id } = useParams();
    const data = caseMap[id as string];
    const STORAGE_KEY = `detective-game-progress-${id}`;
    const groupedCards = useMemo(() => {
        const groups: Record<string, { index: number; card: any }[]> = {};
        data.cards.forEach((card, index) => {
            const owner = card.owner || "system";
            if (!groups[owner]) groups[owner] = [];
            groups[owner].push({ index, card });
        });
        return groups;
    }, [data.cards]);

    const [movesLeft, setMovesLeft] = useState(50);
    const [openedCard, setOpenedCard] = useState<number[]>([]);
    const [visibleCards, setVisibleCards] = useState<boolean[]>(data.cards.map(c => !c.locked));
    const [selectedCard, setSelectedCard] = useState<null | { title: string; description: string }>(null);
    const keyCardCount = data.cards.filter((card) => card.keyCard).length;
    const openedKeyCards = data.cards.filter((card, idx) => card.keyCard && openedCard.includes(card.id)).length;

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setOpenedCard(parsed.openedCard || []);
            setVisibleCards(parsed.visibleCards || data.cards.map(c => !c.locked));
            setMovesLeft(parsed.movesLeft ?? 5);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ openedCard, visibleCards, movesLeft }));
    }, [openedCard, visibleCards, movesLeft]);

    const handleCardClick = (index: number) => {
        const card = data.cards[index];
        const alreadyOpened = openedCard.includes(card.id);
        if (!visibleCards[index]) return;
        if (!alreadyOpened && card.requiresStep && movesLeft <= 0) return;

        setSelectedCard(card);

        if (!alreadyOpened) {
            if (card.requiresStep) setMovesLeft((prev) => prev - 1);
            setOpenedCard((prev) => [...prev, card.id]);
        }

        if (card.unlocks) {
            setVisibleCards((prev) => {
                const updated = [...prev];
                card.unlocks.forEach(i => {
                    const unlockIndex = data.cards.findIndex(c => c.id === i);
                    if (unlockIndex !== -1) updated[unlockIndex] = true;
                });
                return updated;
            });
        }
    };

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
            <p className="text-center text-yellow-500 mb-8">
                🔑 Ключевые улики: {openedKeyCards} / {keyCardCount}
            </p>
            <div className="space-y-12 max-w-6xl mx-auto">
                {Object.entries(groupedCards).map(([owner, cards]) => (
                    <div key={owner}>
                        <h2 className="text-xl font-semibold capitalize mb-4 text-white">
                            {owner === "system"
                                ? "Атмосфера"
                                : owner === "detective"
                                    ? "Размышления"
                                    : owner === "anna"
                                        ? "Анна Михайловна"
                                        : owner === "lida"
                                            ? "Лида Рыжикова"
                                            : owner === "viktor"
                                                ? "Виктор Петрович"
                                                : owner}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {cards.map(({ index, card }) => {
                                const isOpened = openedCard.includes(card.id);
                                return visibleCards[index] ? (
                                    <Card
                                        key={index}
                                        onClick={() => {
                                            if (card.isLink && card.linkUrl) {
                                                window.location.href = card.linkUrl;
                                            } else {
                                                handleCardClick(index);
                                            }
                                        }}
                                        className={clsx(
                                            "text-white transition cursor-pointer",
                                            ownerColor[card.owner || "system"],
                                            {
                                                "border-white": openedCard.includes(index),
                                                "opacity-30 pointer-events-none": !openedCard.includes(index) && movesLeft <= 0,
                                                "hover:border-white": !openedCard.includes(index) && movesLeft > 0,
                                            }
                                        )}
                                    >
                                        <CardHeader>
                                            <CardTitle>
                                                {card.title} {isOpened && <span className="text-sm">✅</span>}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-zinc-300">
                                                {isOpened ? "Просмотрено" : "Нажмите, чтобы изучить"}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : null;
                            })}
                        </div>
                    </div>
                ))}
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