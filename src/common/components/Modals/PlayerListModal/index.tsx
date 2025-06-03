import React, { FC } from "react";
import { Modal, List, Avatar, Button } from "antd";
import { User } from "@/common/types/utility";
import { PlayerListModalProps } from "./interface";

const PlayerListModal: FC<PlayerListModalProps> = ({
  visible,
  onClose,
  players,
  currentUser,
  isOwner,
  onExpel,
}) => {
  return (
    <Modal title="Jugadores" open={visible} onCancel={onClose} footer={null}>
      <List
        dataSource={players}
        renderItem={(player: User) => {
          const isCurrentUser = currentUser?.steamId === player.steamId;
          return (
            <List.Item
              key={player.steamId}
              actions={
                isOwner && !isCurrentUser
                  ? [
                      <Button
                        key={player.steamId}
                        danger
                        onClick={() => onExpel(player.steamId)}
                      >
                        Expulsar
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={player.avatar} />}
                title={isCurrentUser ? "Tú" : player.name}
              />
            </List.Item>
          );
        }}
      />
    </Modal>
  );
};

export default PlayerListModal;
