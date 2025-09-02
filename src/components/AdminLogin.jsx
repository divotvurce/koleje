import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess(); // zavře login formulář
    } catch (err) {
      console.error(err);
      setError("Špatné přihlašovací údaje");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="mt-2 bg-gray-800 p-6 rounded-3xl shadow-xl max-w-sm mx-auto flex flex-col gap-3"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center">Admin Login</h2>
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
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        type="submit"
        className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-lg w-full"
      >
        Login
      </button>
    </form>
  );
}
