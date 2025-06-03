import { useState } from "react";
import { toast } from "react-toastify";
import { deleteJam, expelPlayer, leaveJam, updateJam } from "./handleActions";
import { Jam, JamUpdateDTO } from "@/common/types/utility";

export const useJamActions = ({
  jam,
  onActionComplete,
  currentUserId,
}: {
  jam: Jam;
  onActionComplete?: () => Promise<void>;
  currentUserId?: string;
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingExpel, setLoadingExpel] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await deleteJam(jam.id);
      showSuccessToast("Jam eliminada correctamente");
      await onActionComplete?.();
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        showErrorToast(e.message);
      } else {
        showErrorToast("No se pudo eliminar la jam. Inténtalo más tarde.");
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleConfirmExpel = async (playerId: string) => {
    setLoadingExpel(true);
    try {
      await expelPlayer(jam.id, playerId);
      showSuccessToast("Jugador expulsado correctamente");
      await onActionComplete?.();
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        showErrorToast(e.message);
      } else {
        showErrorToast("No se pudo expulsar al jugador. Inténtalo más tarde.");
      }
    } finally {
      setLoadingExpel(false);
    }
  };

  const handleConfirmLeave = async () => {
    if (!currentUserId) return;
    setLoadingDelete(true);
    try {
      await leaveJam(jam.id, currentUserId);
      showSuccessToast("Has salido de la jam");
      await onActionComplete?.();
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        showErrorToast(e.message);
      } else {
        showErrorToast("No se pudo salir de la jam. Inténtalo más tarde.");
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleUpdateJam = async (updatedJamData: JamUpdateDTO) => {
    setLoadingUpdate(true);
    try {
      await updateJam(jam.id, updatedJamData);
      showSuccessToast("Jam actualizada correctamente");
      await onActionComplete?.();
      return true;
    } catch (e: unknown) {
      console.error("Error al actualizar:", e);
      if (e instanceof Error) {
        showErrorToast(e.message);
      } else {
        showErrorToast("No se pudo actualizar la jam. Inténtalo más tarde.");
      }
      return false;
    } finally {
      setLoadingUpdate(false);
    }
  };

  return {
    loadingDelete,
    loadingExpel,
    loadingUpdate,
    handleDelete,
    handleConfirmExpel,
    handleConfirmLeave,
    handleUpdateJam,
  };
};
