"use client";
import { useParams } from "next/navigation";
import { caseData as lastrehearsal } from "@/data/cases/last-rehearsal";
import CaseHeader from "@/components/game/CaseHeader";
import CardGrid from "@/components/game/CardGrid";
import CaseDialog from "@/components/game/CaseDialog";
import useCaseProgress from "@/components/game/useCaseProgress";

const caseMap = {
    "last-rehearsal": lastrehearsal,
};

export default function CasePage() {
    const { id } = useParams();
    const data = caseMap[id as keyof typeof caseMap];

    const {
        movesLeft,
        openedCard,
        visibleCards,
        setSelectedCard,
        selectedCard,
        handleCardClick,
        resetProgress,
        keyCardCount,
        openedKeyCards,
        groupedCards,
    } = useCaseProgress(data, id);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
                🚫 Расследование не найдено
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-12">
            <CaseHeader
                title={data.title}
                movesLeft={movesLeft}
                keyCardCount={keyCardCount}
                openedKeyCards={openedKeyCards}
                resetProgress={resetProgress}
            />
            <CardGrid
                groupedCards={groupedCards}
                visibleCards={visibleCards}
                openedCard={openedCard}
                handleCardClick={handleCardClick}
            />
            <CaseDialog selectedCard={selectedCard} onClose={() => setSelectedCard(null)} />
        </div>
    );
}