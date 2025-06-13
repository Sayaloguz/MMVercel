"use client";
import { useEffect, useState } from "react";
import { Jam, User } from "@/common/types/utility";
import HistoryJamCard from "../../HistoryJamCard/Delivery";
import { API_URL } from "@/common/utils/config";

// Componente para mostrar la lista de jams en las que el usuario ha participado
const HistoryJamList = () => {
  const [user, setUser] = useState<User | null>(null);
  const [jams, setJams] = useState<Jam[]>([]);

  useEffect(() => {
    const fetchUserAndJams = async () => {
      try {
        const userRes = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!userRes.ok) throw new Error("Error al obtener usuario");
        const userData = await userRes.json();
        setUser(userData);

        const res = await fetch(`${API_URL}/jams/byState/finished`);
        if (!res.ok) throw new Error("Error al obtener jams");

        const allJams: Jam[] = await res.json();
        // Creo que esta parte ya no es necesaria
        const mappedJams = allJams.map((jam) => ({
          ...jam,
          players: jam.players,
        }));

        const filtered = mappedJams.filter(
          (jam) =>
            Array.isArray(jam.players) &&
            jam.players.some((p) => p.steamId === userData.steamId)
        );

        setJams(filtered);
      } catch (err) {
        console.error("Error al cargar jams:", err);
      }
    };

    fetchUserAndJams();
  }, []);

  if (!user) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-4 py-2 px-4">
      {jams.length === 0 && (
        <div className="text-center text-gray-500 pt-20">
          No has participado en ninguna Jam aún.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {jams.map((jam) => (
          <div key={jam.id} className="w-full max-w-sm">
            <HistoryJamCard jam={jam} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryJamList;
