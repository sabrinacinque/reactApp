import React from "react";
import TaskCard from "./TaskCard";

export default function Column({
  title,
  tasks,
  onAdd,
  onAction     // <-- unica prop per tutte le azioni
}) {
  return (
    <div className="col flex-shrink-0 bg-dark bg-opacity-50 rounded mx-2 vh-100 d-flex flex-column">
      <div className="column-header p-3">
        <h5 className="text-light text-capitalize text-center">{title}</h5>
        {title  && (
          <button className="btn btn-outline-light w-100 my-3 py-3" onClick={onAdd}>
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
                onAction={onAction}  
              />
            ))}
      </div>
    </div>
  );
}
