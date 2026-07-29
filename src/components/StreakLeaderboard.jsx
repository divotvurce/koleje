import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";
import { getAllStudents } from "../studentsService";
import { getPlayerBadges } from "../utils/badges";

export default function StreakLeaderboard() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const students = await getAllStudents();

    const logsSnapshot = await getDocs(
      collection(db, "pointsLogs")
    );

    const streakData = [];

    for (const student of students) {
      const playerLogs = logsSnapshot.docs
        .map((doc) => doc.data())
        .filter(
          (log) => log.studentId === student.id
        );

const result = calculateStats(playerLogs);

const badges = getPlayerBadges(result);

streakData.push({
  ...student,
  ...result,
  badges
});

    }
    

    streakData.sort(
      (a, b) => b.currentStreak - a.currentStreak
    );

    setPlayers(streakData);

    if (streakData.length > 0) {
      setSelectedPlayer(streakData[0]);
      setStats(streakData[0]);
    }
  };

const calculateStats = (logs) => {
  const uniqueDays = [
    ...new Set(
      logs
        .filter((log) => log.date)
        .map((log) => {
          const date =
            log.date?.toDate?.() ||
            new Date(log.date);

          const year = date.getFullYear();
          const month = String(
            date.getMonth() + 1
          ).padStart(2, "0");
          const day = String(
            date.getDate()
          ).padStart(2, "0");

          return `${year}-${month}-${day}`;
        })
    )
  ].sort();

  if (uniqueDays.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      activeDays: 0,
      totalDays: 0,
      consistency: 0,
      gymCount: 0,
      runCount: 0,
    };
  }

  const dates = uniqueDays.map(
    (d) => new Date(d + "T00:00:00")
  );

  // -------------------
  // LONGEST STREAK
  // -------------------

  let longestStreak = 1;
  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff =
      (dates[i] - dates[i - 1]) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
      longestStreak = Math.max(
        longestStreak,
        streak
      );
    } else {
      streak = 1;
    }
  }

  // -------------------
  // CURRENT STREAK
  // -------------------

  let currentStreak = 1;

  for (
    let i = dates.length - 1;
    i > 0;
    i--
  ) {
    const diff =
      (dates[i] - dates[i - 1]) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const lastDate =
    dates[dates.length - 1];

  const daysSinceLast =
    Math.floor(
      (today - lastDate) /
        (1000 * 60 * 60 * 24)
    );

  // pokud poslední aktivita není dnes ani včera,
  // streak se přeruší

  if (daysSinceLast > 1) {
    currentStreak = 0;
  }

  // -------------------
  // CONSISTENCY
  // -------------------

  const firstDate = dates[0];

  const totalDays =
    Math.floor(
      (today - firstDate) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  const consistency = Math.round(
    (uniqueDays.length / totalDays) * 100
  );

  // -------------------
  // ACTIVITY STATS
  // -------------------

  let gymCount = 0;
  let runCount = 0;

  logs.forEach((log) => {
    if (
      Array.isArray(log.activities)
    ) {
      if (
        log.activities.includes("gym")
      )
        gymCount++;

      if (
        log.activities.includes("run")
      )
        runCount++;
    }
  });

  return {
    currentStreak,
    longestStreak,
    activeDays: uniqueDays.length,
    totalDays,
    consistency,
    gymCount,
    runCount,
  };
};

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
    setStats(player);
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-xl my-12">

      <h2 className="text-2xl font-bold text-orange-400 mb-6">
        🔥 Streak Leaderboard
      </h2>

      <div className="space-y-2 mb-8">

        {players.map((player, index) => (
          <button
            key={player.id}
            onClick={() =>
              selectPlayer(player)
            }
            className="w-full flex justify-between items-center bg-gray-800 hover:bg-gray-700 p-3 rounded-xl"
          >
            <span>
              #{index + 1} {player.name}
            </span>

            <span className="font-bold text-orange-400">
              🔥 {player.currentStreak}
            </span>
          </button>
        ))}

      </div>

      {stats && (
        <div className="bg-gray-800 rounded-2xl p-6">

          <h3 className="text-xl font-bold mb-4">
            {selectedPlayer.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
  {stats.badges?.map((badge) => (
    <div
      key={badge.id}
      title={badge.description}
      className="bg-gray-700 px-3 py-2 rounded-xl text-sm"
    >
      {badge.icon} {badge.name}
    </div>
  ))}
</div>

          <div className="space-y-3 text-lg">

            <div>
              🔥 Aktuální streak:
              <span className="font-bold ml-2">
                {stats.currentStreak} dní
              </span>
            </div>

            <div>
              🏆 Nejdelší streak:
              <span className="font-bold ml-2">
                {stats.longestStreak} dní
              </span>
            </div>

            <div>
              📅 Aktivních dní:
              <span className="font-bold ml-2">
                {stats.activeDays}/
                {stats.totalDays}
              </span>
            </div>

            <div>
              📈 Konzistence:
              <span className="font-bold ml-2 text-green-400">
                {stats.consistency}%
              </span>
            </div>

            <div>
  🏋️ Gym:
  <span className="font-bold ml-2">
    {stats.gymCount}
  </span>
</div>

<div>
  🏃 Běhy:
  <span className="font-bold ml-2">
    {stats.runCount}
  </span>
</div>
            
          </div>

        </div>
      )}

    </div>
  );
}