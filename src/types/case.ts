export interface Card {
    id: number;
    title: string;
    description: string;
    owner?: string;
    locked?: boolean;
    costStep?: boolean;
    requiresStep?: boolean;
    unlocks?: number[];
    requiresCards?: number[];
    keyCard?: boolean;
    isLink?: boolean;
    linkUrl?: string;
}

export interface CaseData {
    title: string;
    cards: Card[];
}