import { useEffect, useState } from "react";
import { User } from "../types/utility";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("No autenticado o token inválido");
        }

        const data: User = await res.json();

        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return { user, loading, error };
}
