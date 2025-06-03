"use client";

import { FC } from "react";
import { Jam } from "@/common/types/utility";
import MisJamCardAntd from "@/common/components/Cards/MisJamsCardAntd/Delivery";

interface MisJamListProps {
  jams: Jam[];
  refreshJams?: () => Promise<void>;
  editable?: boolean;
}

const MisJamList: FC<MisJamListProps> = ({
  jams,
  refreshJams,
  editable = true,
}) => {
  const handleActionComplete = async () => {
    if (refreshJams) {
      await refreshJams();
    }
  };

  if (jams.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No hay jams en esta sección todavía
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-10">
      {jams.map((jam) => (
        <MisJamCardAntd
          key={jam.id}
          jam={jam}
          onActionComplete={handleActionComplete}
          editable={editable}
        />
      ))}
    </div>
  );
};

export default MisJamList;
