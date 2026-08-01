import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "./firebase";


// Přidání nového studenta
export async function addStudent(name, house) {
  try {
    const studentsRef = collection(db, "students");
    const docRef = await addDoc(studentsRef, {
      name,
      house,
      points: 0,
      weeklyPoints: 0,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (err) {
    console.error("Chyba při přidávání studenta:", err);
    throw err;
  }
}

// Přidání bodů studentovi
export async function addPoints(
  studentId,
  pointsToAdd,
  reason,
  customDate = null,
  activities = []
) {
  try {
    const studentRef = doc(db, "students", studentId);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      throw new Error("Student neexistuje");
    }

    const activityDate = customDate
      ? (() => {
          const [year, month, day] =
            customDate.split("-");

          return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
          );
        })()
      : new Date();

    // ----------------------
    // Kontrola aktivit v daný den
    // ----------------------

    const startOfDay = new Date(activityDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(activityDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingLogsSnapshot =
      await getDocs(
        query(
          collection(db, "pointsLogs"),
          where(
            "studentId",
            "==",
            studentId
          ),
          where(
            "date",
            ">=",
            startOfDay
          ),
          where(
            "date",
            "<=",
            endOfDay
          )
        )
      );

    let alreadyHasGym = false;
    let alreadyHasRun = false;

    existingLogsSnapshot.forEach((doc) => {
      const data = doc.data();

      if (
        data.activities?.includes(
          "gym"
        )
      ) {
        alreadyHasGym = true;
      }

      if (
        data.activities?.includes(
          "run"
        )
      ) {
        alreadyHasRun = true;
      }
    });

    if (
      activities.includes("gym") &&
      alreadyHasGym
    ) {
      throw new Error(
        "Gym aktivita už byla v tento den zapsána."
      );
    }

    if (
      activities.includes("run") &&
      alreadyHasRun
    ) {
      throw new Error(
        "Běžecká aktivita už byla v tento den zapsána."
      );
    }

    // ----------------------
    // Připsání bodů
    // ----------------------

    const currentPoints =
      studentSnap.data().points || 0;

    const currentWeekly =
      studentSnap.data().weeklyPoints || 0;

    await updateDoc(studentRef, {
      points:
        currentPoints + pointsToAdd,
      weeklyPoints:
        currentWeekly + pointsToAdd
    });

    // ----------------------
    // Log
    // ----------------------

    const logsRef =
      collection(db, "pointsLogs");

    await addDoc(logsRef, {
      studentId,
      points: pointsToAdd,
      activities,
      reason: reason || "",
      date: activityDate
    });

  } catch (err) {
    console.error(
      "Chyba při přidávání bodů:",
      err
    );
    throw err;
  }
}

// Načtení všech studentů
export async function getAllStudents() {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Chyba při načítání studentů:", err);
    return [];
  }
}

// Načtení top 5 studentů podle weeklyPoints pro konkrétní kolej
export async function getWeeklyTopByHouse(house) {
  try {
    const studentsRef = collection(db, "students");
    const q = query(
      studentsRef,
      where("house", "==", house),
      orderBy("weeklyPoints", "desc"),
      limit(5)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Chyba při načítání weekly top:", err);
    return [];
  }
}

// Reset weeklyPoints u všech studentů
export async function resetWeeklyPoints() {
  try {
    const studentsRef = collection(db, "students");
    const snapshot = await getDocs(studentsRef);

    const promises = snapshot.docs.map(docSnap =>
      updateDoc(doc(db, "students", docSnap.id), { weeklyPoints: 0 })
    );
    await Promise.all(promises);
  } catch (err) {
    console.error("Chyba při resetu weeklyPoints:", err);
  }
}

export async function getAllTimeRanking() {
  try {
    const studentsRef = collection(db, "students");
    const q = query(studentsRef, orderBy("points", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Chyba při načítání celkového žebříčku:", err);
    return [];
  }
}

// Načtení všech studentů podle koleje seřazených podle celkových bodů
export async function getAllTimeByHouse(house) {
  try {
    const studentsRef = collection(db, "students");
    const q = query(
      studentsRef,
      where("house", "==", house),
      orderBy("points", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Chyba při načítání celkového žebříčku pro kolej:", err);
    return [];
  }
}
