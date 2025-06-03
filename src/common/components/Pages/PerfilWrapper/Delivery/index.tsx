import React, { Suspense } from "react";
import PerfilPage from "./PerfilContent";

export default function PerfilPageWrapper() {
  return (
    <Suspense
      fallback={<div className="mt-12 text-center">Cargando perfil...</div>}
    >
      <PerfilPage />
    </Suspense>
  );
}
