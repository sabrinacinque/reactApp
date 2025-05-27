import { useState, useEffect, useCallback } from "react";

const BASE = "http://localhost:8080/api/v1/projects";

// LISTA PROGETTI
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

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const createProject = async ({ name, description, startDate, endDate }) => {
    const res = await fetch(`${BASE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, description, startDate, endDate })
    });
    if (!res.ok) throw new Error("Create project failed");
    const proj = await res.json();
    setProjects(ps => [proj, ...ps]);
    return proj;
  };

  const deleteProject = async id => {
    const res = await fetch(`${BASE}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Delete project failed");
    setProjects(ps => ps.filter(p => p.id !== id));
  };

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

  return {
    projects,
    fetchAll,
    createProject,
    deleteProject,
    addMember
  };
}

// SINGOLO PROGETTO
export function useProject(projectId) {
  const [project, setProject] = useState(null);
  const token = localStorage.getItem("token");

  const fetchOne = useCallback(async () => {
    if (!projectId) return;
    const res = await fetch(`${BASE}/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Fetch project failed");
    setProject(await res.json());
  }, [projectId, token]);

  useEffect(() => { fetchOne(); }, [fetchOne]);

  const addMember = async (userId, role = "MEMBER") => {
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

  const removeMember = async userId => {
    const res = await fetch(`${BASE}/${projectId}/members/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Remove member failed");
  };

  return {
    project,
    refresh: fetchOne,
    addMember,
    removeMember
  };
}