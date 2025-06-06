"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import type { CardType, CaseData } from '@/types/cases';

import { caseData as lastrehearsal } from "@/data/cases/last-rehearsal";
import CardGrid from "@/components/game/CardGrid";
import CardDialog from "@/components/game/CardDialog";

import { loadProgress, saveProgress, clearProgress } from "@/lib/storage";
import { groupCardsByOwner } from "@/components/group";

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
    const [selectedCard, setSelectedCard] = useState<null | CardType>(null);

    // Инициализация прогресса
    useEffect(() => {
        if (!data) return;
        const saved = loadProgress(STORAGE_KEY);
        if (saved) {
            setOpenedCard(saved.openedCard || []);
            setVisibleCards(saved.visibleCards || data.cards.map((c) => !c.locked));
            setMovesLeft(saved.movesLeft ?? 5);
        } else {
            setVisibleCards(data.cards.map((c) => !c.locked));
        }
    }, [caseId, data]);


    // Сохранение прогресса
    useEffect(() => {
        saveProgress(STORAGE_KEY, { openedCard, visibleCards, movesLeft });
    }, [openedCard, visibleCards, movesLeft]);



    const handleCardClick = (index: number) => {
        if (!data) return;
        const card = data.cards[index];
        const alreadyOpened = openedCard.includes(card.id);

        if (!visibleCards[index]) return;
        if (!alreadyOpened && card.requiresStep && movesLeft <= 0) return;

        setSelectedCard(card);

        if (!alreadyOpened) {
            if (card.requiresStep) setMovesLeft((prev) => prev - 1);
            setOpenedCard((prev) => [...prev, card.id]);
        }

        if (card.unlocks?.length) {
            setVisibleCards((prev) => {
                const updated = [...prev];
                card.unlocks!.forEach((i) => {
                    if (i >= 0 && i < updated.length) updated[i] = true;
                });
                return updated;
            });
        }
    };

    const resetProgress = () => {
        clearProgress(STORAGE_KEY);
        location.reload();
    };


    if (!data || !data.cards) {
        return (
            <div className="text-white flex justify-center items-center min-h-screen">
                Расследование не найдено или повреждено.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-12">
            <div className="flex justify-between max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <Button variant="destructive" onClick={resetProgress}>
                    Сбросить игру
                </Button>
            </div>

            <p className="text-center text-gray-400 mb-8">Осталось ходов: {movesLeft}</p>

            {Object.entries(groupCardsByOwner(data.cards)).map(([owner, cards]) => (
                <div key={owner} className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 capitalize flex items-center gap-2">
                        <img src={`/icons/${owner}.png`} alt={owner} className="w-6 h-6 object-contain" />
                        {owner}
                    </h2>
                    <CardGrid
                        cards={cards}
                        visibleCards={cards.map(c => visibleCards[data.cards.indexOf(c)])}
                        openedCard={openedCard}
                        movesLeft={movesLeft}
                        onCardClick={(index) => {
                            const realIndex = data.cards.indexOf(cards[index]);
                            handleCardClick(realIndex);
                        }}
                    />
                </div>
            ))}
            <CardDialog
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
            />
        </div>
    );
}