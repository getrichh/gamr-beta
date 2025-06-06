"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { caseData as lastrehearsal } from "@/data/cases/last-rehearsal";
import CardGrid from "@/components/game/CardGrid";

type Card = {
    id: number;
    title: string;
    description: string;
    owner?: string;
    isLink?: boolean;
    linkUrl?: string;
    locked?: boolean;
    requiresStep?: boolean;
    unlocks?: number[];
};

type CaseData = {
    title: string;
    cards: Card[];
};

const caseMap: Record<string, CaseData> = {
    "last-rehearsal": lastrehearsal,
};

export default function CasePage() {
    const { id } = useParams();
    const caseId = id as string;
    const data = caseMap[caseId];

    const STORAGE_KEY = `detective-game-progress-${caseId}`;

    const [movesLeft, setMovesLeft] = useState(5);
    const [openedCard, setOpenedCard] = useState<number[]>([]);
    const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
    const [selectedCard, setSelectedCard] = useState<null | Card>(null);

    // Инициализация
    useEffect(() => {
        if (!data) return;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setOpenedCard(parsed.openedCard || []);
            setVisibleCards(parsed.visibleCards || data.cards.map((c) => !c.locked));
            setMovesLeft(parsed.movesLeft ?? 5);
        } else {
            setVisibleCards(data.cards.map((c) => !c.locked));
        }
    }, [caseId]);

    // Сохраняем прогресс
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ openedCard, visibleCards, movesLeft })
        );
    }, [openedCard, visibleCards, movesLeft]);

    if (!data || !Array.isArray(data.cards)) {
        return (
            <div className="text-white flex justify-center items-center min-h-screen">
                Расследование не найдено или повреждено.
            </div>
        );
    }

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

        if (card.unlocks && card.unlocks.length > 0) {
            setVisibleCards((prev) => {
                const updated = [...prev];
                card.unlocks!.forEach((i) => (updated[i] = true));
                return updated;
            });
        }
    };

    const resetProgress = () => {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    };

    const groupedCards = data.cards.reduce<Record<string, { index: number; card: Card }[]>>(
        (acc, card, index) => {
            const owner = (card.owner || "system").toLowerCase();
            if (!acc[owner]) acc[owner] = [];
            acc[owner].push({ index, card });
            return acc;
        },
        {}
    );

    return (
        <div className="min-h-screen bg-black text-white px-4 py-12">
            <div className="flex justify-between max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <Button variant="destructive" onClick={resetProgress}>
                    Сбросить игру
                </Button>
            </div>

            <p className="text-center text-gray-400 mb-8">Осталось ходов: {movesLeft}</p>

            <CardGrid
                groupedCards={groupedCards}
                visibleCards={visibleCards}
                openedCard={openedCard}
                handleCardClick={handleCardClick}
            />

            <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedCard?.title}</DialogTitle>
                    </DialogHeader>
                    <p>{selectedCard?.description}</p>
                </DialogContent>
            </Dialog>
        </div>
    );
}