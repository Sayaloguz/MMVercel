"use client";

import BigCardAntd from "@/common/components/Cards/MisJamsCardAntd/Delivery";
import { useEffect, useState } from "react";
import { Jam } from "@/common/types/utility";

const JamList = () => {
  const [jams, setJams] = useState<Jam[]>([]);

  useEffect(() => {
    const fetchJams = async () => {
      try {
        // Obtener el usuario autenticado desde la cookie
        const userRes = await fetch("http://localhost:8080/auth/me", {
          credentials: "include",
        });
        if (!userRes.ok) throw new Error("No se pudo obtener el usuario");

        const user = await userRes.json();
        const steamId = user.steamId;

        // Obtener las jams creadas por este usuario
        const jamsRes = await fetch(
          `http://localhost:8080/jams/byCreator/${steamId}`
        );
        if (!jamsRes.ok) throw new Error("No se pudieron obtener las jams");

        const jamsData = await jamsRes.json();
        setJams(jamsData);
      } catch (err) {
        console.error("Error al cargar las jams:", err);
        setJams([]);
      }
    };

    fetchJams();
  }, []);

  const handleUpdateJam = (updatedJam: Jam) => {
    setJams((prevJams) =>
      prevJams.map((jam) =>
        jam.id === updatedJam.id ? { ...jam, ...updatedJam } : jam
      )
    );
  };

  const handleDeleteJam = (id: string) => {
    setJams((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <>
      {jams
        .filter((jam): jam is Jam => !!jam && !!jam.game) // Evita jams vacíos o sin game
        .map((jam) => (
          <BigCardAntd
            key={jam.id}
            jam={jam}
            onUpdate={handleUpdateJam}
            onDelete={handleDeleteJam}
          />
        ))}
    </>
  );
};

export default JamList;
