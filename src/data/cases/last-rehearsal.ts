export const caseData = {
    title: "Показания: Последняя репетиция",
    cards: [
        {
            title: "Гримёрка, 22:30",
            description: "Шестаков требует от Веры остаться на сезон, угрожая вырезать её из будущей постановки.",
            locked: false,
            requiresStep: true,
            unlocks: [1, 2, 7]
        },
        {
            title: "Конфликт",
            description: "Вера кричит на него. Он разбивает бокал. Она уходит в слезах.",
            locked: true,
            requiresStep: true,
            unlocks: [3]
        },
        {
            title: "Подслушанный разговор",
            description: "Она слышит, как Илья говорит с кем-то о «финальной репетиции».",
            locked: true,
            requiresStep: true,
            unlocks: [4, 5]
        },
        {
            title: "Холл, 23:00",
            description: "Видит Риту, выглядящую растерянной, у зеркала.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Театральный зал",
            description: "Слышит шаги на балконе, хотя там никого не должно быть.",
            locked: true,
            requiresStep: true,
            unlocks: [6]
        },
        {
            title: "Уход",
            description: "Покидает театр. Говорит, что больше не вернётся.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Сомнение",
            description: "В монологе упоминает: «А если он всё подстроил?..»",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Кладовка",
            description: "Видит, как Шестаков роется в ящике с инструментами. Берёт фонарик.",
            locked: true,
            requiresStep: true,
            unlocks: [8, 10]
        },
        {
            title: "Электрощитовая",
            description: "Пропадает питание на 15 секунд. Кто-то выключил рубильник.",
            locked: true,
            requiresStep: true,
            unlocks: [9]
        },
        {
            title: "Чердак",
            description: "Находит отпечатки обуви на пыльном полу. Туда не поднимался.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Разговор с Ильёй",
            description: "Обсуждают слухи о закрытии театра.",
            locked: true,
            requiresStep: true,
            unlocks: [11]
        },
        {
            title: "Сцена",
            description: "Видит Веру, выбегающую в панике.",
            locked: true,
            requiresStep: true,
            unlocks: [12, 13, 15]
        },
        {
            title: "Камера наблюдения",
            description: "Проверяет логи — в 23:41 лестница скрипит, но никого не видно.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Панель управления",
            description: "В системе открыта «дверь 7». Такой нет в официальном плане.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Переодевание",
            description: "Случайно находит письмо без подписи: «Это мой финальный акт».",
            locked: true,
            requiresStep: true,
            unlocks: [16, 17]
        },
        {
            title: "Холл",
            description: "Видит Илью, передающего кому-то связку ключей.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Репетиционная",
            description: "Слышит, как кто-то говорит: «Он действительно готов это сделать?»",
            locked: true,
            requiresStep: true,
            unlocks: [18]
        },
        {
            title: "Гримёрка",
            description: "Отражение в зеркале будто \"не совпадает\" с её движениями.",
            locked: true,
            requiresStep: true,
            unlocks: [19]
        },
        {
            title: "Лестница",
            description: "Поднимается, но слышит, как кто-то уже наверху.",
            locked: true,
            requiresStep: true,
            unlocks: [20]
        },
        {
            title: "Галерея",
            description: "Видит тень, но не может определить, чья.",
            locked: true,
            requiresStep: true,
            unlocks: []
        },
        {
            title: "Паника",
            description: "Шепчет: «А вдруг он вообще не собирался умирать?..»",
            locked: true,
            requiresStep: true,
            unlocks: []
        },

        // 🔮 Эхо-карточки (добавлены ниже):
        {
            title: "Старый сценарий",
            description: "В углу сцены лежит забытый экземпляр сценария с пометками. Некоторые сцены вычеркнуты, но именно они и произошли.",
            locked: false,
            requiresStep: false,
            unlocks: []
        },
        {
            title: "Разговор у кофейного автомата",
            description: "«Если бы он не вмешивался… всё было бы иначе», — слышишь ты вполголоса. Но лица говорящего не видно.",
            locked: false,
            requiresStep: false,
            unlocks: []
        },
        {
            title: "Тень на стене",
            description: "Когда ты одна в холле, замечаешь странную тень, двигающуюся не синхронно с твоей. Иллюзия? Или кто-то за тобой наблюдает?",
            locked: false,
            requiresStep: false,
            unlocks: []
        }
    ]
};