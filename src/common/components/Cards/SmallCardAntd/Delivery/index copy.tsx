// SmallCardAntd.tsx
"use client";
import { Avatar, Button, Card, Image, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { FC, useState, useEffect } from "react";
import { SmallCardAntdProps } from "./interface";

const SmallCardAntd: FC<SmallCardAntdProps> = ({
  game,
  alt,
  src,
  user,
  desc,
}) => {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Card
        className="max-w-xs w-full h-[400px] border hover:border-slate-400 transition-all duration-500 hover:scale-105 flex flex-col justify-between"
        cover={
          <Image
            alt={alt}
            src={src}
            preview={false}
            className="h-48 w-full object-cover"
          />
        }
        actions={[
          <Button
            key="more-info"
            type="primary"
            onClick={() => setShowModal(true)}
            className="w-full"
          >
            Más info
          </Button>,
        ]}
      >
        <Meta
          avatar={<Avatar src={user} />}
          title={
            <span className="truncate block w-full" title={game}>
              {game}
            </span>
          }
          description={
            <span className="text-black text-sm overflow-hidden text-ellipsis whitespace-nowrap block">
              {desc}
            </span>
          }
        />
      </Card>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title="Información de la Jam"
      >
        <div className="flex flex-col gap-4">
          <Image alt={alt} src={src} preview={false} className="rounded-md" />
          <h2 className="text-lg font-semibold">{game}</h2>
          <p className="text-gray-700">{desc}</p>
          <div className="text-center text-sm text-gray-400">
            Navega por Jams para más información
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SmallCardAntd;
