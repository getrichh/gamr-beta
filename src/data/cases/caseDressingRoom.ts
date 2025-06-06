export const caseData = {
    title: "Тишина в гримёрке",
    cards: [
        // Глава 1 — старт
        {
            title: "Главная актриса",
            description: "Я должна была выйти на сцену первой. Но кто-то знал, как мне помешать.",
            locked: false,
            unlocks: [6],
            requiresStep: false,
        },
        {
            title: "Режиссёр",
            description: "Этот спектакль — моё детище. И кто-то хочет его убить.",
            locked: false,
            unlocks: [11],
            requiresStep: false,
        },
        {
            title: "Гримерша",
            description: "Я видела, как она входила в гримёрку... одна. Потом услышала звон стекла.",
            locked: false,
            unlocks: [9],
            requiresStep: false,
        },
        {
            title: "Гримёрка",
            description: "Зеркало разбито, духи разлиты. Сцена улики — но чего именно?",
            locked: false,
            unlocks: [],
            requiresStep: false,
        },
        {
            title: "Театр за кулисами",
            description: "Шёпот. Страх. Нервное напряжение витает в воздухе.",
            locked: false,
            unlocks: [],
            requiresStep: false,
        },

        // Улика из Глава 1
        {
            title: "Записка с угрозами",
            description: "«Если ты выйдешь на сцену — последуют последствия». Почерк неузнаваемый.",
            locked: true,
            unlocks: [7, 8],
            requiresStep: true,
        },

        // Глава 2 — новые персонажи
        {
            title: "Дублёрша",
            description: "Я могла бы сыграть эту роль не хуже... Но это ведь не повод, правда?",
            locked: true,
            unlocks: [13],
            requiresStep: true,
        },
        {
            title: "Осветитель",
            description: "Я видел больше, чем вы думаете. Но меня никто не замечает.",
            locked: true,
            unlocks: [10],
            requiresStep: true,
        },

        // Улики из Глава 2
        {
            title: "Следы грима",
            description: "В гриме обнаружены следы успокоительного... или чего-то хуже?",
            locked: true,
            unlocks: [12],
            requiresStep: true,
        },
        {
            title: "Скрытая запись",
            description: "На видео видно, как кто-то выходит из гримёрки... в чужом костюме.",
            locked: true,
            unlocks: [14],
            requiresStep: true,
        },

        // Развилка
        {
            title: "Развилка: доверие",
            description: "Кому ты доверишься? Режиссёру, который на грани? Или драматургу, чью пьесу переписали?",
            locked: true,
            unlocks: [12],
            requiresStep: true,
        },

        // Атмосфера
        {
            title: "Репетиция за день до премьеры",
            description: "Крики, ссоры, кто-то хлопнул дверью. Атмосфера накалялась заранее.",
            locked: true,
            unlocks: [],
            requiresStep: false,
        },

        // Развилка 2
        {
            title: "Развилка: улика или эмоции",
            description: "Ты будешь следовать логике улиц или внутреннему ощущению?",
            locked: true,
            unlocks: [14, 15],
            requiresStep: true,
        },

        // Финал — истинная разгадка
        {
            title: "Истинная развязка",
            description: "Это была попытка убрать актрису, но не ради роли... а чтобы скрыть прошлое.",
            locked: true,
            unlocks: [],
            requiresStep: true,
        },

        // Альтернативный финал (ложный)
        {
            title: "Ложная развязка",
            description: "Ты сделал выбор слишком рано. Возможно, кто-то просто хотел сорвать спектакль...",
            locked: true,
            unlocks: [],
            requiresStep: true,
        },
    ],
};