// lib/group.ts

import type { CardType } from "@/types/cases";

export function groupCardsByOwner(cards: CardType[]): Record<string, CardType[]> {
    return cards.reduce((acc, card) => {
        const owner = card.owner ?? "Без владельца";
        if (!acc[owner]) acc[owner] = [];
        acc[owner].push(card);
        return acc;
    }, {} as Record<string, CardType[]>);
}