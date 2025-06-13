// components/Modals/ModalPlayers.tsx
import React from "react";
import { Modal, List, Avatar, Button, Tooltip } from "antd";
import { User } from "@/common/types/utility";

type ModalPlayersProps = {
  isVisible: boolean;
  onClose: () => void;
  players: User[];
  currentUserSteamId?: string;
  isOwner: boolean;
  maxPlayersReached: boolean;
  onExpelPlayer: (steamId: string) => void;
  onOpenInviteModal: () => void;
};

// Componente para mostrar la lista de jugadores en una Jam
export default function ModalPlayers({
  isVisible,
  onClose,
  players,
  currentUserSteamId,
  isOwner,
  maxPlayersReached,
  onExpelPlayer,
  onOpenInviteModal,
}: ModalPlayersProps) {
  return (
    <Modal title="Jugadores" open={isVisible} onCancel={onClose} footer={null}>
      {isOwner && (
        <Tooltip
          title={
            maxPlayersReached ? "Ya está el máximo de jugadores permitido" : ""
          }
        >
          <Button
            type="default"
            onClick={onOpenInviteModal}
            disabled={maxPlayersReached}
            style={{ marginBottom: 16 }}
            block
          >
            Invitar jugador
          </Button>
        </Tooltip>
      )}
      <List
        dataSource={players}
        renderItem={(player: User) => {
          const isCurrentUser = currentUserSteamId === player.steamId;
          return (
            <List.Item
              key={player.steamId}
              actions={
                isOwner && !isCurrentUser
                  ? [
                      <Button
                        key={player.steamId}
                        danger
                        onClick={() => onExpelPlayer(player.steamId)}
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
}
