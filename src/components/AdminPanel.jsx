// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { addStudent, addPoints, getAllStudents, resetWeeklyPoints } from "../studentsService";

export default function AdminPanel() {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [newHouse, setNewHouse] = useState("Griffindor");

  const [selectedStudent, setSelectedStudent] = useState("");
  const [pointsToAdd, setPointsToAdd] = useState("");
  const [reason, setReason] = useState("");

  // Načtení všech studentů z Firestore
  const fetchStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Přidání nového studenta
  const handleAddStudent = async () => {
    if (!newName || !newGrade) return alert("Vyplň jméno a třídu");
    await addStudent(newName, newGrade, newHouse);
    setNewName("");
    setNewGrade("");
    setNewHouse("Griffindor");
    fetchStudents();
  };

  // Přidání bodů studentovi
  const handleAddPoints = async () => {
    if (!selectedStudent || !pointsToAdd) return alert("Vyber studenta a počet bodů");
    await addPoints(selectedStudent, parseInt(pointsToAdd), reason);
    setPointsToAdd("");
    setReason("");
    fetchStudents();
  };

  const handleResetWeekly = async () => {
    if (!window.confirm("Opravdu chceš vynulovat týdenní body všech studentů?")) return;
    await resetWeeklyPoints();
    fetchStudents();
    alert("Týdenní body byly vynulovány.");
  };

  return (
    <div className="space-y-8">
      {/* Přidání studenta */}
      <div className="bg-gray-900 p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Přidat studenta</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="p-2 rounded-lg flex-1 text-black"
            placeholder="Jméno"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="p-2 rounded-lg flex-1 text-black"
            placeholder="Třída"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
          />
          <select
            className="p-2 rounded-lg flex-1 text-black"
            value={newHouse}
            onChange={(e) => setNewHouse(e.target.value)}
          >
            <option>Gryffindor</option>
            <option>Slytherin</option>
            <option>Hufflepuff</option>
            <option>Ravenclaw</option>
          </select>
          <button
            className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-lg"
            onClick={handleAddStudent}
          >
            Přidat
          </button>
        </div>
      </div>

      {/* Přidání bodů */}
      <div className="bg-gray-900 p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Přidat body</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            className="p-2 rounded-lg flex-1 text-black"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Vyber studenta</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.house}) - {s.points} bodů
              </option>
            ))}
          </select>
          <input
            className="p-2 rounded-lg flex-1 text-black"
            placeholder="Počet bodů"
            type="number"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(e.target.value)}
          />
          <input
            className="p-2 rounded-lg flex-1 text-black"
            placeholder="Důvod"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button
            className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-lg"
            onClick={handleAddPoints}
          >
            Přidat body
          </button>
        </div>
      </div>

    {/* Seznam studentů */}
<div className="bg-gray-900 p-6 rounded-3xl shadow-xl">
  <h2 className="text-2xl font-bold mb-4 text-yellow-400">Seznam studentů</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="py-2 px-4">Jméno</th>
          <th className="py-2 px-4">Třída</th>
          <th className="py-2 px-4">Kolej</th>
          <th className="py-2 px-4 text-right">Body</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-800">
            <td className="py-2 px-4">{s.name}</td>
            <td className="py-2 px-4">{s.grade}</td>
            <td className="py-2 px-4">{s.house}</td>
            <td className="py-2 px-4 text-right">{s.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

       {/* Reset weekly points */}
      <div className="bg-gray-900 p-6 rounded-3xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Správa týdenních bodů</h2>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold"
          onClick={handleResetWeekly}
        >
          Vynulovat týdenní body
        </button>
      </div>
    </div>
  );
}
