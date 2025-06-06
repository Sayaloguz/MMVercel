"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types/utility";
import { API_URL } from "@/common/utils/config";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          // Si el token es inválido, redirige
          console.log("Token inválido o sesión expirada");
          router.replace("/");
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setUser(null);
        router.replace("/"); // Redirige también en errores de red
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, [router]);

  return { user, loading, error };
}
