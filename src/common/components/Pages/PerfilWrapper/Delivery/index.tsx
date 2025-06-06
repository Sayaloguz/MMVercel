"use client";

import { Suspense } from "react";
import PerfilContent from "../../PerfilContent/Delivery";

export default function PerfilWrapper() {
  return (
    <Suspense>
      <PerfilContent />
    </Suspense>
  );
}
