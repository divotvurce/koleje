export function getPlayerBadges(stats) {
  const badges = [];

  // Streaky
 if (stats.consistency >= 95) {
  badges.push({
    id: "fitness-machine",
    icon: "🤖",
    name: "Fitness Machine",
    description:
      "95 % konzistence"
  });
}
else if (stats.consistency >= 80) {
  badges.push({
    id: "patronus",
    icon: "🦌",
    name: "Patronus of Consistency",
    description:
      "80 % konzistence"
  });
}
else if (stats.consistency >= 50) {
  badges.push({
    id: "rookie",
    icon: "📈",
    name: "Consistency Rookie",
    description:
      "50 % konzistence"
  });
}

if (stats.gymCount >= 100) {
  badges.push({
    id: "deathlift",
    icon: "💀",
    name: "Master of Deathlifts",
    description:
      "100 gym aktivit"
  });
}
else if (stats.gymCount >= 75) {
  badges.push({
    id: "gym-beast",
    icon: "🦍",
    name: "Gym Beast",
    description:
      "75 gym aktivit"
  });
}
else if (stats.gymCount >= 50) {
  badges.push({
    id: "gym-rat",
    icon: "🏋️",
    name: "Gym Rat",
    description:
      "50 gym aktivit"
  });
}
else if (stats.gymCount >= 25) {
  badges.push({
    id: "iron-apprentice",
    icon: "⚒️",
    name: "Iron Apprentice",
    description:
      "25 gym aktivit"
  });
}
else if (stats.gymCount >= 10) {
  badges.push({
    id: "first-gains",
    icon: "💪",
    name: "First Gains",
    description:
      "10 gym aktivit"
  });
}

if (stats.runCount >= 100) {
  badges.push({
    id: "flash",
    icon: "⚡",
    name: "The Boy Who Ran",
    description:
      "100 běhů"
  });
}
else if (stats.runCount >= 75) {
  badges.push({
    id: "marathoner",
    icon: "🏅",
    name: "Marathon Marauder",
    description:
      "75 běhů"
  });
}
else if (stats.runCount >= 50) {
  badges.push({
    id: "road-runner",
    icon: "🏃",
    name: "Road Runner",
    description:
      "50 běhů"
  });
}
else if (stats.runCount >= 25) {
  badges.push({
    id: "swift-feet",
    icon: "👟",
    name: "Swift Feet",
    description:
      "25 běhů"
  });
}
else if (stats.runCount >= 10) {
  badges.push({
    id: "first-run",
    icon: "🌱",
    name: "First Run",
    description:
      "10 běhů"
  });
}

if (stats.longestStreak >= 100) {
  badges.push({
    id: "immortal",
    icon: "👑",
    name: "Immortal Grinder",
    description:
      "100denní streak"
  });
}
else if (stats.longestStreak >= 50) {
  badges.push({
    id: "streak-lord",
    icon: "🔥",
    name: "Streak Lord",
    description:
      "50denní streak"
  });
}
else if (stats.longestStreak >= 30) {
  badges.push({
    id: "firekeeper",
    icon: "🕯️",
    name: "Firekeeper",
    description:
      "30denní streak"
  });
}
else if (stats.longestStreak >= 14) {
  badges.push({
    id: "week-warrior",
    icon: "⚔️",
    name: "Week Warrior",
    description:
      "14denní streak"
  });
}
else if (stats.longestStreak >= 7) {
  badges.push({
    id: "spark",
    icon: "✨",
    name: "Spark Ignited",
    description:
      "7denní streak"
  });
}

  return badges;
}