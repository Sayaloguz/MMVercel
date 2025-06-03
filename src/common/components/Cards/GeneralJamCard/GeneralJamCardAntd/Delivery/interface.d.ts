import { Jam, User } from "@/common/types/utility";

export interface GeneralJamCardProps {
  jam: Jam;
  currentUser: User | null;
  jwtValid: boolean;
  onJoinLeaveJam: (jam: Jam) => Promise<void>;
}
