import React from "react";
import Column from "./Column";
import "./Board.css";

// dati di esempio; in futuro li caricherai da API
const sampleColumns = [
  {
    id: 1, title: "Today tasks", tasks: [
      {
        id: 11,
        title: "User Testimonial Slider",
        desc: "We have a few testimonials...",
        assignees: [
          { id: 1, name: "Alice", avatar: "/avatars/alice.jpg" },
          { id: 2, name: "Bob",   avatar: "/avatars/bob.jpg" }
        ],
        comments: 2
      },
      // ... altre card ...
    ]
  },
  {
    id: 2, title: "Incoming", tasks: [
      {
        id: 21,
        title: "3 Customer Stories LP Thumbnails",
        desc: "Hey! We're linking 3 existing...",
        assignees: [ { id: 3, name: "Eve", avatar: "/avatars/eve.jpg" } ],
        comments: 5
      },
      // ...
    ]
  },
  {
    id: 3, title: "This week", tasks: [ /* ... */ ]
  },
  {
    id: 4, title: "Done", tasks: [ /* ... */ ]
  }
];

export default function Board() {
  return (
    <div className="board d-flex p-4 h-100">
      {sampleColumns.map((col) => (
        <Column key={col.id} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  );
}
