import { useState, useCallback } from "react";
import type { Task } from "../types/types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const saveTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }, []);

  const addTask = useCallback(
    (text: string) => {
      const newTask: Task = {
        id: Date.now(),
        text,
        completed: false,
      };
      saveTasks([...tasks, newTask]);
    },
    [tasks, saveTasks],
  );

  const toggleTask = useCallback(
    (id: number) => {
      saveTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    },
    [tasks, saveTasks],
  );

  const clearCompleted = useCallback(() => {
    saveTasks(tasks.filter((task) => !task.completed));
  }, [tasks, saveTasks]);

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return {
    tasks,
    remainingTasks,
    addTask,
    toggleTask,
    clearCompleted,
  };
};
