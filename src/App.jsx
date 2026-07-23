import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { auth, signOut } from "./firebase"; // Přidáno signOut pro odhlášení
import AdminLogin from "./components/AdminLogin";
import HouseBoard from "./components/HouseBoard";
import WeeklyTop from "./components/WeeklyTop";
import PointsLog from "./components/PointsLog";
import AdminPanel from "./components/AdminPanel";
import AllTimeRanking from "./components/AllTimeRanking";
import AllTimeByHouse from "./components/AllTimeByHouse";
import ActivitiesList from "./components/Activities";
import DailyActivities from "./components/DailyActivities";

function App() {
  const { user, loading } = useAuth();
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;

  // Kontrola, zda je přihlášen hlavní admin
  const isAdmin = user?.email === "bosamar@seznam.cz";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAdminMode(false);
    } catch (err) {
      console.error("Chyba při odhlášení:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Hlavička s logem a přihlašováním */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-black text-purple-800 drop-shadow-lg">
            BeerBros Challenge
          </h1>

          {/* Přihlášení / Stav uživatele */}
          <div className="relative">
            {!user ? (
              // Pokud NENÍ nikdo přihlášen
              <>
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-lg shadow-lg transition font-semibold"
                >
                  {showLogin ? "Zavřít" : "Login"}
                </button>
                
                {showLogin && (
                  <div className="absolute right-0 top-12 z-50 min-w-[300px]">
                    <AdminLogin onSuccess={() => setShowLogin(false)} />
                  </div>
                )}
              </>
            ) : (
              // Pokud JE někdo přihlášen (Admin nebo Běžný uživatel)
              <div className="flex items-center gap-3 bg-gray-800/80 px-4 py-2 rounded-xl border border-gray-700">
                <span className="text-sm text-gray-300">
                  {isAdmin ? "👑 Admin" : `👤 ${user.email}`}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-800/80 hover:bg-red-800 px-3 py-1 rounded-lg text-xs transition"
                >
                  Odhlásit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tlačítko pro přepnutí do admin panelu (Vidí JEN bosamar@seznam.cz) */}
        {isAdmin && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setAdminMode(!adminMode)}
              className="bg-purple-800 hover:bg-purple-900 px-6 py-2 rounded-lg shadow-lg transition font-bold"
            >
              {adminMode ? "⬅️ Zpět na žebříčky" : "⚙️ Přejít do admin sekce"}
            </button>
          </div>
        )}

        {/* Hlavní obsah - Žebříčky a aktivity */}
        {!adminMode && (
          <>
            <HouseBoard />
            <img className="mx-auto my-6" src="/images/swoldy.PNG" alt="Description" />
            <AllTimeRanking />
            <AllTimeByHouse />
            <WeeklyTop />
            <img className="mx-auto my-6" src="/images/gymbros.png" alt="Description" />
            <PointsLog />
            <ActivitiesList />
            <DailyActivities />
          </>
        )}

        {/* Admin sekce (zpřístupněná jen pro adminMode + isAdmin) */}
        {adminMode && isAdmin && <AdminPanel />}

      </div>
    </div>
  );
}

export default App;
