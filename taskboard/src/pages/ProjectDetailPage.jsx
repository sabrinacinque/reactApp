// src/pages/ProjectDetailPage.jsx
import React, { useState } from "react";
import { useParams }       from "react-router-dom";
import { useProject }      from "../hooks/useProjects";
import { useTasks }        from "../hooks/useTasks";
import { useFriends }      from "../hooks/useFriends";
import AddMemberModal      from "../components/AddMemberModal";
import AddProjectTaskModal from "../components/AddProjectTaskModal";
import Sidebar             from "../MainComponent/Sidebar";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { project, refresh, addMember, removeMember } = useProject(id);
  const { addTask, fetchAll: refreshTasks } = useTasks();
  const { connections } = useFriends();

  const [addingMember, setAddingMember] = useState(false);
  const [addingTask,   setAddingTask]   = useState(false);

  // ID dell’utente loggato
  const currentUserId = Number(localStorage.getItem("userId"));

  if (!project) {
    return <p>Loading…</p>;
  }

  // Controllo se il loggato è ADMIN di questo progetto
  const isAdmin = project.members.some(
    m => m.user.id === currentUserId && m.role === "ADMIN"
  );

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <h2>{project.name}</h2>
        <p>
          Starts: {new Date(project.startDate).toLocaleString()}<br />
          Ends:   {new Date(project.endDate).toLocaleString()}
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
          {project.members.map(m => {
            const isSelf = m.user.id === currentUserId;
            return (
              <li
                key={m.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark bg-opacity-25 text-white"
              >
                <span>
                  {m.user.username} ({m.user.email}) —{" "}
                  {m.role === "ADMIN"
                    ? <em className="text-warning">Admin</em>
                    : <em className="text-secondary">Member</em>}
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
      </div>

      {isAdmin && addingMember && (
        <AddMemberModal
          show={addingMember}
          onClose={() => setAddingMember(false)}
          existingMembers={project.members.map(m => m.user.id)}
          onSave={async userId => {
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
          onSave={async input => {
            await addTask({ ...input, projectId: id });
            refreshTasks();
          }}
        />
      )}
    </div>
  );
}
