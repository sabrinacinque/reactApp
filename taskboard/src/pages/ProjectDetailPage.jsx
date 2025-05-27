// src/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { useFriends } from "../hooks/useFriends";
import AddMemberModal from "../components/AddMemberModal";
import AddProjectTaskModal from "../components/AddProjectTaskModal";
import Sidebar from "../MainComponent/Sidebar";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { project, refresh, addMember, removeMember } = useProject(id);
  const { tasks, fetchAll: refreshTasks, addTask, updateTask } = useTasks();
  const { connections } = useFriends();

  const [addingMember, setAddingMember] = useState(false);
  const [addingTask, setAddingTask] = useState(false);

  const currentUserId = Number(localStorage.getItem("userId"));

  // Ricarica i task ogni volta che cambio progetto o lo aggiungo
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  if (!project) return <p>Loading…</p>;

  const isAdmin = project.members.some(
    (m) => m.user.id === currentUserId && m.role === "ADMIN"
  );

  // Solo i task di questo progetto con stato "taskproject"
  const projectTasks = tasks.filter(
    (t) => t.project?.id === project.id && t.state === "taskproject"
  );

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <h2>{project.name}</h2>
        <p>
          Starts: {new Date(project.startDate).toLocaleString()}
          <br />
          Ends: {new Date(project.endDate).toLocaleString()}
        </p>

        <h4>Members</h4>
        {isAdmin && (
          <button
            className="btn btn-sm btn-primary mb-3 me-2"
            onClick={() => setAddingMember(true)}
          >
            + Add Member
          </button>
        )}
        {isAdmin && (
          <button
            className="btn btn-sm btn-success mb-3"
            onClick={() => setAddingTask(true)}
          >
            + Add Task
          </button>
        )}
        <ul className="list-group mb-4">
          {project.members.map((m) => {
            const isSelf = m.user.id === currentUserId;
            return (
              <li
                key={m.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark bg-opacity-25 text-white"
              >
                <span>
                  {m.user.username} ({m.user.email}) —{" "}
                  {m.role === "ADMIN" ? (
                    <em className="text-warning">Admin</em>
                  ) : (
                    <em className="text-secondary">Member</em>
                  )}
                </span>
                {isAdmin && !isSelf && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={async () => {
                      await removeMember(m.user.id);
                      refresh();
                    }}
                  >
                    Remove
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <h4>Project Tasks</h4>
        <ul className="list-group">
          {projectTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex align-items-center bg-dark bg-opacity-25 text-white"
            >
              <span className="flex-grow-1">{task.description}</span>
              {isAdmin ? (
                <select
                  className="form-select form-select-sm w-auto"
                  value={task.user.id}
                  onChange={async (e) => {
                    await updateTask(task.id, {
                      recipientId: Number(e.target.value),
                    });
                    refreshTasks();
                  }}
                >
                  {project.members.map((m) => (
                    <option key={m.user.id} value={m.user.id}>
                      {m.user.username}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="badge bg-secondary">{task.user.username}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isAdmin && addingMember && (
        <AddMemberModal
          show={addingMember}
          onClose={() => setAddingMember(false)}
          existingMembers={project.members.map((m) => m.user.id)}
          onSave={async (userId) => {
            await addMember(userId, "MEMBER");
            refresh();
          }}
          connections={connections}
        />
      )}

      {isAdmin && addingTask && (
        <AddProjectTaskModal
          show={addingTask}
          onClose={() => setAddingTask(false)}
          members={project.members}
          onSave={async (input) => {
            // qui aggiungo projectId e lascio che useTasks imposti anche lo state "taskproject"
            await addTask({ ...input, projectId: id });
            refreshTasks();
            setAddingTask(false);
          }}
        />
      )}
    </div>
  );
}
