"use client";

import PerfilCardAntd from "@/common/components/Cards/PerfilCardAntd/Delivery";
import { useUserProfile } from "@/common/hooks/useUserProfile";
import { Skeleton } from "antd";

export default function PerfilPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { usuario, error, cargando } = useUserProfile(searchParams.id);

  if (cargando)
    return (
      <div className="w-1/2 mx-auto mt-12">
        <Skeleton avatar paragraph={{ rows: 3 }} active />
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-12">{error}</p>;

  if (!usuario)
    return <p className="text-center mt-12">No se encontró el usuario.</p>;

  return (
    <div className="w-4/5 mx-auto mt-12">
      <PerfilCardAntd user={usuario} />
    </div>
  );
}
