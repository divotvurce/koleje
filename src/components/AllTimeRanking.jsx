import React, { useEffect, useState } from "react";
import { getAllTimeRanking } from "../studentsService";

export default function AllTimeRanking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const students = await getAllTimeRanking();
    };
    fetchRanking();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-3xl shadow-xl mb-12">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        All-time leaderboard
      </h2>
      {ranking.length === 0 ? (
        <p className="text-white">Zatím žádní studenti</p>
      ) : (
        <ul className="space-y-2 text-white">
          {ranking.map((s, idx) => (
            <li key={s.id} className="flex justify-between border-b border-gray-700 pb-1">
              <span>
                {idx + 1}. {s.name} ({s.house})
              </span>
              <span>{s.points} points</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
