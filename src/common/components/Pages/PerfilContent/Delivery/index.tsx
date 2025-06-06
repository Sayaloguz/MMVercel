"use client";

import { useSearchParams } from "next/navigation";
import PerfilCardAntd from "@/common/components/Cards/PerfilCardAntd/Delivery";
import InvitacionesCard from "@/common/components/Cards/InvitacionesCard/Delivery";
import { useUserProfile } from "@/common/hooks/useUserProfile";
import { useAuth } from "@/common/hooks/useAuth";
import { Skeleton } from "antd";

export default function PerfilContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { usuario, error, cargando } = useUserProfile(id || undefined);
  const { user: authUser, loading: authLoading } = useAuth();

  if (cargando || authLoading) {
    return (
      <div className="w-1/2 mx-auto mt-12">
        <Skeleton avatar paragraph={{ rows: 3 }} active />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-12">{error}</p>;
  }

  if (!usuario) {
    return <p className="text-center mt-12">No se encontró el usuario.</p>;
  }

  const esPropietarioPerfil = authUser?.steamId === usuario.steamId;

  return (
    <div className="w-4/5 mx-auto mt-12">
      <PerfilCardAntd user={usuario} />
      <div className="p-4" />
      {esPropietarioPerfil && <InvitacionesCard />}
    </div>
  );
}
