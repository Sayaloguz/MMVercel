import React from "react";
import { Button } from "antd";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { UserGroupIcon } from "@/common/components/CustomIcons";
import { JamCardActionsProps } from "./interface";

const JamCardActions: FC<JamCardActionsProps> = ({
  isOwner,
  onEdit,
  onDelete,
  onViewPlayers,
  onLeave,
}) => {
  if (isOwner) {
    return [
      <SettingOutlined
        key="settings"
        style={{ fontSize: 20 }}
        onClick={onEdit}
      />,
      <DeleteOutlined
        key="delete"
        style={{ fontSize: 20 }}
        onClick={onDelete}
      />,
      <UserGroupIcon
        key="group"
        style={{ fontSize: 20 }}
        onClick={onViewPlayers}
      />,
    ];
  }

  return [
    <Button danger type="primary" onClick={onLeave} key="leave-jam">
      Salir de la Jam
    </Button>,
  ];
};

export default JamCardActions;
