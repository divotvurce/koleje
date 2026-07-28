import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAllStudents } from "../studentsService";

export default function ActivityCalendar() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [activityMap, setActivityMap] = useState({});

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      loadActivityData(selectedStudent);
    }
  }, [selectedStudent]);

  const loadStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);

    if (data.length > 0) {
      setSelectedStudent(data[0].id);
    }
  };

  const loadActivityData = async (studentId) => {
    const q = query(
      collection(db, "pointsLogs"),
      where("studentId", "==", studentId)
    );

    const snapshot = await getDocs(q);

    const map = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();

      if (!data.date) return;

      const date = data.date
        .toDate()
        .toISOString()
        .split("T")[0];

      map[date] = (map[date] || 0) + (data.points || 0);
    });

    setActivityMap(map);
  };

  const getDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-gray-900 p-6 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-green-400 mb-4">
        📅 Activity Calendar
      </h2>

      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        className="w-full p-3 rounded-lg text-black mb-6"
      >
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      <Calendar
        className="fitness-calendar"
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";

          const key = getDateKey(date);
          const points = activityMap[key] || 0;

          if (points >= 2) return "day-two";
          if (points >= 1) return "day-one";

          return "day-zero";
        }}
      />

      <div className="flex gap-4 mt-6 text-sm justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded"></div>
          <span>0 bodů</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span>1 bod</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-700 rounded"></div>
          <span>2 body</span>
        </div>
      </div>
    </div>
  );
}