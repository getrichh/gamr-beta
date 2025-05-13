// app/page.tsx
"use client";


import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";






export default function HomePage() {


  const router = useRouter();

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Детектив: Начало</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Погрузись в мир загадок, улик и допросов. Каждый выбор — это шаг к раскрытию правды.
        </p>
        <Button
            className="text-lg px-8 py-6 rounded-xl"
            onClick={() => router.push("/game")}
        >
          Начать игру
        </Button>
      </div>
  );
}