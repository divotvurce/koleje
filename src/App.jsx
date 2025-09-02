import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AdminLogin from "./components/AdminLogin";
import HouseBoard from "./components/HouseBoard";
import WeeklyTop from "./components/WeeklyTop";
import PointsLog from "./components/PointsLog";
import AdminPanel from "./components/AdminPanel";
import AllTimeRanking from "./components/AllTimeRanking";
import AllTimeByHouse from "./components/AllTimeByHouse";
import ActivitiesList from "./components/Activities";

function App() {
  const { user, loading } = useAuth();
  const [adminMode, setAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return <div>Loading...</div>; // zatím zobrazíme loading

  const isAdmin = user?.email === "bosamar@seznam.cz"; // tvůj admin email

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-black text-purple-800 drop-shadow-lg">
            English Challenge
          </h1>

          {/* Přihlášení */}
          {!isAdmin && (
            <div>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-lg shadow-lg transition"
              >
                Login
              </button>
              {showLogin && <AdminLogin onSuccess={() => setShowLogin(false)} />}
            </div>
          )}
        </div>

        {/* Tlačítko pro přepnutí do admin */}
        {isAdmin && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setAdminMode(!adminMode)}
              className="bg-purple-800 hover:bg-purple-900 px-6 py-2 rounded-lg shadow-lg transition"
            >
              {adminMode ? "Zpět na žebříčky" : "Přejít do admin sekce"}
            </button>
          </div>
        )}

        {/* Obsah */}
        {!adminMode && (
          <>
            <HouseBoard />
            <AllTimeRanking />
            <AllTimeByHouse />
            <WeeklyTop />
            <PointsLog />
            <ActivitiesList />
          </>
        )}
        {adminMode && isAdmin && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;
