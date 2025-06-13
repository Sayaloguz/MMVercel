"use client";
import { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import { SmallCardAntdProps } from "../../SmallCardAntd/Delivery/interface";
import Link from "next/link";

const SmallCardTailwind: FC<SmallCardAntdProps> = ({
  game,
  alt,
  src,
  desc,
}) => {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <div
        className="relative group rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer h-full bg-gray-900"
        onClick={() => setShowModal(true)}
      >
        <div className="absolute top-2 left-2 z-10 max-w-[80%]">
          <span className="block px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm bg-black/60 rounded-lg border border-white/10 leading-snug break-words line-clamp-2">
            {game}
          </span>
        </div>

        <img
          src={src}
          alt={alt}
          className="w-full h-48 object-cover sm:h-56 md:h-64"
        />

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent py-4 flex justify-center z-10">
          <button className="px-4 py-2 text-white text-sm font-semibold border border-white/60 rounded-sm bg-black/40 backdrop-blur-sm hover:bg-[#ef4444]/60 transition">
            Más info
          </button>
        </div>
      </div>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title="Información de la Jam"
      >
        <div className="flex flex-col gap-4">
          <img src={src} alt={alt} className="rounded-md w-full" />
          <h2 className="text-lg font-semibold nonshadowed">{game}</h2>
          <p className="text-gray-700">{desc}</p>
          <div className="text-center text-sm text-gray-400">
            <Link href="/jams">Navega por Jams para más información.</Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SmallCardTailwind;
