// components/Modals/ConfirmExpelPlayerModal.tsx
import React from "react";
import ConfirmModalAntd from "../../../Modals/ConfirmModalAntd/Delivery";
import { DeleteOutlined } from "@ant-design/icons";

type ConfirmExpelPlayerModalProps = {
  playerSteamId: string | null;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
};

// Componente para confirmar la expulsión de un jugador
export default function ConfirmExpelPlayerModal({
  playerSteamId,
  onCancel,
  onConfirm,
  loading,
}: ConfirmExpelPlayerModalProps) {
  return (
    <ConfirmModalAntd
      title="¿Expulsar jugador/a?"
      icon={<DeleteOutlined className="text-4xl" />}
      message="¿Estás seguro/a de que quieres expulsar a este jugador/a?"
      open={playerSteamId !== null}
      confirmLoading={loading}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
