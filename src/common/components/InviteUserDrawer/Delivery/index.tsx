"use client";

import React, { useEffect, useState } from "react";
import { Drawer, Select, Button, message, Spin } from "antd";
import { Jam, User } from "@/common/types/utility";
import { toast } from "react-toastify";

const { Option } = Select;

type InviteUserDrawerProps = {
  jam: Jam;
  currentUserId: string;
  open: boolean;
  onClose: () => void;
  onInvitationSent?: () => void;
};

export default function InviteUserDrawer({
  jam,
  currentUserId,
  open,
  onClose,
  onInvitationSent,
}: InviteUserDrawerProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sendingInvitation, setSendingInvitation] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch("http://localhost:8080/users/");
        if (!res.ok) throw new Error("Error cargando usuarios");
        const dataRaw: any[] = await res.json();

        const mappedUsers: User[] = dataRaw.map((u) => ({
          id: u.steamId,
          steamId: u.steamId,
          name: u.name,
          avatar: u.avatar,
        }));

        const filteredUsers = mappedUsers.filter((u) => u.id !== currentUserId);

        setUsers(filteredUsers);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("No se pudieron cargar los usuarios");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [open, currentUserId]);

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
    <Drawer
      title="Invitar jugador a la Jam"
      placement="right"
      onClose={onClose}
      open={open}
      width={360}
      destroyOnClose
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button
            type="primary"
            onClick={handleInvite}
            loading={sendingInvitation}
            disabled={!selectedUserId}
          >
            Invitar
          </Button>
        </div>
      }
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
    </Drawer>
  );
}
