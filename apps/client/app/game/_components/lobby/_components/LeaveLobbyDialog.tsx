import Button from "@/components/Button";
import Dialog from "@/components/Dialog";

type LeaveLobbyDialogProps = {
  onLeave: () => void;
  onClose: () => void;
};

export default function LeaveLobbyDialog({
  onLeave,
  onClose,
}: LeaveLobbyDialogProps) {
  return (
    <Dialog title="Quitter la partie" onClose={onClose}>
      <div>
        Si vous quittez une partie en cours, vous ne pourrez plus revenir.
      </div>
      <Button onClick={onLeave}>Confirmer</Button>
    </Dialog>
  );
}
