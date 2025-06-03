import { Jam } from "@/common/types/utility";

interface ModalJamProps {
  isVisible: boolean;
  onCancel: () => void;
  onUpdate: (jam: Jam) => void;
  players: number;
  jamData: {
    date?: string;
    time?: string;
    maxPlayers?: number;
    [key: string]: unknown;
  };
}
