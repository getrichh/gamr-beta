

export type CardType = {
    id: number;
    title: string;
    description: string;
    owner?: string;
    isLink?: boolean;
    linkUrl?: string;
    locked?: boolean;
    requiresStep?: boolean;
    unlocks?: number[];
    images?: string;
};

export type CaseData = {
    title: string;
    cards: CardType[];
};