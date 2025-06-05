"use client";
import { useEffect, useState } from "react";
import { FullInvitation, Invitation, Jam, User } from "../types/utility";
import { useAuth } from "./useAuth";

export function useUserInvitations() {
  const { user: authUser, loading: authLoading } = useAuth();

  const [invitaciones, setInvitaciones] = useState<FullInvitation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const fetchInvitaciones = async () => {
      if (!authUser?.steamId) {
        setError("No se encontró el usuario autenticado.");
        setCargando(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/invitations/${authUser.steamId}`
        );

        console.log("LLEGAMOS A ESTE PUNTO", res);
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
    };

    fetchInvitaciones();
  }, [authLoading, authUser]);

  return { invitaciones, error, cargando };
}
