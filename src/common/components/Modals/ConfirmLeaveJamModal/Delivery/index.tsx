// components/Modals/ConfirmLeaveJamModal.tsx
import React from "react";
import ConfirmModalAntd from "../../../Modals/ConfirmModalAntd/Delivery";
import { UserGroupIcon } from "@/common/components/CustomIcons";

type ConfirmLeaveJamModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
};

// Componente para confirmar la salida de una Jam
export default function ConfirmLeaveJamModal({
  isVisible,
  onCancel,
  onConfirm,
  loading,
}: ConfirmLeaveJamModalProps) {
  return (
    <ConfirmModalAntd
      title="¿Salir de la Jam?"
      icon={<UserGroupIcon className="text-4xl" />}
      message="¿Seguro/a que quieres salir? Si te quieres unir de nuevo, tendrás que volver a solicitarlo y puede ser que te quedes sin sitio."
      open={isVisible}
      confirmLoading={loading}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
