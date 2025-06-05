// userProfileHandlers.ts
"use client";

import { toast } from "react-toastify";

export const actualizarDatos = async (steamId: string, refetch: () => void) => {
  try {
    const res = await fetch(`http://localhost:8080/users/${steamId}`, {
      method: "PUT",
    });

    if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`);

    toast.success("Datos actualizados correctamente");
    refetch();
  } catch {
    toast.error("No se pudo actualizar");
  }
};

export const borrarCuenta = async (
  steamId: string,
  onSuccess: () => void,
  onFailure?: () => void
) => {
  try {
    const res = await fetch(`http://localhost:8080/users/${steamId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`Error al borrar: ${res.status}`);

    toast.success("Cuenta eliminada");
    onSuccess();
  } catch {
    toast.error("No se pudo borrar la cuenta");
    if (onFailure) onFailure();
  }
};
