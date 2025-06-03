export interface JamCardActionsProps {
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onViewPlayers: () => void;
  onLeave: () => void;
}
