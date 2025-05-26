// src/pages/ProjectsPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar            from "../MainComponent/Sidebar";
import CreateProjectModal from "../components/CreateProjectModal";
import { useFriends }     from "../hooks/useFriends";
import { useProjects }    from "../hooks/useProjects";  // ← make sure this matches your file name

export default function ProjectsPage() {
  // default projects to an empty array if it's ever undefined
  const {
    projects = [],
    fetchAll,
    createProject,
    addMember,
    deleteProject
  } = useProjects();

  const { connections } = useFriends();
  const [creating, setCreating] = useState(false);

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <h2>My Projects</h2>

        <button
          className="btn btn-success mb-3"
          onClick={() => setCreating(true)}
        >
          + New Project
        </button>

        <ul className="list-group">
          {projects.map(p => (
            <li
              key={p.id}
              className="list-group-item bg-dark bg-opacity-25 text-white d-flex justify-content-between align-items-center"
            >
              <span>{p.name}</span>

              <div>
                <Link
                  to={`/projects/${p.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Details
                </Link>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={async () => {
                    await deleteProject(p.id);
                    fetchAll();
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {creating && (
        <CreateProjectModal
          show={creating}
          onClose={() => setCreating(false)}
          onSave={async payload => {
            const proj = await createProject(payload);
            fetchAll();
            return proj;
          }}
          addMember={addMember}
          connections={connections}
        />
      )}
    </div>
  );
}
