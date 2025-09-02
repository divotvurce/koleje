import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("Nebelvír");
  const [className, setClassName] = useState("");

  const handleAddStudent = async () => {
    try {
      await addDoc(collection(db, "students"), {
        name,
        house,
        class: className,
        points: [],
        createdAt: Timestamp.now(),
      });
      alert("Student přidán!");
      setName("");
      setClassName("");
    } catch (err) {
      console.error(err);
      alert("Chyba při přidávání studenta");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white">
      <h2 className="text-2xl mb-4">Přidat studenta</h2>
      <input
        type="text"
        placeholder="Jméno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 rounded text-black w-full"
      />
      <input
        type="text"
        placeholder="Třída"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="mb-2 p-2 rounded text-black w-full"
      />
      <select
        value={house}
        onChange={(e) => setHouse(e.target.value)}
        className="mb-4 p-2 rounded text-black w-full"
      >
        <option value="Griffindor">Griffindor</option>
        <option value="Slytherin">Slytherin</option>
        <option value="Hufflepuff">Hufflepuff</option>
        <option value="Ravenclaw">Ravenclaw</option>
      </select>
      <button
        onClick={handleAddStudent}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Přidat studenta
      </button>
    </div>
  );
}
