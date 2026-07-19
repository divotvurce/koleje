// src/components/ActivitiesList.jsx
import React from "react";

const dailyActivities = [
  { name: "Cvičení / gym", points: 1 },
  { name: "Běh (min. 4 km)", points: 1 },
];

const weeklyChallenges = [
  { name: "Nejvíce kroků za týden", points: 5 },
];

const monthlyAchievements = [
  { name: "Největší úbytek tuku", points: 10 },
  { name: "Největší přírůstek svalů", points: 10 },
  { name: "Největší úbytek viscerálního tuku", points: 10 },
];

function ActivitySection({ title, description, color, activities }) {
  return (
    <div className="bg-gray-900 p-6 rounded-3xl shadow-xl my-8">
      <h2 className={`text-2xl font-bold mb-2 ${color}`}>
        {title}
      </h2>

      <p className="mb-4 text-gray-300">
        {description}
      </p>

      <div className="divide-y divide-gray-700">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-xl py-3 px-2 hover:bg-gray-800 transition"
          >
            <span className="text-white">{activity.name}</span>
            <span className="font-bold text-yellow-300">
              +{activity.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ActivitiesList() {
  return (
    <>
      <ActivitySection
        title="🏋️ Denní aktivity"
        description="Základ challenge. Maximálně 2 body za den. Konzistentní plnění denních aktivit je klíčem k úspěchu."
        color="text-green-400"
        activities={dailyActivities}
      />

      <ActivitySection
        title="⚡ Týdenní challenge"
        description="Speciální výzva vyhlašovaná každý týden."
        color="text-blue-400"
        activities={weeklyChallenges}
      />

      <ActivitySection
        title="🏆 Měsíční achievementy"
        description="Velké bonusy za nejlepší výsledky dle InBody měření. Hráč se nemusí měřit, ale pokud se měří, má šanci získat tyto body."
        color="text-yellow-400"
        activities={monthlyAchievements}
      />
    </>
  );
}