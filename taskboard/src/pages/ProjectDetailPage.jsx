// src/pages/ProjectDetailPage.jsx
import React, { useState } from "react";
import { useParams }        from "react-router-dom";
import { useProjects }       from "../hooks/useProjects";
import { useFriends }       from "../hooks/useFriends";
import AddMemberModal       from "../components/AddMemberModal";
import Sidebar              from "../MainComponent/Sidebar";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { project, refresh, addMember, removeMember } = useProjects(id);
  const { connections } = useFriends();
  const [adding, setAdding] = useState(false);

  if (!project) {
    return <p>Loading…</p>;
  }

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <h2>{project.name}</h2>
        <p>
          Starts: {new Date(project.startDate).toLocaleString()}<br />
          Ends: {new Date(project.endDate).toLocaleString()}
        </p>

        <h4>Members</h4>
        <button
          className="btn btn-sm btn-primary mb-3"
          onClick={() => setAdding(true)}
        >
          + Add Member
        </button>

        <ul className="list-group mb-4">
          {project.members.map(m => (
            <li
              key={m.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark bg-opacity-25 text-white"
            >
              <span>
                {m.user.username} ({m.user.email}) — <em>{m.role}</em>
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={async () => {
                  await removeMember(project.id, m.user.id);
                  refresh();
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {adding && (
        <AddMemberModal
          show={adding}
          onClose={() => setAdding(false)}
          projectId={project.id}
          onSave={async userId => {
            await addMember(project.id, { userId, role: "MEMBER" });
            refresh();
          }}
          connections={connections}
        />
      )}
    </div>
  );
}
