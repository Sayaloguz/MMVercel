// hooks/useFilteredJams.ts
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Jam } from "@/common/types/utility";

export default function useFilteredJams() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [jams, setJams] = useState<Jam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJams = async () => {
      setLoading(true);
      try {
        const isSearch = query.trim() !== "";
        const url = isSearch
          ? `http://localhost:8080/jams/openByTitle?title=${encodeURIComponent(
              query
            )}`
          : `http://localhost:8080/jams/byState/open`;

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
