import { Button } from "@/components/ui/button";

export default function CaseHeader({ title, movesLeft, keyCardCount, openedKeyCards, resetProgress }: any) {
    return (
        <div className="flex justify-between max-w-6xl mx-auto mb-6">
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-gray-400">Осталось ходов: {movesLeft}</p>
                <p className="text-yellow-500">
                    🔑 Ключевые улики: {openedKeyCards} / {keyCardCount}
                </p>
            </div>
            <Button variant="destructive" onClick={resetProgress}>
                Сбросить игру
            </Button>
        </div>
    );
}