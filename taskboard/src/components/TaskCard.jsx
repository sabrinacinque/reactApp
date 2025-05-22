import React from "react";
import "./TaskCard.css";

export default function TaskCard({ task }) {
  return (
    <div className="task-card p-3 mb-3 rounded bg-secondary text-light">
      <h6 className="task-title mb-2">{task.title}</h6>
      <p className="task-desc small text-muted">{task.desc}</p>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="avatars d-flex">
          {task.assignees.map((u) => (
            <img
              key={u.id}
              src={u.avatar}
              alt={u.name}
              className="avatar rounded-circle me-1"
            />
          ))}
        </div>
        <div className="comments small text-muted">
          💬 {task.comments}
        </div>
      </div>
    </div>
  );
}
