import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../MainComponent/Sidebar";
import CreateProjectModal from "../components/CreateProjectModal";
import { useFriends } from "../hooks/useFriends";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const {
    adminProjects = [],
    memberProjects = [],
    loading,
    fetchAll,
    createProject,
    addMember,
    deleteProject,
  } = useProjects();

  const { connections } = useFriends();
  const [creating, setCreating] = useState(false);

  const ProjectList = ({ projects, showDeleteButton = false, title }) => {
    if (loading) {
      return (
        <div className="text-center my-4">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="mt-2 text-muted">Loading {title}...</div>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="text-center my-4 p-4 bg-dark bg-opacity-25 rounded">
          <p className="text-white mb-0">
            {showDeleteButton 
              ? "You haven't created any projects yet" 
              : "You are not tagged in any projects yet"
            }
          </p>
        </div>
      );
    }

    return (
      <ul className="list-group mb-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="list-group-item bg-dark bg-opacity-25 text-white d-flex justify-content-between align-items-center"
          >
            <div>
              <span className="fw-bold">{p.name}</span>
            </div>

            <div>
              <Link
                to={`/projects/${p.id}`}
                className="btn btn-sm btn-warning me-2"
              >
                Details
              </Link>

              {showDeleteButton && (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={async () => {
                    await deleteProject(p.id);
                    fetchAll();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <div className="row mb-4">
          <h2 className="col-12 col-md-10 text-center my-5">YOUR PROJECTS</h2>
          <div className="col-12 col-md-2 text-center">
            <button
              className="btn btn-success"
              onClick={() => setCreating(true)}
            >
              + New Project
            </button>
          </div>
        </div>

        {/* Progetti dove sono Admin */}
        <div className="mb-5">
          <h4 className="mb-3 text-success">Projects you created</h4>
          <ProjectList 
            projects={adminProjects} 
            showDeleteButton={true} 
            title="Projects you created"
          />
        </div>

        {/* Progetti dove sono Member */}
        <div className="mb-5">
          <h4 className="mb-3 text-warning">Projects you are tagged in:</h4>
          <ProjectList 
            projects={memberProjects} 
            showDeleteButton={false} 
            title="Projects you are tagged in"
          />
        </div>
      </div>

      {creating && (
        <CreateProjectModal
          show={creating}
          onClose={() => setCreating(false)}
          onSave={async (payload) => {
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