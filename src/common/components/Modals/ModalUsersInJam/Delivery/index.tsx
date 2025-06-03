"use client";

import React from "react";
import { Modal, Avatar, Button, List, message } from "antd";

interface User {
  id: string;
  username: string;
  avatar: string;
}

interface ModalUsersInJamProps {
  visible: boolean;
  onClose: () => void;
  participants: User[];
  onRemoveUser: (userId: string) => void;
}

const ModalUsersInJam: React.FC<ModalUsersInJamProps> = ({
  visible,
  onClose,
  participants,
  onRemoveUser,
}) => {
  const handleRemove = (userId: string) => {
    onRemoveUser(userId);
    message.success("Usuario eliminado de la jam");
  };

  return (
    <Modal
      title="Participantes en la Jam"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={participants}
        rowKey={(user) => user.id}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button
                danger
                key={`remove-${user.id}`}
                onClick={() => handleRemove(user.id)}
              >
                Eliminar
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.avatar || undefined} />}
              title={user.username}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ModalUsersInJam;
