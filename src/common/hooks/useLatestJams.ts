import { useEffect, useState } from "react";
import { message } from "antd";
import { Jam } from "@/common/types/utility";
import { API_URL } from "@/common/utils/config";

interface JamCardData {
  game: string;
  alt: string;
  src: string;
  user: string;
  desc: string;
}

export function useLatestJams() {
  const [jams, setJams] = useState<JamCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestJams = async () => {
      try {
        const res = await fetch(`${API_URL}/jams/`);
        if (!res.ok) throw new Error("Error al obtener las jams");

        const data: Jam[] = await res.json();
        const filteredData = data.filter(
          (jam: Jam) => jam.state !== "FINISHED"
        );
        const latestFive = filteredData.slice(0, 5).map((jam) => ({
          game: jam.game?.name || "Juego sin nombre",
          alt: jam.game?.name || "Juego sin nombre",
          src: jam.game?.headerImage || "",
          user: jam.createdBy.avatar,
          desc: jam.description || "Sin descripción disponible",
        }));

        setJams(latestFive);
      } catch (err) {
        console.error(err);
        message.error("No se pudieron cargar las últimas jams");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJams();
  }, []);

  return { jams, loading };
}
