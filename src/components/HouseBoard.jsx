import React, { useEffect, useState } from "react";
import { getAllStudents } from "../studentsService"; // cesta k tvému studentsService

const housesData = [
  { name: "Gryffindor", logo: "🦁", bg: "bg-red-800", color: "text-red-500" },
  { name: "Slytherin", logo: "🐍", bg: "bg-green-800", color: "text-green-500" },
  { name: "Hufflepuff", logo: "🦡", bg: "bg-yellow-700", color: "text-yellow-400" },
  { name: "Ravenclaw", logo: "🐦‍⬛", bg: "bg-blue-800", color: "text-blue-500" },
];

export default function HouseBoard() {
  const [houses, setHouses] = useState(housesData.map(h => ({ ...h, points: 0 })));

  useEffect(() => {
    const fetchHousePoints = async () => {
      const students = await getAllStudents();
      const housePoints = {};
      housesData.forEach(h => housePoints[h.name] = 0);

      students.forEach(student => {
        if (housePoints[student.house] !== undefined) {
          housePoints[student.house] += student.points || 0;
        }
      });

      setHouses(housesData.map(h => ({ ...h, points: housePoints[h.name] })));
    };

    fetchHousePoints();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {houses.map((house) => (
        <div
          key={house.name}
          className={`${house.bg} rounded-3xl shadow-xl flex flex-col items-center p-6 hover:scale-105 transform transition`}
        >
          <div className={`text-6xl mb-2 ${house.color}`}>{house.logo}</div>
          <h2 className={`text-2xl font-bold mb-1 ${house.color}`}>
            {house.name}
          </h2>
          <p className="text-xl text-white">{house.points} points</p>
        </div>
      ))}
    </div>
  );
}
