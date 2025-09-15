import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "./firebase";

// Přidání nového studenta
export async function addStudent(name, grade, house) {
  try {
    const studentsRef = collection(db, "students");
    const docRef = await addDoc(studentsRef, {
      name,
      grade,
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
export async function addPoints(studentId, pointsToAdd, reason) {
  try {
    const studentRef = doc(db, "students", studentId);
    const studentSnap = await getDoc(studentRef);
    if (!studentSnap.exists()) throw new Error("Student neexistuje");

    const currentPoints = studentSnap.data().points || 0;
    const currentWeekly = studentSnap.data().weeklyPoints || 0;

    await updateDoc(studentRef, {
      points: currentPoints + pointsToAdd,
      weeklyPoints: currentWeekly + pointsToAdd
    });

    const logsRef = collection(db, "pointsLogs");
    await addDoc(logsRef, {
      studentId,
      points: pointsToAdd,
      reason: reason || "",
      date: new Date()
    });
  } catch (err) {
    console.error("Chyba při přidávání bodů:", err);
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
