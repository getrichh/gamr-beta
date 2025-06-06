// components/game/CardGrid.tsx
"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import clsx from "clsx";
import type { CardType } from "@/types/cases";

type Props = {
    cards: CardType[];
    visibleCards: boolean[];
    openedCard: number[];
    movesLeft: number;
    onCardClick: (index: number) => void;
};

export default function CardGrid({
                                     cards,
                                     visibleCards,
                                     openedCard,
                                     movesLeft,
                                     onCardClick,
                                 }: Props) {

    console.log(cards);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cards.map((card, index) => {
                const isVisible = visibleCards[index];
                const isOpened = openedCard.includes(card.id);
                if (!isVisible) return null;

                return (
                    <Card
                        key={card.id}
                        onClick={() => onCardClick(index)}
                        className={clsx(
                            "bg-zinc-900 text-white border-zinc-800 transition cursor-pointer",
                            {
                                "border-white": isOpened,
                                "opacity-30 pointer-events-none": !isOpened && movesLeft <= 0,
                                "hover:border-white": !isOpened && movesLeft > 0,
                            }
                        )}
                    >
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>
                                <img src={card.images} className="mt-2 w-12 h-12 object-contain" alt=""/>
                            </CardDescription>


                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-300">
                                {isOpened ? "Просмотрено" : "Нажмите, чтобы изучить"}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}