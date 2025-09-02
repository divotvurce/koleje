import React, { useEffect, useState } from "react";
import { getWeeklyTopByHouse } from "../studentsService";

const housesData = [
  { name: "Gryffindor", logo: "🦁", bg: "bg-red-800", color: "text-red-500" },
  { name: "Slytherin", logo: "🐍", bg: "bg-green-800", color: "text-green-500" },
  { name: "Hufflepuff", logo: "🦡", bg: "bg-yellow-700", color: "text-yellow-400" },
  { name: "Ravenclaw", logo: "🐦‍⬛", bg: "bg-blue-800", color: "text-blue-500" },
];

export default function WeeklyTop() {
  const [weeklyTop, setWeeklyTop] = useState([]);

  useEffect(() => {
    const fetchWeeklyTop = async () => {
      const results = [];
      for (const house of housesData) {
        try {
          const topStudents = await getWeeklyTopByHouse(house.name);
          results.push({
            house: house.name,
            bg: house.bg,
            color: house.color,
            top: topStudents.map(s => ({ name: s.name, points: s.weeklyPoints }))
          });
        } catch (err) {
          console.error(`Chyba při načítání weekly top pro ${house.name}:`, err);
          results.push({ house: house.name, bg: house.bg, color: house.color, top: [] });
        }
      }
      setWeeklyTop(results);
    };

    fetchWeeklyTop();
  }, []);

  return (
    
      <div className="space-y-4 mb-12">
         <h1 className="text-5xl font-black text-center mb-6 text-purple-800 drop-shadow-lg py-6">
          Weekly Top 5
        </h1>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {weeklyTop.map((house) => (
        <div
          key={house.house}
          className={`${house.bg} rounded-3xl p-6 shadow-xl hover:scale-105 transform transition`}
        >
          <h3 className={`text-2xl font-bold mb-3 ${house.color}`}>
            {house.house}
          </h3>
          {house.top.length === 0 ? (
            <p className="text-white">Žádné body tento týden</p>
          ) : (
            <ul className="list-decimal ml-5 space-y-1 text-white">
              {house.top.map((s, idx) => (
                <li key={idx}>
                  {s.name}: {s.points} points
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}
