// src/components/Column.jsx
import React from "react";
import TaskCard from "./TaskCard";

export default function Column({
  title,
  tasks,
  onAdd,
  onDelete,
  onEdit
}) {
  return (
    <div className="col-3 flex-shrink-0 bg-dark bg-opacity-50 rounded mx-2 vh-100 d-flex flex-column">
      <div className="p-3">
        <h5 className="text-light text-capitalize">{title}</h5>
        {title !== "done" && (
          <button className="btn btn-outline-light w-100 mb-3" onClick={onAdd}>
            + Add
          </button>
        )}
      </div>
      <div className="overflow-auto flex-grow-1 px-2">
        {tasks.length === 0
          ? null
          : tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
      </div>
    </div>
  );
}
