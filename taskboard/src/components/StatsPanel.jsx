// src/components/StatsPanel.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { useTasks } from "../hooks/useTasks";


// Color palette: [openTasks, closedTasks]
const COLORS = ["#FF6B6B", "#4ECDC4"];

function StatsPanel() {
  const { tasks } = useTasks();

  // Count open vs. closed tasks
  const openTasksCount   = tasks.filter(t => t.state !== "done").length;
  const closedTasksCount = tasks.filter(t => t.state === "done").length;

  // Compute average completion time (in hours)
  const completedWithDates = tasks.filter(
    t => t.state === "done" && t.insertDate && t.previousEndDate
  );
  const avgHours = completedWithDates.length > 0
    ? completedWithDates
        .map(t => {
          const start = new Date(t.insertDate).getTime();
          const end   = new Date(t.previousEndDate).getTime();
          return (end - start) / 36e5; // ms → hours
        })
        .reduce((sum, h) => sum + h, 0) / completedWithDates.length
    : 0;

  // Prepare data for pie
  const pieData = [
    { name: "Open",   value: openTasksCount },
    { name: "Closed", value: closedTasksCount }
  ];

  return (
    <div className="stats-panel p-3 mt-4 text-white bg-dark rounded">
      <h6 className="mb-3">Quick Stats</h6>

      <ul className="list-unstyled mb-3">
        <li>🟢 Open: <strong>{openTasksCount}</strong></li>
        <li>✅ Closed: <strong>{closedTasksCount}</strong></li>
        <li>⏱️ Avg. completion: <strong>{avgHours.toFixed(1)}h</strong></li>
      </ul>

      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={4}
              label
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatsPanel;
