import React from "react";
import { FiTrash2, FiEdit2, FiCheck } from "react-icons/fi";
import "./TaskCard.css";

const STATE_COLORS = {
  urgent:      "rgba(255,  0,   0,   0.2)",
  "this week": "rgba(255,255,  0,   0.2)",
  incoming:    "rgba(  0,255,255,   0.2)",
  done:        "rgba(  0,255,  0,   0.2)",
};

export default function TaskCard({ task, onAction, isNewest = false }) {
  return (
    <div
      className="task-card p-3 my-3 rounded position-relative"
      style={{
        backgroundColor: STATE_COLORS[task.state] || "rgba(255,255,255,0.1)"
      }}
    >
      {/* Pillola NEW per l'ultimo task incoming */}
      {task.state === "incoming" && isNewest && (
        <span 
          className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: "0.7rem", zIndex: 10 }}
        >
          NEW
        </span>
      )}

      <div className="row d-flex flex-row mb-2">
        {task.state === "incoming" && (
          <div className="col-8 small text-danger fw-bold mb-2 fs-5">
            From: <strong>{task.creatorUsername}</strong>
          </div>
        )}
        {task.state !== "incoming" && (
          <div className="col-8 small text-white-50 mb-2 fs-5"></div>
        )}
        <div className="col-4 action-icons text-end" style={{ cursor: "pointer" }}>
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
      
      <div className="d-flex justify-content-between align-items-start">
        <h6 className="task-title mb-1 text-capitalize">{task.title}</h6>      
      </div>

      {task.description && (
        <p className="task-desc small">{task.description}</p>
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