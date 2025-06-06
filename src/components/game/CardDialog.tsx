// components/game/CardDialog.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CardType } from "@/types/cases";

type Props = {
    card: CardType | null;
    onClose: () => void;
};

export default function CardDialog({ card, onClose }: Props) {
    return (
        <Dialog open={!!card} onOpenChange={onClose}>
            {card && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{card.title}</DialogTitle>
                    </DialogHeader>
                    <p className="whitespace-pre-line">{card.description}</p>
                </DialogContent>
            )}
        </Dialog>
    );
}