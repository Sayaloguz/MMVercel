"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import { useAuth } from "@/common/hooks/useAuth";
import logout from "@/common/components/NavigationElements/UserNavAvatar/Infrastructure/sessionFunctions";
import { toast } from "react-toastify";

interface PerfilActionsProps {
  steamId: string;
}

const PerfilActions = ({ steamId }: PerfilActionsProps) => {
  const { user: authUser } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOwner = authUser?.steamId === steamId;
  if (!isOwner) return null;

  const handleActualizar = async () => {
    try {
      const res = await fetch(`http://localhost:8080/users/${steamId}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error();
      toast.success("Datos actualizados correctamente");
    } catch {
      toast.error("Error al actualizar los datos");
    }
  };

  const handleBorrar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/users/${steamId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      toast.success("Cuenta borrada correctamente");
      await logout(); // 👈 Cierra sesión y recarga
    } catch {
      toast.error("No se pudo borrar la cuenta");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Button
        onClick={handleActualizar}
        className="bg-green-600 hover:bg-green-700 text-white border-none px-4 py-1.5 rounded-lg font-semibold"
      >
        Actualizar datos
      </Button>

      <Button
        danger
        onClick={() => setModalVisible(true)}
        className="px-4 py-1.5 rounded-lg font-semibold"
      >
        Borrar mi cuenta
      </Button>

      <Modal
        title="¿Estás seguro?"
        open={modalVisible}
        confirmLoading={loading}
        onOk={handleBorrar}
        onCancel={() => setModalVisible(false)}
        okText="Sí, borrar"
        cancelText="Cancelar"
      >
        <p>
          Esta acción eliminará todos tus datos de forma permanente y cerrará tu
          sesión. ¿Estás seguro?
        </p>
      </Modal>
    </div>
  );
};

export default PerfilActions;
