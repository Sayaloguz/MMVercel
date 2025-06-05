import { useState, useEffect } from "react";
import Invitacion from "@/common/components/Invitacion/Delivery";
import { toast } from "react-toastify";
import { useUserInvitations } from "@/common/hooks/useUserInvitations";
import { MailOutlined } from "@ant-design/icons";

export default function InvitacionesCard() {
  const {
    invitaciones: invitacionesBackend,
    error,
    cargando,
    aceptarInvitacion,
    rechazarInvitacion,
  } = useUserInvitations();

  const [invitaciones, setInvitaciones] = useState(invitacionesBackend);

  useEffect(() => {
    setInvitaciones(invitacionesBackend);
  }, [invitacionesBackend]);

  if (cargando) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-12">
        {/* Skeleton aquí */}
      </div>
    );
  }

  if (error) {
    toast.error(error);
  }

  const onAceptar = async (jamId: string, invId: string): Promise<boolean> => {
    try {
      const aceptado = await aceptarInvitacion(jamId);
      if (!aceptado) {
        toast.error("Error al aceptar la invitación.");
        return false;
      }
      const eliminado = await rechazarInvitacion(invId);
      if (!eliminado) {
        toast.error("Error al eliminar invitación tras aceptar.");
        return false;
      }
      toast.success("¡Te has unido a la partida!");
      return true;
    } catch {
      toast.error("Error inesperado al aceptar la invitación.");
      return false;
    }
  };

  const onRechazar = async (invId: string): Promise<boolean> => {
    try {
      const eliminado = await rechazarInvitacion(invId);
      if (eliminado) {
        toast.success("Has rechazado la invitación.");
        return true;
      } else {
        toast.error("Error al rechazar la invitación.");
        return false;
      }
    } catch {
      toast.error("Error inesperado al rechazar la invitación.");
      return false;
    }
  };

  const removeInvitation = (invId: string) => {
    setInvitaciones((prev) =>
      prev.filter((inv) => inv.invitation.invId !== invId)
    );
  };

  return (
    <div className="mb-5 bg-[#1c2331] text-white rounded-2xl shadow-xl border border-gray-700 w-full max-w-3xl mx-auto p-6 sm:p-8 px-4 sm:px-8 transition-all duration-300 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold flex items-center gap-2 mb-1">
          <MailOutlined className="shadowed-element" />
          Invitaciones pendientes
        </h2>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {invitaciones.length > 0 ? (
          invitaciones.map((inv) => (
            <Invitacion
              key={inv.invitation.invId}
              invitation={inv}
              onAceptar={() =>
                onAceptar(inv.invitation.jamId, inv.invitation.invId)
              }
              onRechazar={() => onRechazar(inv.invitation.invId)}
              onRemove={() => removeInvitation(inv.invitation.invId)}
            />
          ))
        ) : (
          <p className="text-gray-400">No tienes invitaciones pendientes.</p>
        )}
      </div>
    </div>
  );
}
