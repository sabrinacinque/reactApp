import React from "react";
import TaskCard from "./TaskCard";


export default function Column({ title, tasks }) {
  return (
    <div className="col-3 flex-shrink-0 bg-dark bg-opacity-50 rounded mx-2 vh-100 ">
      <div className="d-flex flex-column justify-content-s align-items-center mt-5">
       
        <h5 className="text-light">{title}</h5>
        <button className="btn btn-outline-light w-100 my-3 py-4">+ Add</button>
      </div>

      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>

  
  );
}
