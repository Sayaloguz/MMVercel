import React, { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "@/common/components/Modals/ConfirmModalAntd/Delivery";
import { ConfirmExpelModalProps } from "./interface";

// Componente para confirmar la expulsión de un jugador
const ConfirmExpelModal: FC<ConfirmExpelModalProps> = ({
  visible,
  loading,
  onCancel,
  onConfirm,
}) => (
  <ConfirmModalAntd
    title="¿Expulsar jugador/a?"
    icon={<DeleteOutlined className="text-4xl" />}
    message="¿Estás seguro/a de que quieres expulsar a este jugador/a?"
    open={visible}
    confirmLoading={loading}
    onCancel={onCancel}
    onConfirm={onConfirm}
  />
);

export default ConfirmExpelModal;
