import { FC } from "react";
import { Avatar, Button } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  TrophyOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { PerfilCardAntdProps } from "./interface";
import PerfilActions from "./Infrastructure/perfilActions";

// Componente de tarjeta de perfil
const PerfilCardAntd: FC<PerfilCardAntdProps> = ({ user, profileUrl }) => {
  const steamProfileUrl =
    profileUrl ?? `https://steamcommunity.com/profiles/${user.steamId}`;

  const stats = [
    {
      label: "Jams creadas",
      value: user.stats?.jamsCreadas ?? 5,
      icon: <CalendarOutlined />,
    },
    {
      label: "Jams jugadas",
      value: user.stats?.jamsJugadas ?? 12,
      icon: <TeamOutlined />,
    },
    {
      label: "Logros ganados",
      value: user.stats?.logros ?? 28,
      icon: <TrophyOutlined />,
    },
  ];

  return (
    <div className="bg-[#1c2331] text-white rounded-2xl shadow-xl border border-gray-700 w-full max-w-3xl mx-auto p-6 sm:p-8 px-4 sm:px-8 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0 rounded-full border-4 border-white-600 p-1">
          <Avatar
            size={100}
            src={user.avatar}
            alt={user.name}
            className="rounded-full"
          />
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold flex items-center gap-2 mb-1">
            <UserOutlined className="shadowed-element" />
            <span className="break-words whitespace-normal">{user.name}</span>
          </h2>

          <p className="text-sm my-4 text-gray-400 flex items-start gap-1 break-words whitespace-normal leading-tight">
            <IdcardOutlined className="mt-0.5" />
            <span>Steam ID: {user.steamId}</span>
          </p>
        </div>
      </div>

      {/* Título de estadísticas */}
      <h3 className="text-lg font-semibold !text-gray-200 mt-8 mb-4">
        Estadísticas (de mentira)
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#2a3242] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm"
          >
            <div className="text-red-200 text-lg">{stat.icon}</div>
            <div>
              <div className="font-semibold text-white">{stat.value}</div>
              <div className="text-xs">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones abajo a la derecha */}
      <div className="flex flex-wrap justify-end gap-2 mt-6">
        <Button
          href={steamProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white border-none px-5 py-1.5 rounded-lg font-semibold"
        >
          Ver perfil en Steam
        </Button>
        <PerfilActions steamId={user.steamId} />
      </div>
    </div>
  );
};

export default PerfilCardAntd;
