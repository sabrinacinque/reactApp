// src/hooks/useTasks.js
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://localhost:8080/api/v1/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  // prendo userId da localStorage
  const userId = localStorage.getItem("userId");

  const fetchAll = useCallback(async () => {
    try {
      // se ho userId, aggiungo il query param, altrimenti chiamo senza
      const url = userId
        ? `${BASE_URL}?userId=${encodeURIComponent(userId)}`
        : BASE_URL;

      const res = await fetch(url, {
        headers: {
          // se in futuro vuoi autenticare via token:
          // Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addTask = async (input) => {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Add task failed");
    const newTask = await res.json();
    // lo inserisco in testa solo se appartiene a questo user
    if (String(newTask.user.id) === String(userId)) {
      setTasks((ts) => [newTask, ...ts]);
    }
    return newTask;
  };

  const updateTask = async (id, input) => {
    const res = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Update failed");
    const updated = await res.json();
    setTasks((ts) =>
      ts.map((t) => (t.id === updated.id ? updated : t))
    );
    return updated;
  };

  const deleteTask = async (id) => {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");
    setTasks((ts) => ts.filter((t) => t.id !== id));
  };

  const byState = (state) => tasks.filter((t) => t.state === state);

  return { tasks, fetchAll, addTask, updateTask, deleteTask, byState };
}
