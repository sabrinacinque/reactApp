// src/hooks/useProjects.js
import { useState, useEffect, useCallback } from "react";

const BASE = "http://localhost:8080/api/v1/projects";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const token  = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchAll = useCallback(async () => {
    const url = userId
      ? `${BASE}?userId=${encodeURIComponent(userId)}`
      : BASE;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Fetch projects failed");
    setProjects(await res.json());
  }, [token, userId]);

  // fire once on mount
  useEffect(() => { fetchAll(); }, [fetchAll]);

  // the fn you need
  const createProject = async ({ name, startDate, endDate }) => {
    const res = await fetch(`${BASE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, startDate, endDate })
    });
    if (!res.ok) throw new Error("Create project failed");
    const proj = await res.json();
    // stick it on top of your list
    setProjects(ps => [proj, ...ps]);
    return proj;
  };

  const deleteProject = async (id) => {
    const res = await fetch(`${BASE}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Delete project failed");
    setProjects(ps => ps.filter(p => p.id !== id));
  };

  // let people add members right after
  const addMember = async (projectId, { userId, role }) => {
    const res = await fetch(`${BASE}/${projectId}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, role })
    });
    if (!res.ok) throw new Error("Add member failed");
    return res.json();
  };

  // …and anything else you need…

  return {
    projects,
    fetchAll,
    createProject,
    deleteProject,
    addMember,
    // …and your other fns if you want
  };
}
