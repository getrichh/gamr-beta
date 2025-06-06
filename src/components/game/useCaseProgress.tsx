import { useEffect, useMemo, useState } from "react";

export default function useCaseProgress(data: any, id: string | string[] | undefined) {
  const STORAGE_KEY = `detective-game-progress-${id}`;

  const groupedCards = useMemo(() => {
    const groups: Record<string, { index: number; card: any }[]> = {};
    data?.cards.forEach((card: any, index: number) => {
      const owner = card.owner || "system";
      if (!groups[owner]) groups[owner] = [];
      groups[owner].push({ index, card });
    });
    return groups;
  }, [data]);

  const [movesLeft, setMovesLeft] = useState(50);
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    data.cards.map((c: any) => !c.locked)
  );
  const [selectedCard, setSelectedCard] = useState<null | { title: string; description: string }>(null);

  const keyCardCount = data.cards.filter((card: any) => card.keyCard).length;
  const openedKeyCards = data.cards.filter((card: any) => card.keyCard && openedCard.includes(card.id)).length;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setOpenedCard(parsed.openedCard || []);
      setVisibleCards(
        parsed.visibleCards ||
          data.cards.map((c: any) => {
            if (c.requiresCards && c.requiresCards.length > 0) return false;
            return !c.locked;
          })
      );
      setMovesLeft(parsed.movesLeft ?? 5);
    }
  }, [STORAGE_KEY, data.cards]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ openedCard, visibleCards, movesLeft })
    );
  }, [openedCard, visibleCards, movesLeft, STORAGE_KEY]);

  useEffect(() => {
    setVisibleCards((prev) => {
      const updated = [...prev];
      data.cards.forEach((c: any, idx: number) => {
        if (!updated[idx] && c.requiresCards) {
          const allRequiredOpened = c.requiresCards.every((reqId: number) =>
            openedCard.includes(reqId)
          );
          if (allRequiredOpened) {
            updated[idx] = true;
          }
        }
      });
      return updated;
    });
  }, [openedCard, data.cards]);

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
        card.unlocks.forEach((i: number) => {
          const unlockIndex = data.cards.findIndex((c: any) => c.id === i);
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

  return {
    movesLeft,
    openedCard,
    visibleCards,
    selectedCard,
    setSelectedCard,
    handleCardClick,
    resetProgress,
    keyCardCount,
    openedKeyCards,
    groupedCards,
  };
}