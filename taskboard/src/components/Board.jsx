import React, { useState } from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import Swal from "sweetalert2";


const STATES = ["urgent", "this week", "incoming", "done"];

export default function Board({
  tasks,
  addTask,
  deleteTask,
  updateTask,
  refreshTasks
}) {
  const [addState, setAddState] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const byState = state => tasks.filter(t => t.state === state);

  const handleAction = async (task, action) => {
    if (action === "delete") {
      const result = await Swal.fire({
        title: `Delete “${task.title}”?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
      });
      if (result.isConfirmed) {
        await deleteTask(task.id);
        await Swal.fire({ title: "Deleted!", icon: "success", timer: 1200, showConfirmButton: false });
      }
    } else if (action === "done" && task.state !== "done") {
      await updateTask(task.id, { state: "done" });
      await Swal.fire({ title: "Nice!", text: `"${task.title}" marked done.`, icon: "success", timer: 1200, showConfirmButton: false });
    } else if (action === "edit") {
      setEditTask(task);
      return;
    }
    refreshTasks();
  };

  return (
    <>

      <div className="row-cols-1 row-cols-sm-2 row-cols-lg-4 d-flex flex-column flex-sm-row gap-1">
        {STATES.map(state => (
          <Column
            key={state}
            title={state}
            tasks={byState(state)}
            onAdd={() => setAddState(state)}
            onAction={handleAction}
          />
        ))}
      </div>

      {addState && (
        <AddTaskModal
          show
          state={addState}
          onClose={() => setAddState(null)}
          onSave={async input => {
            await addTask(input);
            setAddState(null);
            refreshTasks();
          }}
        />
      )}

      {editTask && (
        <EditTaskModal
          show
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={async (id, input) => {
            await updateTask(id, input);
            setEditTask(null);
            refreshTasks();
          }}
        />
      )}
    </>
  );
}
