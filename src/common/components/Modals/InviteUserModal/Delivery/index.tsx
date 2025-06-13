"use client";

import React, { useEffect, useState } from "react";
import { Modal, Select, Spin, Empty } from "antd";
import { Jam, User } from "@/common/types/utility";
import { toast } from "react-toastify";
import { API_URL } from "@/common/utils/config";

const { Option } = Select;

type InviteUserModalProps = {
  jam: Jam;
  currentUserId: string;
  onClose: () => void;
  onInvitationSent?: () => void;
};

// Modal para invitar a un usuario a una Jam
export default function InviteUserModal({
  jam,
  currentUserId,
  onClose,
  onInvitationSent,
}: InviteUserModalProps) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sendingInvitation, setSendingInvitation] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch(`${API_URL}/users/`);
        if (!res.ok) throw new Error("Error cargando usuarios");
        const dataRaw: User[] = await res.json();

        const mappedUsers: User[] = dataRaw
          .map((u) => ({
            id: u.steamId,
            steamId: u.steamId,
            name: u.name,
            avatar: u.avatar,
          }))
          .filter(
            (u) => u.id !== currentUserId && u.id !== jam.createdBy.steamId // Excluir al usuario actual y al creador de la jam
          );

        setAllUsers(mappedUsers);
      } catch {
        toast.error("No se pudieron cargar los usuarios");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [currentUserId, jam.createdBy.id]);

  // Filtro dinámico
  useEffect(() => {
    if (searchValue.length >= 2) {
      const results = allUsers.filter((u) =>
        u.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [searchValue, allUsers]);

  const handleInvite = async () => {
    if (!selectedUserId) {
      toast.error("Selecciona un usuario para invitar");
      return;
    }

    setSendingInvitation(true);
    try {
      const res = await fetch(`${API_URL}/invitations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jamId: jam.id,
          senderId: currentUserId,
          receiverId: selectedUserId,
        }),
      });

      if (!res.ok) throw new Error("Error enviando invitación");

      toast.success("Invitación enviada correctamente");
      setSelectedUserId("");
      if (onInvitationSent) onInvitationSent();
      onClose();
    } catch {
      toast.error("No se pudo enviar la invitación");
    } finally {
      setSendingInvitation(false);
    }
  };

  return (
    <Modal
      title="Invitar jugador a la Jam"
      open={true}
      onCancel={onClose}
      onOk={handleInvite}
      okText="Invitar"
      cancelText="Cancelar"
      confirmLoading={sendingInvitation}
      okButtonProps={{ disabled: !selectedUserId }}
      destroyOnHidden
    >
      <div className="min-h-[120px] p-10 flex flex-col justify-center">
        {loadingUsers ? (
          <div className="flex justify-center items-center min-h-[40px]">
            <Spin />
          </div>
        ) : (
          <Select
            style={{ width: "100%" }}
            placeholder="Escribe al menos 2 caracteres"
            value={selectedUserId || undefined}
            onChange={setSelectedUserId}
            onSearch={setSearchValue}
            showSearch
            filterOption={false}
            notFoundContent={
              searchValue.length < 2 ? (
                <div>Escribe al menos 2 caracteres</div>
              ) : (
                <Empty description="No se encontraron jugadores" />
              )
            }
          >
            {filteredUsers.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        )}
      </div>
    </Modal>
  );
}
