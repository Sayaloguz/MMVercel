"use client";

import React, { useEffect, useState } from "react";
import { Modal, Select, Spin } from "antd";
import { Jam, User } from "@/common/types/utility";
import { toast } from "react-toastify";

const { Option } = Select;

type InviteUserModalProps = {
  jam: Jam;
  currentUserId: string;
  onClose: () => void;
  onInvitationSent?: () => void;
};

export default function InviteUserModal({
  jam,
  currentUserId,
  onClose,
  onInvitationSent,
}: InviteUserModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sendingInvitation, setSendingInvitation] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch("http://localhost:8080/users/");
        if (!res.ok) throw new Error("Error cargando usuarios");
        const dataRaw: User[] = await res.json();

        const mappedUsers: User[] = dataRaw.map((u) => ({
          id: u.steamId,
          steamId: u.steamId,
          name: u.name,
          avatar: u.avatar,
        }));

        const filteredUsers = mappedUsers.filter((u) => u.id !== currentUserId);
        setUsers(filteredUsers);
      } catch {
        toast.error("No se pudieron cargar los usuarios");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  const handleInvite = async () => {
    if (!selectedUserId) {
      toast.error("Selecciona un usuario para invitar");
      return;
    }

    setSendingInvitation(true);
    try {
      const res = await fetch("http://localhost:8080/invitations/", {
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
      {loadingUsers ? (
        <Spin />
      ) : (
        <Select
          style={{ width: "100%" }}
          placeholder="Selecciona un jugador"
          value={selectedUserId}
          onChange={setSelectedUserId}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => {
            if (!option || !option.children) return false;
            return option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      )}
    </Modal>
  );
}
