// src/components/TaskCard.jsx
import React from "react";
import { FiTrash2, FiEdit2, FiCheck } from "react-icons/fi";
import "./TaskCard.css";

const STATE_COLORS = {
  urgent:      "rgba(255,  0,   0,   0.2)",
  "this week": "rgba(255,255,  0,   0.2)",
  incoming:    "rgba(  0,255,255,   0.2)",
  done:        "rgba(  0,255,  0,   0.2)",
};

export default function TaskCard({ task, onAction }) {
  return (
    <div
      className="task-card p-3 mb-3 rounded"
      style={{
        backgroundColor: STATE_COLORS[task.state] || "rgba(255,255,255,0.1)"
      }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <h6 className="task-title mb-1 text-capitalize">{task.title}</h6>
        <div className="action-icons" style={{ cursor: "pointer" }}>
          {task.state !== "done" && (
            <FiCheck
              className="me-2 action-icon"
              title="Mark done"
              onClick={() => onAction(task, "done")}
            />
          )}
          <FiEdit2
            className="me-2 action-icon"
            title="Edit"
            onClick={() => onAction(task, "edit")}
          />
          <FiTrash2
            className="action-icon"
            title="Delete"
            onClick={() => onAction(task, "delete")}
          />
        </div>
      </div>

      {task.description && (
        <p className="task-desc small">{task.description}</p>
      )}

      {task.state === "incoming" && task.creator && (
        <div className="small text-white-50">
          From: <strong>{task.creator.username}</strong>
        </div>
      )}

      <div className="small text-white-50 mt-1">
        Created:{" "}
        {new Date(task.insertDate).toLocaleString([], {
          day:   "2-digit",
          month: "2-digit",
          year:  "numeric",
          hour:  "2-digit",
          minute:"2-digit",
        })}
      </div>
    </div>
  );
}
