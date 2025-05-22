// src/components/TaskCard.jsx
import React from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./TaskCard.css";

export default function TaskCard({ task, onDelete, onEdit }) {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${task.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then(result => {
      if (result.isConfirmed) {
        onDelete(task.id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  return (
    <div className="task-card p-3 mb-3 rounded bg-secondary text-light position-relative">
      <h6 className="task-title mb-1">{task.title}</h6>
      <p className="task-desc small text-muted">{task.description}</p>
      <div className="d-flex justify-content-between small text-light-50">
        <span>
          Created: {new Date(task.insertDate).toLocaleString()}
        </span>
        {task.previousEndDate && (
          <span>
            Due: {new Date(task.previousEndDate).toLocaleString()}
          </span>
        )}
      </div>
      <div className="task-actions position-absolute top-0 end-0 p-2 d-flex">
        <FiEdit2 
          className="me-2 clickable" 
          onClick={() => onEdit(task)} 
        />
        <FiTrash2 
          className="clickable" 
          onClick={handleDelete} 
        />
      </div>
    </div>
  );
}
