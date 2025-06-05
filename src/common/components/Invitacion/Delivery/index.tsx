"use client";

import { FC } from "react";
import { Avatar, Tag } from "antd";
import dayjs from "dayjs";
import { FullInvitation } from "@/common/types/utility";
import {
  durationMap,
  gameModeMap,
  languageMap,
  voiceModeMap,
} from "@/common/utils/mappers";
import {
  handleAceptar,
  handleRechazar,
} from "../Infrastructure/invitacionHandlers";

interface InvitacionProps {
  invitation: FullInvitation;
  onChange?: () => void;
  aceptarInvitacion: (jamId: string) => Promise<boolean>;
  rechazarInvitacion: (invId: string) => Promise<boolean>;
}

const Invitacion: FC<InvitacionProps> = ({
  invitation,
  onChange,
  aceptarInvitacion,
  rechazarInvitacion,
}) => {
  const {
    sender,
    jam,
    invitation: { sentDate, invId, jamId },
  } = invitation;

  const fechaFormateada = dayjs(sentDate).format("DD/MM/YYYY [a las] HH:mm");

  const onAceptarClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Aceptar clic, no debería recargar");
    await handleAceptar(
      jamId,
      invId,
      aceptarInvitacion,
      rechazarInvitacion,
      onChange
    );
  };

  const onRechazarClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Rechazar clic, no debería recargar");
    await handleRechazar(invId, rechazarInvitacion, onChange);
  };

  return (
    <div className="bg-[#2a3242] rounded-lg px-4 py-3 flex items-start gap-4 shadow-sm">
      <Avatar
        size={48}
        src={sender.avatar}
        className="rounded-full self-center mt-1"
      />
      <div className="flex-1 text-white">
        <p>
          <span className="text-red font-semibold">{sender.name}</span> te ha
          invitado el{" "}
          <span className="text-red-300 font-semibold">{fechaFormateada}</span>{" "}
          a unirte a la Jam{" "}
          <span className="text-red-300 font-semibold">{jam.title}</span> para
          jugar a{" "}
          <span className="text-red-300 font-semibold">{jam.game?.name}</span>,
          ¿te apuntas?
        </p>
        <div className="flex flex-wrap justify-between mt-2 p-2">
          <div>
            <Tag color="red">{gameModeMap[jam.gameMode]}</Tag>
            <Tag color="blue">{voiceModeMap[jam.voiceMode]}</Tag>
            <Tag color="orange">{languageMap[jam.language]}</Tag>
            <Tag color="green">{durationMap[jam.duration]}</Tag>
          </div>
          <div className="gap-3 flex items-center">
            <button
              type="button"
              className="bg-black p-2 px-4 border-gray-500 border-2 rounded-xl hover:bg-red-900 transition min-w-[100px] min-h-[45px]"
              onClick={onRechazarClick}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="bg-green-600/70 p-2 px-4 border-gray-500 border-2 rounded-xl hover:bg-green-600 transition min-w-[100px] min-h-[40px]"
              onClick={onAceptarClick}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitacion;
