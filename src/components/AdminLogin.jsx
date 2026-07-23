import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess(); // Zavře login okno po úspěšném přihlášení
    } catch (err) {
      console.error(err);
      setError("Špatný email nebo heslo");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="mt-2 bg-gray-800 p-6 rounded-3xl shadow-xl max-w-sm mx-auto flex flex-col gap-3 border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center">Přihlášení</h2>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded-lg text-black w-full"
        required
      />
      <input
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded-lg text-black w-full"
        required
      />
      
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-lg w-full font-semibold transition mt-2"
      >
        Přihlásit se
      </button>
    </form>
  );
}