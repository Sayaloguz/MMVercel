import { FC, useState } from "react";
import { Avatar, Tag } from "antd";
import dayjs from "dayjs";
import { FullInvitation } from "@/common/types/utility";
import {
  durationMap,
  gameModeMap,
  languageMap,
  voiceModeMap,
} from "@/common/utils/mappers";
import Link from "next/link";

interface InvitacionProps {
  invitation: FullInvitation;
  onAceptar: () => Promise<boolean>;
  onRechazar: () => Promise<boolean>;
  onRemove: () => void;
}

const Invitacion: FC<InvitacionProps> = ({
  invitation,
  onAceptar,
  onRechazar,
  onRemove,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    sender,
    jam,
    invitation: { sentDate },
  } = invitation;

  const fechaFormateada = dayjs(sentDate).format("DD/MM/YYYY [a las] HH:mm");

  const handleAceptarClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const success = await onAceptar();
      if (success) {
        setIsRemoving(true);
        setTimeout(() => {
          onRemove();
        }, 300);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRechazarClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const success = await onRechazar();
      if (success) {
        setIsRemoving(true);
        setTimeout(() => {
          onRemove();
        }, 300);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-[#2a3242] rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-sm transition-all duration-300 ease-in-out
    ${
      isRemoving
        ? "opacity-0 max-h-0 p-0 overflow-hidden"
        : "opacity-100 max-h-[999px]"
    }
  `}
      style={{ transitionProperty: "opacity, max-height, padding" }}
    >
      <div className="flex-shrink-0 self-center sm:self-start">
        <Avatar size={48} src={sender.avatar} className="rounded-full" />
      </div>

      <div className="flex-1 text-white w-full">
        <p className="text-sm sm:text-base">
          <span className="text-red font-semibold">
            <Link
              href={`/perfil?id=${sender.steamId}`}
              className="hover:underline"
            >
              {sender.name}
            </Link>
          </span>{" "}
          te ha invitado el{" "}
          <span className="text-red-300 font-semibold">{fechaFormateada}</span>{" "}
          a unirte a la Jam{" "}
          <span className="text-red-300 font-semibold">{jam.title}</span> para
          jugar a{" "}
          <span className="text-red-300 font-semibold">{jam.game?.name}</span>,
          ¿te apuntas?
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between justify-center mt-2">
          <div className="flex flex-wrap mt-1 gap-1 justify-center sm:justify-start">
            <Tag
              color="red"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {gameModeMap[jam.gameMode]}
            </Tag>
            <Tag
              color="blue"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {voiceModeMap[jam.voiceMode]}
            </Tag>
            <Tag
              color="orange"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {languageMap[jam.language]}
            </Tag>
            <Tag
              color="green"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {durationMap[jam.duration]}
            </Tag>
          </div>

          <div className="flex gap-3 flex-wrap justify-center sm:justify-end mt-2 sm:mt-0">
            <button
              type="button"
              className="bg-black p-2 px-4 border-gray-500 border-2 rounded-xl hover:bg-red-900 transition min-w-[100px] "
              onClick={handleRechazarClick}
              disabled={loading || isRemoving}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="bg-green-600/70 p-2 px-4 border-gray-500 border-2 rounded-xl hover:bg-green-600 transition min-w-[100px]"
              onClick={handleAceptarClick}
              disabled={loading || isRemoving}
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
