// src/components/ActivitiesList.jsx
import React from "react";

const activities = [
  { name: "Finishing test", points: 5 },
  { name: "Week with all books", points: 5 },
  { name: "Winning King", points: 10 },
  { name: "Winning Last man Standing", points: 20 },
  { name: "VHW / DDÚ", points: 30 },
  { name: "Presentation", points: 50 },
  { name: "Book reading", points: 50 },
  { name: "Creating game/activity for english", points: 50 },
  { name: "Golden Snitch", points: 100 },
  { name: "Extra teacher's tasks", points: 0 },
];

export default function ActivitiesList() {
  return (
    <div className="bg-gray-900 p-6 rounded-3xl shadow-xl my-12">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-left">
        Activities
      </h2>
      <div className="divide-y divide-gray-700">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-xl py-3 px-2 hover:bg-gray-800 transition"
          >
            <span className="text-white">{activity.name}</span>
            <span className="font-bold text-yellow-300">{activity.points} points</span>
          </div>
        ))}
      </div>
    </div>
  );
}
