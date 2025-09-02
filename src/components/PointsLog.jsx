import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase"; // cesta k tvému firebase.js
import { getAllStudents } from "../studentsService";

export default function PointsLog() {
  const [logEntries, setLogEntries] = useState([]);

  useEffect(() => {
    const fetchLog = async () => {
      // Načteme všechny studenty, abychom mohli zobrazit jména
      const students = await getAllStudents();
      const studentsMap = {};
      students.forEach((s) => {
        studentsMap[s.id] = s.name;
      });

      // Načteme posledních 10 záznamů z pointsLogs
      const logsRef = collection(db, "pointsLogs");
      const q = query(logsRef, orderBy("date", "desc"), limit(10));
      const snapshot = await getDocs(q);

      const entries = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: studentsMap[data.studentId] || "Neznámý",
          reason: data.reason,
          points: data.points,
        };
      });

      setLogEntries(entries);
    };

    fetchLog();
  }, []);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">Last points</h3>
      <ul className="space-y-2">
        {logEntries.map((entry, idx) => (
<li
  key={idx}
  className="grid grid-cols-3 gap-2 border-b border-gray-700 pb-1"
>
  <span className="truncate">{entry.name}</span>
  <span className="truncate">{entry.reason}</span>
  <span className="font-bold text-right">{entry.points}</span>
</li>
        ))}
      </ul>
    </div>
  );
}

