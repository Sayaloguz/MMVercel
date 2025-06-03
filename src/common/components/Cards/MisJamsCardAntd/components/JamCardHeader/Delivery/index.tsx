"use client";

import React, { FC } from "react";
import { Avatar, Typography, Tag } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { JamCardHeaderProps } from "./interface";

const { Title, Text, Paragraph } = Typography;

const JamCardHeader: FC<JamCardHeaderProps> = ({
  avatar,
  description,
  jamDate,
  jamTime,
  maxPlayers,
  playersCount,
  jamTitle,
  gameTitle,
}) => {
  return (
    <div className="space-y-2">
      {/* Título del juego */}
      <Title level={3} className="text-center text-blue-700">
        {gameTitle}
      </Title>

      {/* Avatar + Título de la Jam */}
      <div className="flex items-center gap-3">
        <Avatar size={40} src={avatar} />
        <Title level={4} className="mb-0">
          {jamTitle}
        </Title>
      </div>

      {/* Descripción */}
      <Paragraph className="text-gray-700" ellipsis={{ rows: 2 }}>
        {description}
      </Paragraph>

      {/* Fecha y hora */}
      <div className="flex items-center gap-3 text-gray-500 text-sm">
        <CalendarOutlined />
        <Text>{jamDate}</Text>
        <ClockCircleOutlined />
        <Text>{jamTime}</Text>
      </div>

      {/* Participantes */}
      <div className="flex items-center gap-2 text-sm mt-1">
        <UserOutlined />
        <Tag color="blue">
          {playersCount}/{maxPlayers} jugadores
        </Tag>
      </div>
    </div>
  );
};

export default JamCardHeader;
