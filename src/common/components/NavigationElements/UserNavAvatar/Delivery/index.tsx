"use client";

import { Image } from "antd";
import Link from "next/link";
import { FC, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "@/common/components/Modals/ConfirmModalAntd/Delivery";
import logout from "../Infrastructure/sessionFunctions";
import { UserNavAvatarProps } from "./interface";

const UserNavAvatar: FC<UserNavAvatarProps> = ({ user }) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleLogoutClick = () => {
    setIsConfirmVisible(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsConfirmVisible(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Modal de confirmación */}
      <ConfirmModalAntd
        title="¿Cerrar sesión?"
        icon={<PoweroffOutlined className="text-4xl" />}
        message="¿Estás seguro de que quieres cerrar sesión?"
        open={isConfirmVisible}
        onCancel={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirmLogout}
      />

      <Link href={"perfil?id=" + user.steamId} className="flex items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <Image
            src={user.avatar}
            alt="avatar"
            width={46}
            height={46}
            className="shadowed-element rounded-full border-2 border-white group-hover:border-red-400 transition"
            preview={false}
          />
          <p
            className="shadowed-text text-white group-hover:text-red-400 transition max-w-[130px] truncate"
            title={user.name}
          >
            {user.name}
          </p>
        </div>
      </Link>
      <span
        onClick={handleLogoutClick}
        className="text-white cursor-pointer hover:text-gray-300 transition"
      >
        <PoweroffOutlined />
      </span>
    </div>
  );
};

export default UserNavAvatar;
