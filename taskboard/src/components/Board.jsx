// src/components/Board.jsx
import React, { useState, useEffect } from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useTasks } from "../hooks/useTasks";
import "./Board.css";

const STATES = ["urgent", "this week", "when I have time", "done"];

export default function Board() {
  const {
    byState,
    fetchAll,
    addTask,
    deleteTask,
    updateTask
  } = useTasks();
  const [addState, setAddState] = useState(null);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <div className="board d-flex p-4 h-100">
        {STATES.map((state) => (
          <Column
            key={state}
            title={state}
            tasks={byState(state)}
            onAdd={() => setAddState(state)}
            onDelete={deleteTask}
            onEdit={(task) => setEditTask(task)}
          />
        ))}
      </div>

      <AddTaskModal
        show={addState !== null}
        state={addState}
        onClose={() => setAddState(null)}
        onSave={async (input) => {
          await addTask(input);
          setAddState(null);
        }}
      />

      {editTask && (
        <EditTaskModal
          show={!!editTask}
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={async (id, input) => {
            await updateTask(id, input);
            setEditTask(null);
          }}
        />
      )}
    </>
  );
}
