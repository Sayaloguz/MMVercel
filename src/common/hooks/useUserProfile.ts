"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../types/utility";
import { useAuth } from "./useAuth";
import { API_URL } from "@/common/utils/config";

/**
 * Hook para obtener el perfil de usuario basado en la ID de Steam.
 * Si no se proporciona una ID, intenta usar la del usuario autenticado.
 * Redirige a la página de perfil propia si no hay ID en la URL.
 */
export function useUserProfile(steamIdFromUrl?: string) {
  const { user: authUser, loading: authLoading, error: authError } = useAuth();
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  async function fetchUser(steamId: string) {
    setCargando(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/users/byId/mongo/${steamId}`);

      if (res.status === 404) {
        throw new Error(
          "No se ha encontrado un usuario con la ID proporcionada"
        );
      }

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data: User = await res.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error(
          "No se ha encontrado un usuario con la ID proporcionada"
        );
      }

      setUsuario(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    // Esperar a que termine la carga de autenticación
    if (authLoading) return;

    if (authError) {
      setError(authError);
      setCargando(false);
      return;
    }

    // Si no hay steamId en URL pero sí usuario autenticado
    if (!steamIdFromUrl && authUser?.steamId) {
      router.replace(`/perfil?id=${authUser.steamId}`);
      return;
    }

    // Si hay steamId, cargar usuario
    if (steamIdFromUrl) {
      fetchUser(steamIdFromUrl);
      return;
    }

    // Si no hay steamId ni usuario autenticado
    router.replace(`/`);
  }, [authLoading, authError, authUser, steamIdFromUrl, router]);

  return { usuario, error, cargando };
}
