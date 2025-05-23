import React, { useState, useEffect } from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useTasks } from "../hooks/useTasks";
import Swal from 'sweetalert2';
import "./Board.css";

const STATES = ["urgent", "this week", "when I have time", "done"];

export default function Board() {
  const { byState, fetchAll, addTask, deleteTask, updateTask } = useTasks();
  const [addState, setAddState]   = useState(null);
  const [editTask, setEditTask]   = useState(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleAction = async (task, action) => {
  if (action === "delete") {
    const result = await Swal.fire({
      title: `Delete “${task.title}”?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      await deleteTask(task.id);
      await Swal.fire({
        title: "Deleted!",
        text: `"${task.title}" has been removed.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      fetchAll();
    }
  }
  else if (action === "done") {
    if (task.state !== "done") {
      await updateTask(task.id, { state: "done" });
      await Swal.fire({
        title: "Nice!",
        text: `"${task.title}" marked as done.`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
      fetchAll();
    }
  }
  else if (action === "edit") {
    setEditTask(task);
  }
    // ricarico la lista in ogni caso
    fetchAll();
  };

  return (
    <>
      <div className="board d-flex p-4 vh-100">
        {STATES.map((state) => (
          <Column
            key={state}
            title={state}
            tasks={byState(state)}
            onAdd={() => setAddState(state)}
            onAction={handleAction}
          />
        ))}
      </div>

      {/* Modal di creazione */}
      {addState && (
        <AddTaskModal
          show
          state={addState}
          onClose={() => setAddState(null)}
          onSave={async (input) => {
            await addTask(input);
            setAddState(null);
          }}
        />
      )}

      {/* Modal di modifica */}
      {editTask && (
        <EditTaskModal
          show
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={async (id, input) => {
            await updateTask(id, input);
            setEditTask(null);
            fetchAll();
          }}
        />
      )}
    </>
  );
}
