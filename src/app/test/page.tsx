"use client";

import { useState } from "react";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

    const handleAddTask = () => {
        if (newTask.trim()) {
            const task: Task = {
                id: Date.now(),
                text: newTask.trim(),
                completed: false,
            };
            setTasks((prev) => [...prev, task]);
            setNewTask("");
        }
    };

    const toggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "active") return !task.completed;
        return true;
    });

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Список задач</h2>

            <div className="flex gap-2 mb-4">
                <input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Новая задача..."
                    className="border px-2 py-1 w-full"
                />
                <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-1 rounded">
                    Добавить
                </button>
            </div>

            <div className="mb-4">
                <label className="mr-2">Фильтр:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="border px-2 py-1"
                >
                    <option value="all">Все</option>
                    <option value="active">Активные</option>
                    <option value="completed">Выполненные</option>
                </select>
            </div>

            <ul className="space-y-2">
                {filteredTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span className={task.completed ? "line-through text-gray-500" : ""}>
        {task.text}
        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
