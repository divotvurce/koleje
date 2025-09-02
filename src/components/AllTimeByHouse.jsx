import React, { useEffect, useState } from "react";
import { getAllStudents } from "../studentsService"; // stáhne všechny studenty

const housesData = [
  { name: "Gryffindor", logo: "🦁", bg: "bg-red-800", color: "text-red-500" },
  { name: "Slytherin", logo: "🐍", bg: "bg-green-800", color: "text-green-500" },
  { name: "Hufflepuff", logo: "🦡", bg: "bg-yellow-700", color: "text-yellow-400" },
  { name: "Ravenclaw", logo: "🐦‍⬛", bg: "bg-blue-800", color: "text-blue-500" },
];

export default function AllTimeByHouse() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchAllTime = async () => {
      const students = await getAllStudents();

      // vytvoříme pole: každá kolej má seřazené studenty
      const results = housesData.map((house) => {
        const studentsInHouse = students
          .filter((s) => s.house === house.name)
          .sort((a, b) => (b.points || 0) - (a.points || 0));

        return {
          ...house,
          students: studentsInHouse,
        };
      });

      setHouses(results);
    };

    fetchAllTime();
  }, []);

  return (
    <div className="space-y-4 mb-12">
         <h1 className="text-5xl font-black text-center mb-6 text-purple-800 drop-shadow-lg py-6">
          Leaderboard by House
        </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {houses.map((house) => (
        <div
          key={house.name}
          className={`${house.bg} rounded-3xl p-6 shadow-xl hover:scale-105 transform transition`}
        >
          <h3 className={`text-2xl font-bold mb-3 ${house.color}`}>
            {house.name} – List
          </h3>
          {house.students.length === 0 ? (
            <p className="text-white">Zatím žádní studenti</p>
          ) : (
            <ul className="list-decimal ml-5 space-y-1 text-white">
              {house.students.map((s, idx) => (
                <li key={s.id}>
                  {s.name}: {s.points} bodů
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
