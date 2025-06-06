import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

type CardType = {
    id: number;
    title: string;
    description: string;
    owner?: string;
    isLink?: boolean;
    linkUrl?: string;
};

type GroupedCard = {
    index: number;
    card: CardType;
};

type Props = {
    groupedCards: Record<string, GroupedCard[]>;
    visibleCards: boolean[];
    openedCard: number[];
    handleCardClick: (index: number) => void;
};

const ownerColor: Record<string, string> = {
    анна: "bg-rose-300 border-rose-300",
    лида: "bg-green-900 border-green-900",
    виктор: "bg-sky-900 border-sky-600",
    Концовка: "bg-red-500 border-zinc-600",
    detective: "bg-emerald-900 border-emerald-600",
};

export default function CardGrid({
                                     groupedCards,
                                     visibleCards,
                                     openedCard,
                                     handleCardClick,
                                 }: Props) {
    return (
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
                            const isVisible = visibleCards[index];
                            const isOpened = openedCard.includes(card.id);

                            if (!isVisible) return null;

                            return (
                                <Card
                                    key={card.id}
                                    onClick={() =>
                                        card.isLink && card.linkUrl
                                            ? (window.location.href = card.linkUrl)
                                            : handleCardClick(index)
                                    }
                                    className={clsx(
                                        "text-white transition cursor-pointer",
                                        ownerColor[card.owner || "system"],
                                        {
                                            "border-white": isOpened,
                                            "opacity-30 pointer-events-none": !isOpened,
                                            "hover:border-white": !isOpened,
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
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}