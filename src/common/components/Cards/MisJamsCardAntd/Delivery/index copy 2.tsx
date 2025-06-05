import React, { FC, useState } from "react";
import { Avatar, Modal, List, Button, Tag, Tooltip } from "antd";
import {
  DeleteOutlined,
  SettingOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { UserGroupIcon } from "@/common/components/CustomIcons";
import ModalJam from "../../../Modals/ModalJamSettings/Delivery";
import ConfirmModalAntd from "../../../Modals/ConfirmModalAntd/Delivery";
import { User } from "@/common/types/utility";
import { useAuth } from "@/common/hooks/useAuth";
import { MisJamCardAntdProps } from "./interface";
import { useJamActions } from "../Infrastructure/useJamActions";
import dayjs from "dayjs";
import Link from "next/link";
import {
  durationMap,
  gameModeMap,
  languageMap,
  voiceModeMap,
} from "@/common/utils/mappers";

import InviteUserModal from "../../../Modals/InviteUserModal/Delivery";

const MisJamCardAntd: FC<MisJamCardAntdProps> = ({ jam, onActionComplete }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
  const [isPlayersModalVisible, setIsPlayersModalVisible] = useState(false);
  const [isConfirmLeaveVisible, setIsConfirmLeaveVisible] = useState(false);
  const [playerToExpel, setPlayerToExpel] = useState<string | null>(null);

  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

  const { user: currentUser } = useAuth();
  const { game, description, maxPlayers, players, createdBy } = jam;

  const isOwner = currentUser?.steamId === createdBy.steamId;
  const maxPlayersReached = players.length >= maxPlayers;

  const {
    loadingDelete,
    loadingExpel,
    loadingUpdate,
    handleDelete,
    handleConfirmExpel,
    handleConfirmLeave,
    handleUpdateJam,
  } = useJamActions({
    jam,
    onActionComplete,
    currentUserId: currentUser?.steamId,
  });

  return (
    <>
      <div className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] max-w-xl mx-auto my-1 ">
        {/* Cabecera card */}
        <div className="relative w-full h-60 overflow-hidden rounded-t-2xl">
          <img
            src={game?.headerImage}
            alt={game?.name}
            className="object-cover w-full h-full"
          />

          <div className="absolute top-3 left-3 bg-gray-900/60 border border-white/20 text-white text-sm font-semibold px-3 py-1 rounded-sm shadow-sm backdrop-blur-sm">
            {jam.game?.name}
          </div>

          <div className="absolute bottom-0 left-0 font-bold w-full bg-gradient-to-t from-black/80 to-transparent p-2 flex flex-wrap gap-1">
            <Tag color="red">{gameModeMap[jam.gameMode]}</Tag>
            <Tag color="blue">{voiceModeMap[jam.voiceMode]}</Tag>
            <Tag color="orange">{languageMap[jam.language]}</Tag>
            <Tag color="green">{durationMap[jam.duration]}</Tag>
          </div>

          <p className="text-gray-700 mb-4">{description}</p>
        </div>

        {/* Cuerpo card */}
        <div className="bg-white p-4 space-y-2">
          <div className="flex items-center justify-start gap-4 text-sm text-gray-600 font-medium mb-1 flex-wrap">
            {!isOwner && (
              <div className="flex items-center gap-3">
                <Link href={`/perfil/${createdBy.steamId}`}>
                  <div className="flex items-center gap-2 text-gray-900 hover:underline hover:text-red-600 cursor-pointer">
                    <Avatar src={createdBy.avatar} />
                    <span>{createdBy.name || "Creador"}</span>
                  </div>
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <div className="flex items-center gap-1 font-bold">
                <CalendarOutlined className="text-[14px]" />
                <span>{dayjs(jam.jamDate).format("DD/MM/YYYY")}</span>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <ClockCircleOutlined className="text-[14px]" />
                <span>{jam.jamTime}</span>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-2" />

          <h2 className="text-md font-semibold mb-2 nonshadowed">
            {jam.title}
          </h2>
          <p className="text-gray-600">{description}</p>
          <div className="border-b border-gray-300 my-2" />

          {/* Acciones */}
          <div className="flex justify-end gap-3 mt-4 flex-wrap items-center">
            {isOwner ? (
              <>
                <Button
                  icon={<SettingOutlined />}
                  onClick={() => setIsEditModalVisible(true)}
                >
                  <span className="hidden md:inline">Editar Jam</span>
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setIsConfirmDeleteVisible(true)}
                >
                  <span className="hidden md:inline">Eliminar Jam</span>
                </Button>

                <Button
                  icon={<UserGroupIcon className="text-xl" />}
                  onClick={() => setIsPlayersModalVisible(true)}
                >
                  <span className="hidden md:inline"> Participantes</span> (
                  {players?.length || 0}/{maxPlayers})
                </Button>
              </>
            ) : (
              <>
                <Button
                  danger
                  type="primary"
                  onClick={() => setIsConfirmLeaveVisible(true)}
                >
                  Salir de la Jam
                </Button>

                {/* Botón Invitar jugador junto a Salir de la Jam */}
                <Tooltip
                  title={
                    maxPlayersReached
                      ? "Ya está el máximo de jugadores permitido"
                      : ""
                  }
                >
                  <Button
                    type="default"
                    onClick={() => setIsInviteModalVisible(true)}
                    disabled={maxPlayersReached}
                    style={{ marginLeft: 8 }}
                  >
                    Invitar jugador
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalJam
        isVisible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onUpdate={handleUpdateJam}
        players={players?.length || 0}
        jamData={jam}
        isLoading={loadingUpdate}
      />

      <ConfirmModalAntd
        title="¿Eliminar Jam?"
        icon={<DeleteOutlined className="text-4xl" />}
        message="Vas a eliminar la jam seleccionada y no se va a poder deshacer. ¿Estás seguro/a?"
        open={isConfirmDeleteVisible}
        confirmLoading={loadingDelete}
        onCancel={() => setIsConfirmDeleteVisible(false)}
        onConfirm={() => {
          handleDelete().then(() => setIsConfirmDeleteVisible(false));
        }}
      />

      <ConfirmModalAntd
        title="¿Expulsar jugador/a?"
        icon={<DeleteOutlined className="text-4xl" />}
        message="¿Estás seguro/a de que quieres expulsar a este jugador/a?"
        open={playerToExpel !== null}
        confirmLoading={loadingExpel}
        onCancel={() => setPlayerToExpel(null)}
        onConfirm={() => {
          if (playerToExpel) {
            handleConfirmExpel(playerToExpel).then(() =>
              setPlayerToExpel(null)
            );
          }
        }}
      />

      <ConfirmModalAntd
        title="¿Salir de la Jam?"
        icon={<UserGroupIcon className="text-4xl" />}
        message="¿Seguro/a que quieres salir? Si te quieres unir de nuevo, tendrás que volver a solicitarlo y puede ser que te quedes sin sitio."
        open={isConfirmLeaveVisible}
        confirmLoading={loadingDelete}
        onCancel={() => setIsConfirmLeaveVisible(false)}
        onConfirm={() => {
          handleConfirmLeave().then(() => setIsConfirmLeaveVisible(false));
        }}
      />

      <Modal
        title="Jugadores"
        open={isPlayersModalVisible}
        onCancel={() => setIsPlayersModalVisible(false)}
        footer={null}
      >
        {/* Botón Invitar jugador dentro del modal "Jugadores" */}
        {isOwner && (
          <Tooltip
            title={
              maxPlayersReached
                ? "Ya está el máximo de jugadores permitido"
                : ""
            }
          >
            <Button
              type="default"
              onClick={() => setIsInviteModalVisible(true)}
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
                          onClick={() => setPlayerToExpel(player.steamId)}
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

      {/* Modal de invitar jugador */}
      {isInviteModalVisible && currentUser && (
        <InviteUserModal
          jam={jam}
          currentUserId={currentUser.steamId}
          onClose={() => setIsInviteModalVisible(false)}
          onInvitationSent={() => {
            // Aquí puedes refrescar o hacer algo tras enviar invitación
          }}
        />
      )}
    </>
  );
};

export default MisJamCardAntd;
