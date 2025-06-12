import React, { FC, useState } from "react";
import { Avatar, Button, Tag, Tooltip } from "antd";
import {
  DeleteOutlined,
  SettingOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserGroupIcon } from "@/common/components/CustomIcons";
import ModalJam from "../../../Modals/ModalJamSettings/Delivery";
import InviteUserModal from "@/common/components/Modals/InviteUserModal/Delivery";

import ModalPlayers from "@/common/components/Modals/ModalPlayers/Delivery";
import ConfirmExpelPlayerModal from "@/common/components/Modals/ConfirmExpelPlayerModal/Delivery";
import ConfirmLeaveJamModal from "@/common/components/Modals/ConfirmLeaveJamModal/Delivery";

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
import ConfirmDeleteJamModal from "@/common/components/Modals/ConfirmDeleteModal/Delivery";

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
      {/* Card principal */}
      <div className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] w-xl mx-auto my-1 border-gray-700 border-2">
        {/* Cabecera */}
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
        </div>

        {/* Cuerpo */}
        <div className="bg-white p-4 space-y-2">
          <div className="flex items-center justify-start gap-4 text-sm text-gray-600 font-medium mb-1 flex-wrap">
            {!isOwner && (
              <Link href={`/perfil?id=${createdBy.steamId}`}>
                <div className="flex items-center gap-2 text-gray-900 hover:underline hover:text-red-600 cursor-pointer">
                  <Avatar src={createdBy.avatar} />
                  <span>
                    {(createdBy.name || "Creador").length > 18
                      ? (createdBy.name || "Creador").slice(0, 15) + "..."
                      : createdBy.name || "Creador"}
                  </span>
                </div>
              </Link>
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
              {!isOwner && (
                <div className="flex items-center gap-1 font-bold">
                  <UserOutlined className="text-[14px]" />
                  <span>
                    {jam.players.length}/{jam.maxPlayers}
                  </span>
                </div>
              )}
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

      {/* Modales secundarios */}
      <ModalJam
        isVisible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onUpdate={handleUpdateJam}
        players={players?.length || 0}
        jamData={jam}
        isLoading={loadingUpdate}
      />

      <ConfirmDeleteJamModal
        isVisible={isConfirmDeleteVisible}
        onCancel={() => setIsConfirmDeleteVisible(false)}
        onConfirm={() =>
          handleDelete().then(() => setIsConfirmDeleteVisible(false))
        }
        loading={loadingDelete}
      />

      <ConfirmExpelPlayerModal
        playerSteamId={playerToExpel}
        onCancel={() => setPlayerToExpel(null)}
        onConfirm={() =>
          playerToExpel
            ? handleConfirmExpel(playerToExpel).then(() =>
                setPlayerToExpel(null)
              )
            : Promise.resolve()
        }
        loading={loadingExpel}
      />

      <ConfirmLeaveJamModal
        isVisible={isConfirmLeaveVisible}
        onCancel={() => setIsConfirmLeaveVisible(false)}
        onConfirm={() =>
          handleConfirmLeave().then(() => setIsConfirmLeaveVisible(false))
        }
        loading={loadingDelete}
      />

      <ModalPlayers
        isVisible={isPlayersModalVisible}
        onClose={() => setIsPlayersModalVisible(false)}
        players={players}
        currentUserSteamId={currentUser?.steamId}
        isOwner={isOwner}
        maxPlayersReached={maxPlayersReached}
        onExpelPlayer={setPlayerToExpel}
        onOpenInviteModal={() => setIsInviteModalVisible(true)}
      />

      {isInviteModalVisible && currentUser && (
        <InviteUserModal
          jam={jam}
          currentUserId={currentUser.steamId}
          onClose={() => setIsInviteModalVisible(false)}
          onInvitationSent={() => {}}
        />
      )}
    </>
  );
};

export default MisJamCardAntd;
