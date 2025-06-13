// components/Modals/ConfirmDeleteJamModal.tsx
import React from "react";
import ConfirmModalAntd from "../../../Modals/ConfirmModalAntd/Delivery";
import { DeleteOutlined } from "@ant-design/icons";

type ConfirmDeleteJamModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
};

// Componente para confirmar la eliminación de una Jam
export default function ConfirmDeleteJamModal({
  isVisible,
  onCancel,
  onConfirm,
  loading,
}: ConfirmDeleteJamModalProps) {
  return (
    <ConfirmModalAntd
      title="¿Eliminar Jam?"
      icon={<DeleteOutlined className="text-4xl" />}
      message="Vas a eliminar la jam seleccionada y no se va a poder deshacer. ¿Estás seguro/a?"
      open={isVisible}
      confirmLoading={loading}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
