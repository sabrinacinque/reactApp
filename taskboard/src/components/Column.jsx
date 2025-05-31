import React from "react";
import TaskCard from "./TaskCard";

export default function Column({
  title,
  tasks,
  onAdd,
  onAction     // unica prop per tutte le azioni
}) {
  // Trova l'ultimo task incoming per mostrare la pillola NEW
  const newestIncomingTask = title === "incoming" && tasks.length > 0 
    ? tasks.reduce((newest, current) => 
        new Date(current.insertDate) > new Date(newest.insertDate) ? current : newest
      )
    : null;

  return (
    <div className="col bg-dark bg-opacity-50 rounded d-flex flex-column mt-2">
      <div className="column-header p-3">
        <h5 className="text-light text-capitalize text-center">{title}</h5>

        {/*
          mostriamo il + Add in tutte le colonne tranne "incoming" e "done"
        */}
        {title !== "incoming" && title !== "done"
         && (
          <button
            className="btn btn-outline-light w-100 mt-3 py-3"
            onClick={onAdd}
          >
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
                isNewest={newestIncomingTask && task.id === newestIncomingTask.id}
              />
            ))}
      </div>
    </div>
  );
}
