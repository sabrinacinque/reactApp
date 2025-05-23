import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// palette: [open, closed]
const COLORS = ["#FF6B6B", "#4ECDC4"];

export default function StatsPanel({ tasks }) {
  const openCount   = tasks.filter(t => t.state !== "done").length;
  const closedCount = tasks.filter(t => t.state === "done").length;

  const completed = tasks.filter(t => t.state === "done" && t.previousEndDate);
  const avgH = completed.length > 0
    ? completed
        .map(t => {
          const start = new Date(t.insertDate).getTime();
          const end   = new Date(t.previousEndDate).getTime();
          return (end - start) / 36e5;
        })
        .reduce((a,b) => a + b, 0) / completed.length
    : 0;

  const data = [
    { name: "Open",  value: openCount,  fill: COLORS[0] },
    { name: "Closed",value: closedCount,fill: COLORS[1] },
  ];

  return (
    <div className="stats-panel p-3 mt-4 text-white bg-dark rounded">
      <ul className="list-unstyled mb-4">
        <li>🟢 Open: <strong>{openCount}</strong></li>
        <li>✅ Closed: <strong>{closedCount}</strong></li>
        <li>⏱️ Avg. completion: <strong>{avgH.toFixed(1)}h</strong></li>
      </ul>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              paddingAngle={4}
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
