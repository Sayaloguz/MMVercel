export interface PlayerListModalProps {
  visible: boolean;
  onClose: () => void;
  players: User[];
  currentUser: User | null;
  isOwner: boolean;
  onExpel: (playerId: string) => void;
}
