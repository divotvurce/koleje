// src/components/DailyActivities.jsx

import React, { useState, useEffect } from "react";
import { getAllStudents, addPoints } from "../studentsService";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

const motivationalQuotes = [
  "💪 Go girl!",
  "⚡ Good job, He Who Must Not Be Shamed.",
  "Beast mode activated",
  "Gains before Hoes.",
  "The Chamber of Gains approves.",
  "You absolute Unit! Good job."
];

const activities = [
  {
    id: "gym",
    name: "🏋️ Cvičení / gym",
    points: 1,
  },
  {
    id: "run",
    name: "🏃 Běh (min. 4 km)",
    points: 1,
  },
];

export default function DailyActivities() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
  new Date().toISOString().split("T")[0]
);

useEffect(() => {
  loadStudents();
  loadAchievements();
  calculateInBodyPeriod();
}, []);

  const loadStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);
  };

  const calculateInBodyPeriod = () => {
  const now = new Date();

  const startMonth =
    now.getMonth() + 1;

  const nextMonth =
    startMonth === 12
      ? 1
      : startMonth + 1;

  setInBodyPeriod(
    `1.${startMonth}. - 1.${nextMonth}.`
  );
};

const [achievementHolders, setAchievementHolders] =
  useState({
    deathlifts: "-",
    lifted: "-",
    consistency: "-"
  });

const [inBodyPeriod, setInBodyPeriod] =
  useState("");

const loadAchievements = async () => {
  const students = await getAllStudents();

  const studentMap = {};

  students.forEach((s) => {
    studentMap[s.id] = s.name;
  });

  const snapshot = await getDocs(
    collection(db, "pointsLogs")
  );

  const logs = snapshot.docs.map((d) =>
    d.data()
  );

  const findHolder = (achievement) => {
    const matches = logs.filter(
      (log) =>
        log.reason &&
        log.reason.includes(
          achievement
        )
    );

    if (!matches.length) return "-";

    matches.sort(
      (a, b) =>
        b.date.toDate() -
        a.date.toDate()
    );

    return (
      studentMap[
        matches[0].studentId
      ] || "-"
    );
  };

  setAchievementHolders({
    deathlifts: findHolder(
      "Master of Deathlifts"
    ),
    lifted: findHolder(
      "The Boy Who Lifted"
    ),
    consistency: findHolder(
      "Patronus of Consistency"
    )
  });
};

  const toggleActivity = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((a) => a !== activityId)
        : [...prev, activityId]
    );
  };

const handleSubmit = async () => {
  try {
    console.log("BUTTON CLICKED");

    if (!selectedStudent) {
      alert("Vyber hráče");
      return;
    }

    const totalPoints = selectedActivities.reduce((sum, activityId) => {
      const activity = activities.find((a) => a.id === activityId);
      return sum + activity.points;
    }, 0);

    if (totalPoints === 0) {
      alert("Vyber alespoň jednu aktivitu");
      return;
    }

    console.log({
      selectedStudent,
      selectedActivities,
      selectedDate,
      totalPoints
    });

    await addPoints(
      selectedStudent,
      totalPoints,
      `Denní aktivita: ${selectedActivities.join(", ")}`,
      selectedDate,
      selectedActivities
    );

    const randomQuote =
      motivationalQuotes[
        Math.floor(Math.random() * motivationalQuotes.length)
      ];

    alert(`Připsáno ${totalPoints} bodů!\n\n${randomQuote}`);

    setSelectedActivities([]);
  } catch (err) {
    console.error(err);
    alert(`ERROR: ${err.message}`);
  }
};

  return (
    <div className="grid md:grid-cols-2 gap-6 my-10">
      
      {/* Denní aktivity */}
      <div className="bg-gray-900 p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          🏋️ Denní aktivity
        </h2>

        <p className="text-gray-300 mb-4">
          Vyber dnešní aktivity a získej body pro sebe i svou kolej.
        </p>

        <select
          className="w-full p-3 rounded-lg text-black mb-4"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Vyber hráče</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

<div className="overflow-hidden">
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="block w-full min-w-0 box-border p-3 rounded-lg text-black"
  />
</div>

        <div className="space-y-3 mb-5">
          {activities.map((activity) => (
            <label
              key={activity.id}
              className="flex items-center justify-between bg-gray-800 rounded-xl p-3 cursor-pointer"
            >
              <div>
                <div className="font-semibold">{activity.name}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-yellow-400">
                  +{activity.points}
                </span>

                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.id)}
                  onChange={() => toggleActivity(activity.id)}
                />
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold"
        >
          Přidat dnešní body
        </button>
      </div>

  {/* InBody + Achievements */}

<div className="bg-gray-900 p-6 rounded-3xl shadow-xl">

  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
    📊 Monthly Challenges
  </h2>

  <div className="bg-gray-800 rounded-xl p-4 mb-6">
    <div className="text-sm text-gray-400">
      Aktuální InBody období
    </div>

    <div className="text-xl font-bold text-yellow-300">
      {inBodyPeriod}
    </div>
  </div>

  <div className="bg-gray-800 rounded-xl p-4 mb-6">
    <h3 className="font-bold text-lg mb-3">
      🏆 Aktuální držitelé
    </h3>

    <div className="space-y-2">

      <div className="flex justify-between">
        <span>
          💀 Master of Deathlifts
        </span>

        <span className="font-bold text-yellow-300">
          {achievementHolders.deathlifts}
        </span>
      </div>

      <div className="flex justify-between">
        <span>
          🏋️ The Boy Who Lifted
        </span>

        <span className="font-bold text-yellow-300">
          {achievementHolders.lifted}
        </span>
      </div>

      <div className="flex justify-between">
        <span>
          🔥 Patronus of Consistency
        </span>

        <span className="font-bold text-yellow-300">
          {achievementHolders.consistency}
        </span>
      </div>

    </div>
  </div>

  <p className="text-gray-300 mb-6">
    Po každém měření nahraj své výsledky do sdílené tabulky.
  </p>

  <a
    href="https://docs.google.com/spreadsheets/d/15tSMgJ0cN9pYnLnXYE_V668NtRHwtZWoR_NmsFQenEk/edit?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-center py-4 rounded-xl"
  >
    Otevřít InBody tabulku
  </a>

</div>

    </div>
  );
}