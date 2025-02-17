import clsx from "clsx";
import { differenceInDays, isAfter, isBefore, isFuture } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Todo } from "../types/types";

export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs))
}

export function getRowColor(dueDate: string | null | undefined): string {
    if (dueDate && isFuture(new Date(dueDate))) {
        const daysDifference = differenceInDays(new Date(dueDate), new Date());
        if (daysDifference <= 7) {
            return "bg-red-300";
        } else if (daysDifference <= 14) {
            return "bg-yellow-300";
        } else if (daysDifference > 14) {
            return "bg-green-300";
        }
    }
    return "";
}

type Priority = "high" | "medium" | "low" | "HIGH" | "MEDIUM" | "LOW";
const priorityOrder: Record<Priority, number> = {
    HIGH: 3,
    high: 3,
    MEDIUM: 2,
    medium: 2,
    LOW: 1,
    low: 2
}

export function orderByPriority(a: Todo, b: Todo) {
    return priorityOrder[b.priority] - priorityOrder[a.priority]
}

export function orderByDueDate(a: Todo, b: Todo) {
    if (a.dueDate === null && b.dueDate === null) return 0;
    if (a.dueDate === null && b.dueDate) return 1;
    if (b.dueDate === null && a.dueDate) return -1;

    if (isAfter(new Date(a.dueDate!), new Date(b.dueDate!))) {
        return 1;
    } else if (isBefore(new Date(a.dueDate!), new Date(b.dueDate!))) {
        return -1;
    }
    return 0;
}

export function getAverageTimeToFinish(todos: Todo[]): number {

    const completedTodos = todos.filter(t => t.doneDate !== null);
    if (todos.length === 0 || completedTodos.length === 0) return 0;

    const totalTime = completedTodos.reduce<number>((acc, todo) => {
        const createdTime = new Date(todo.createdAt).getTime();
        const doneTime = new Date(todo.doneDate!).getTime();
        return acc + (doneTime - createdTime);
    }, 0);
    const avgTimeMs = totalTime / completedTodos.length;
    return avgTimeMs;
}

export function fromMilisecondsToMinutes(miliseconds: number): string {
    const minutesAvgTime = Math.floor(miliseconds / (1000 * 60)).toString();
    const secondsAvgTime = Math.floor((miliseconds / 1000) % 60).toString();

    if (minutesAvgTime === "0" && secondsAvgTime === "0") return "No tasks completed yet"
    return `${minutesAvgTime.length < 2 ? "0".concat(minutesAvgTime) : minutesAvgTime}:${secondsAvgTime.length < 2 ? "0".concat(secondsAvgTime) : secondsAvgTime} mins`
}