import { toast } from "react-toastify";

// Funciones para manejar la aceptación y rechazo de invitaciones
// Refactorizar en un futuro para hacer mejor uso de estas
export const handleAceptar = async (
  jamId: string,
  invId: string,
  aceptarInvitacion: (jamId: string) => Promise<boolean>,
  rechazarInvitacion: (invId: string) => Promise<boolean>,
  onChange?: () => void
) => {
  try {
    console.log("Aceptar invitación:", { jamId, invId });
    const aceptado = await aceptarInvitacion(jamId);
    if (!aceptado) {
      toast.error("Error al aceptar la invitación.");
      return;
    }

    const eliminado = await rechazarInvitacion(invId);
    if (!eliminado) {
      toast.error("Error al eliminar la invitación tras aceptar.");
      return;
    }

    toast.success("¡Te has unido a la partida!");
    onChange?.();
  } catch (error) {
    console.error("Error en handleAceptar:", error);
    toast.error("Error inesperado al aceptar la invitación.");
  }
};

export const handleRechazar = async (
  invId: string,
  rechazarInvitacion: (invId: string) => Promise<boolean>,
  onChange?: () => void
) => {
  const eliminado = await rechazarInvitacion(invId);
  if (eliminado) {
    toast.success("Has rechazado la invitación.");
    onChange?.();
  } else {
    toast.error("Error al rechazar la invitación.");
  }
};
