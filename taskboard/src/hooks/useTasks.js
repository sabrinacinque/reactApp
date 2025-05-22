// src/hooks/useTasks.js
import { useState, useEffect, useCallback } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchAll = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/v1/tasks");
    if (res.ok) setTasks(await res.json());
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addTask = async (input) => {
    const res = await fetch("http://localhost:8080/api/v1/tasks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      const t = await res.json();
      setTasks((ts) => [t, ...ts]);
    }
  };

  return { tasks, addTask };
}
