"use client";


import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GamePage() {
    const router = useRouter();



    const games = [

        {
            id: "last-rehearsal",
            title: "Показания: Последняя репетиция",
            description: "Исчезновение режиссёра на закрытом вечере. Каждое показание ведёт к другой правде.",
        },
    ];


    const handlePlay = (id:string)=>{
        router.push(`/game/start/${id}`);
    }



    return (
        <div className="min-h-screen bg-black text-white py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-10">Выбери расследование</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {games.map((game) => (
                    <Card key={game.id} className="bg-zinc-900 text-white border-zinc-800 shadow-lg">
                        <CardHeader>
                            <CardTitle>{game.title}</CardTitle>
                            <CardDescription>{game.description}</CardDescription>
                        </CardHeader>
                        <CardContent>


                            <Button className="w-full" variant="secondary" onClick={() => handlePlay(game.id)} >
                                Играть
                            </Button>


                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}