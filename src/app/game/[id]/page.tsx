"use client";

import { useParams } from "next/navigation";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import clsx from "clsx";
import {caseData as knifeinback} from "@/data/cases/knife-in-back";
import {caseData as lasttrain} from "@/data/cases/last-train";
import {caseData as lastrehearsal} from "@/data/cases/last-rehearsal";
const caseMap = {
    "knife-in-back": knifeinback,
    "last-train": lasttrain,
    "last-rehearsal": lastrehearsal,

};

    // можно добавить другие кейсы тут


export default function CasePage() {
    const { id } = useParams();
    const data = caseMap[id as string];

    const [movesLeft, setMovesLeft] = useState(5);
    const [openedCard, setOpenedCard] = useState<number[]>([]);
    const [visibleCards, setVisibleCards] = useState(  ()=>
       data.cards.map((card, index) => !card.locked)
    );

    const [selectedCard, setSelectedCard] = useState<null | {
        title: string;
        description: string;
    }>(null);

    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Расследование не найдено.</p>
            </div>
        );
    }

    const handleCardClick = (index: number) => {
        // Получаем карточку по индексу из массива data.cards
        const card = data.cards[index];

        // Проверяем, была ли эта карточка уже открыта ранее
        const isAlreadyOpened = openedCard.includes(index);

        // Если карточка ещё недоступна (её ещё не разблокировали) — игнорируем клик
        if (!visibleCards[index]) return;

        // Если у игрока закончились ходы и карточка открывается впервые — ничего не делаем
        if (movesLeft <= 0 && !isAlreadyOpened) return;

        // Открываем карточку в модальном окне (Dialog)
        setSelectedCard(card);

        // Если карточка открывается впервые:
        if (!isAlreadyOpened) {
            // Уменьшаем количество оставшихся ходов на 1
            setMovesLeft((prev) => prev - 1);

            // Добавляем индекс этой карточки в список открытых карточек
            setOpenedCard((prev) => [...prev, index]);
        }

        // Если карточка содержит поле unlocks (массив индексов других карточек)
        if (card.unlocks) {
            // Обновляем состояние видимых карточек (разблокируем новые)
            setVisibleCards((prev) => {
                // Копируем массив видимости
                const updated = [...prev];

                // Делаем доступными указанные карточки по индексам
                card.unlocks.forEach((i) => (updated[i] = true));

                return updated;
            });
        }
    };


    return (

        <div className="min-h-screen bg-black text-white py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-10">{data.title}</h1>
            <p> количество ходов  { movesLeft}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {data.cards.map((card, index) => (
                    visibleCards[index] &&(
                    <Card
                        key={index}
                        className={clsx(
                            "bg-zinc-900 text-white border-zinc-800 shadow-lg cursor-pointer transition",
                            {
                                "border-white": openedCard.includes(index),
                                "opacity-30 pointer-events-none": !openedCard.includes(index) && movesLeft <= 0,
                                "hover:border-white": !openedCard.includes(index) && movesLeft > 0,
                            }
                        )}
                        onClick={() => handleCardClick(index)}
                    >
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-300">

                                {openedCard.includes(index) ? " Просмотрено": "Нажмите , чтобы изучить"}

                            </p>
                        </CardContent>
                    </Card>)
                ))}
            </div>

            {/* Диалоговая модалка */}
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