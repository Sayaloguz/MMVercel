"use client";

import { useUserInvitations } from "@/common/hooks/useUserInvitations";
import Invitacion from "@/common/components/Invitacion/Delivery";
import { MailOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { toast } from "react-toastify";

export default function InvitacionesCard() {
  const {
    invitaciones,
    error,
    cargando,
    refetch,
    aceptarInvitacion,
    rechazarInvitacion,
  } = useUserInvitations();

  if (cargando) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-12">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    );
  }

  if (error) {
    toast.error(error);
  }

  const onAceptar = async (jamId: string, invId: string) => {
    const aceptado = await aceptarInvitacion(jamId);
    if (aceptado) {
      const eliminado = await rechazarInvitacion(invId);
      if (eliminado) {
        toast.success("¡Te has unido a la partida!");
        refetch();
      } else {
        toast.error("Error al eliminar invitación tras aceptar.");
      }
    } else {
      toast.error("Error al aceptar la invitación.");
    }
  };

  const onRechazar = async (invId: string) => {
    const eliminado = await rechazarInvitacion(invId);
    if (eliminado) {
      toast.success("Has rechazado la invitación.");
      refetch();
    } else {
      toast.error("Error al rechazar la invitación.");
    }
  };

  return (
    <div className="mb-5 bg-[#1c2331] text-white rounded-2xl shadow-xl border border-gray-700 w-full max-w-3xl mx-auto p-6 sm:p-8 px-4 sm:px-8 transition-all duration-300 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold flex items-center gap-2 mb-1">
          <MailOutlined />
          Invitaciones pendientes
        </h2>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {invitaciones.length > 0 ? (
          invitaciones.map((inv) => (
            <Invitacion
              key={inv.invitation.invId}
              invitation={inv}
              aceptarInvitacion={aceptarInvitacion}
              rechazarInvitacion={rechazarInvitacion}
              onChange={refetch} // pasamos refetch para refrescar tras acción
              onAceptar={() =>
                onAceptar(inv.invitation.jamId, inv.invitation.invId)
              }
              onRechazar={() => onRechazar(inv.invitation.invId)}
            />
          ))
        ) : (
          <p className="text-gray-400">No tienes invitaciones pendientes.</p>
        )}
      </div>
    </div>
  );
}
