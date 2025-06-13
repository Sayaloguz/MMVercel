"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User } from "../types/utility";
import { API_URL } from "@/common/utils/config";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Efecto para obtener el usuario autenticado
  useEffect(() => {
    const fetchAuthUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        // Redirección si el usuario no está autenticado
        if (!res.ok) {
          console.log(
            "Token inválido, sesión expirada o usuario no autenticado"
          );

          if (pathname !== "/jams") {
            router.replace("/");
          }
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setUser(null);
        if (pathname !== "/jams") {
          router.replace("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, [router]);

  return { user, loading, error };
}
