// hooks/useUserInvitations.ts (o donde esté definido)

import { useEffect, useState, useCallback } from "react";
import { FullInvitation, Invitation, Jam, User } from "../types/utility";
import { useAuth } from "./useAuth";

export function useUserInvitations() {
  const { user: authUser, loading: authLoading } = useAuth();

  const [invitaciones, setInvitaciones] = useState<FullInvitation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  const fetchInvitaciones = useCallback(async () => {
    if (!authUser?.steamId) {
      setError("No se encontró el usuario autenticado.");
      setCargando(false);
      return;
    }

    setCargando(true);

    try {
      const res = await fetch(
        `http://localhost:8080/invitations/${authUser.steamId}`
      );
      if (!res.ok) {
        throw new Error(`Error al obtener las invitaciones: ${res.status}`);
      }

      const invitaciones: Invitation[] = await res.json();

      const enriched: FullInvitation[] = await Promise.all(
        invitaciones.map(async (inv) => {
          const [senderRes, jamRes] = await Promise.all([
            fetch(`http://localhost:8080/users/byId/mongo/${inv.senderId}`),
            fetch(`http://localhost:8080/jams/byId/${inv.jamId}`),
          ]);

          if (!senderRes.ok || !jamRes.ok) {
            throw new Error("Error al obtener datos del remitente o la jam");
          }

          const sender: User = await senderRes.json();
          const jam: Jam = await jamRes.json();

          return {
            invitation: inv,
            sender,
            jam,
          };
        })
      );

      setInvitaciones(enriched);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      setInvitaciones([]);
    } finally {
      setCargando(false);
    }
  }, [authUser]);

  useEffect(() => {
    if (!authLoading && authUser?.steamId) {
      fetchInvitaciones();
    }
  }, [authLoading, authUser, fetchInvitaciones]);

  const aceptarInvitacion = async (jamId: string): Promise<boolean> => {
    if (!authUser) return false;

    try {
      const res = await fetch(`http://localhost:8080/jams/${jamId}/addPlayer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: authUser.id,
          steamId: authUser.steamId,
          name: authUser.name,
          avatar: authUser.avatar,
        }),
      });

      return res.ok;
    } catch (err) {
      console.error("Error al aceptar invitación:", err);
      return false;
    }
  };

  const rechazarInvitacion = async (invId: string): Promise<boolean> => {
    try {
      const res = await fetch(`http://localhost:8080/invitations/${invId}`, {
        method: "DELETE",
      });

      return res.ok;
    } catch (err) {
      console.error("Error al rechazar invitación:", err);
      return false;
    }
  };

  return {
    invitaciones,
    error,
    cargando,
    refetch: fetchInvitaciones,
    aceptarInvitacion,
    rechazarInvitacion,
    setInvitaciones, // <-- agregado aquí
  };
}
