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
  const { tasks, fetchAll: refreshTasks, addTask, updateTask } = useTasks(id);
  const { connections } = useFriends();

  const [addingMember, setAddingMember] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const currentUserId = Number(localStorage.getItem("userId"));

  console.log("🏗️ ProjectDetailPage - Project ID:", id);
  console.log("📋 Tasks received in component:", tasks);
  console.log("🔢 Number of tasks:", tasks?.length || 0);

  useEffect(() => {
    console.log("🔄 Refreshing tasks for project:", id);
    refreshTasks();
  }, [refreshTasks]);

  if (!project) return <p>Loading…</p>;

  const isAdmin = project.members.some(
    (m) => m.user.id === currentUserId && m.role === "ADMIN"
  );

  const projectTasks = tasks;

  console.log("✅ Final project tasks to display:", projectTasks);

  const handleTaskSave = async (input) => {
    if (input.id) {
      // Modalità editing
      await updateTask(input.id, {
        description: input.description,
        recipientId: input.recipientId,
        projectId: Number(id)
      });
    } else {
      // Modalità creazione
      await addTask({ ...input, projectId: id });
    }
    refreshTasks();
    setAddingTask(false);
    setEditingTask(null);
  };

  return (
    <div className="page-layout d-flex vh-100">
      <Sidebar />

      <div className="flex-grow-1 p-4 background text-white pt-5">
        <h1>Title : {project.name}</h1>
        <p>
          Date creating project : {new Date(project.startDate).toLocaleString()}
          <br />
          Date ending project : {new Date(project.endDate).toLocaleString()}
        </p>
        
        <h3>Description : {project.description}</h3>

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

        <h4>Project Tasks ({projectTasks?.length || 0})</h4>
        {projectTasks?.length === 0 ? (
          <p className="text-muted">No tasks found for this project.</p>
        ) : (
          <ul className="list-group">
            {projectTasks.map((task) => (
              <li
                key={task.id}
                className="list-group-item d-flex align-items-center bg-dark bg-opacity-25 text-white"
              >
                <span className="flex-grow-1 fs-4">
                  {task.description} 
                  <small className="d-block text-white">
                    State: {task.state} | Assigned to: <span class="text-success">{task.recipientUsername || task.user?.username || 'Unassigned'}</span>
                  </small>
                </span>
                {isAdmin && (
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={() => setEditingTask(task)}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
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

      {isAdmin && (addingTask || editingTask) && (
        <AddProjectTaskModal
          show={addingTask || !!editingTask}
          onClose={() => {
            setAddingTask(false);
            setEditingTask(null);
          }}
          members={project.members}
          editingTask={editingTask}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
}
