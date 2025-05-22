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

  const addTask = async input => {
    const res = await fetch("http://localhost:8080/api/v1/tasks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      const t = await res.json();
      setTasks(ts => [t, ...ts]);
      return t;
    }
    throw new Error("Add failed");
  };

  const deleteTask = async id => {
    const res = await fetch(`http://localhost:8080/api/v1/tasks/delete/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTasks(ts => ts.filter(t => t.id !== id));
    }
  };

  const updateTask = async (id, input) => {
    const res = await fetch(`http://localhost:8080/api/v1/tasks/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks(ts => ts.map(t => t.id === updated.id ? updated : t));
      return updated;
    }
    throw new Error("Update failed");
  };

  const byState = state => tasks.filter(t => t.state === state);

  return { tasks, fetchAll, addTask, deleteTask, updateTask, byState };
}
