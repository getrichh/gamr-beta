import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

// Типы
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

// 💠 Стили по персонажам
const ownerStyles: Record<string, { bg: string; border: string; icon: string }> = {
    anna: {
        bg: "bg-gradient-to-br from-rose-300 to-rose-500",
        border: "border-rose-500",
        icon: "/icons/anna.png",
    },
    lida: {
        bg: "bg-gradient-to-br from-green-700 to-green-900",
        border: "border-green-500",
        icon: "/icons/lida.png",
    },
    viktor: {
        bg: "bg-gradient-to-br from-blue-900 to-blue-600",
        border: "border-blue-500",
        icon: "/icons/viktor.png",
    },
    detective: {
        bg: "bg-gradient-to-br from-emerald-800 to-emerald-600",
        border: "border-emerald-500",
        icon: "/icons/detective.png",
    },
    system: {
        bg: "bg-gradient-to-br from-zinc-700 to-zinc-900",
        border: "border-zinc-500",
        icon: "/icons/atmosphere.png",
    },
    концовка: {
        bg: "bg-gradient-to-br from-red-500 to-red-800",
        border: "border-red-700",
        icon: "/icons/detective.png",
    },
};

// 🧠 Красивые имена для секций
const ownerNames: Record<string, string> = {
    анна: "Анна Михайловна",
    anna: "Анна Михайловна",
    лида: "Лида Рыжикова",
    lida: "Лида Рыжикова",
    виктор: "Виктор Петрович",
    viktor: "Виктор Петрович",
    Концовка: "Финал",
    концовка: "Финал",
    detective: "Размышления",
    system: "Атмосфера",
};

export default function CardGrid({
                                     groupedCards,
                                     visibleCards,
                                     openedCard,
                                     handleCardClick,
                                 }: Props) {
    return (
        <div className="space-y-12 max-w-6xl mx-auto">
            {Object.entries(groupedCards).map(([owner, cards]) => {
                const safeOwner = owner.toLowerCase();
                const style = ownerStyles[safeOwner] || ownerStyles.system;
                const sectionTitle = ownerNames[safeOwner] || owner;

                return (
                    <div key={owner}>
                        <h2 className="text-xl font-semibold capitalize mb-4 text-white flex items-center gap-2">
                            <img src={style.icon} alt="" className="w-6 h-6 opacity-70" />
                            {sectionTitle}
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
                                            "relative text-white transition cursor-pointer border-2 shadow-lg overflow-hidden group",
                                            style.bg,
                                            style.border,
                                            {
                                                "border-white": isOpened,
                                                "opacity-30 pointer-events-none": !isOpened,
                                                "hover:scale-[1.02]": isOpened,
                                            }
                                        )}
                                    >
                                        {/* Иконка */}
                                        <img
                                            src={style.icon}
                                            alt=""
                                            className="absolute top-2 right-2 w-10 h-10 opacity-30 group-hover:opacity-70 transition"
                                        />

                                        <CardHeader>
                                            <CardTitle className="text-lg font-bold drop-shadow">
                                                {card.title}{" "}
                                                {isOpened && <span className="text-sm">✅</span>}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-white/80">
                                                {isOpened ? "Просмотрено" : "Нажмите, чтобы изучить"}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}