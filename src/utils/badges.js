export function getPlayerBadges(stats) {
  const badges = [];

  // 1. Consistency (Konzistence)
  if (stats.consistency >= 95) {
    badges.push({
      id: "fitness-machine",
      icon: "🤖",
      name: "Fitness Machine",
      description: "95 % konzistence"
    });
  } else if (stats.consistency >= 80) {
    badges.push({
      id: "patronus",
      icon: "🦌",
      name: "Patronus of Consistency",
      description: "80 % konzistence"
    });
  } else if (stats.consistency >= 50) {
    badges.push({
      id: "rookie",
      icon: "📈",
      name: "Consistency Rookie",
      description: "50 % konzistence"
    });
  }

  // 2. Workout Ratio (Poměr cvičení vs. dny)
  // Očekává stats.workoutRatio = (totalWorkouts / totalDays) * 100
  if (stats.workoutRatio > 100) {
    badges.push({
      id: "time-turner-overachiever",
      icon: "⏳",
      name: "Hermione's Time-Turner Overachiever",
      description: "Přes 100 % (více tréninků než dní – používáš Obraceč času?)"
    });
  } else if (stats.workoutRatio >= 70) {
    badges.push({
      id: "daily-grinder",
      icon: "🔥",
      name: "Daily Grinder",
      description: "70–100 % (Cvičení téměř každý den, skvělá práce!)"
    });
  } else if (stats.workoutRatio >= 50) {
    badges.push({
      id: "balanced-warrior",
      icon: "⚖️",
      name: "Balanced Warrior",
      description: "50–69 % (Stabilní tempo, držíš se víc než polovinu dní)"
    });
  } else if (stats.workoutRatio < 50 && stats.workoutRatio > 0) {
    badges.push({
      id: "awakening-spark",
      icon: "🌱",
      name: "Awakening Spark",
      description: "Méně než 50 % (Každý trénink se počítá, buduj návyk!)"
    });
  }

  // 3. GymSesh (Posilovna)
  if (stats.gymCount >= 100) {
    badges.push({
      id: "deathlift",
      icon: "💀",
      name: "Master of Deathlifts",
      description: "100 gym aktivit"
    });
  } else if (stats.gymCount >= 75) {
    badges.push({
      id: "gym-beast",
      icon: "🦍",
      name: "Gym Beast",
      description: "75 gym aktivit"
    });
  } else if (stats.gymCount >= 50) {
    badges.push({
      id: "gym-rat",
      icon: "🏋️",
      name: "Gym Rat",
      description: "50 gym aktivit"
    });
  } else if (stats.gymCount >= 25) {
    badges.push({
      id: "iron-apprentice",
      icon: "⚒️",
      name: "Iron Apprentice",
      description: "25 gym aktivit"
    });
  } else if (stats.gymCount >= 10) {
    badges.push({
      id: "first-gains",
      icon: "💪",
      name: "First Gains",
      description: "10 gym aktivit"
    });
  }

  // 4. RunSesh (Běh)
  if (stats.runCount >= 100) {
    badges.push({
      id: "flash",
      icon: "⚡",
      name: "The Boy Who Ran",
      description: "100 běhů"
    });
  } else if (stats.runCount >= 75) {
    badges.push({
      id: "marathoner",
      icon: "🏅",
      name: "Marathon Marauder",
      description: "75 běhů"
    });
  } else if (stats.runCount >= 50) {
    badges.push({
      id: "road-runner",
      icon: "🏃",
      name: "Road Runner",
      description: "50 běhů"
    });
  } else if (stats.runCount >= 25) {
    badges.push({
      id: "swift-feet",
      icon: "👟",
      name: "Swift Feet",
      description: "25 běhů"
    });
  } else if (stats.runCount >= 10) {
    badges.push({
      id: "first-run",
      icon: "🌱",
      name: "First Run",
      description: "10 běhů"
    });
  }

  // 5. Streaks (Série)
  if (stats.longestStreak >= 100) {
    badges.push({
      id: "immortal",
      icon: "👑",
      name: "Immortal Grinder",
      description: "100denní streak"
    });
  } else if (stats.longestStreak >= 50) {
    badges.push({
      id: "streak-lord",
      icon: "🔥",
      name: "Streak Lord",
      description: "50denní streak"
    });
  } else if (stats.longestStreak >= 30) {
    badges.push({
      id: "firekeeper",
      icon: "🕯️",
      name: "Firekeeper",
      description: "30denní streak"
    });
  } else if (stats.longestStreak >= 14) {
    badges.push({
      id: "week-warrior",
      icon: "⚔️",
      name: "Week Warrior",
      description: "14denní streak"
    });
  } else if (stats.longestStreak >= 7) {
    badges.push({
      id: "spark",
      icon: "✨",
      name: "Spark Ignited",
      description: "7denní streak"
    });
  }

  return badges;
}