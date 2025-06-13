"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Jam } from "@/common/types/utility";
import { API_URL } from "@/common/utils/config";

export default function useFilteredJams() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [jams, setJams] = useState<Jam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para cargar las jams filtradas por título o estado
  useEffect(() => {
    const fetchJams = async () => {
      setLoading(true);
      try {
        const isSearch = query.trim() !== "";
        const url = isSearch
          ? `${API_URL}/jams/openByTitle?title=${encodeURIComponent(query)}`
          : `${API_URL}/jams/byState/open`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener jams");

        const data = await res.json();
        setJams(data);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setJams([]);
        setError("Error cargando las jams.");
      } finally {
        setLoading(false);
      }
    };

    fetchJams();
  }, [query]);

  return { jams, setJams, loading, error };
}
