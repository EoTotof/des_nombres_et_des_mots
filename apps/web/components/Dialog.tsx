import { ReactNode } from "react";
import { Dialog as BaseUIDialog } from "@base-ui/react/dialog";

type DialogProps = {
  isOpen?: boolean;
  onClose?: () => void;
  title: ReactNode;
  children?: ReactNode;
};

export default function Dialog({
  isOpen = true,
  onClose,
  title,
  children,
}: DialogProps) {
  return (
    <BaseUIDialog.Root open={isOpen} onOpenChange={onClose}>
      <BaseUIDialog.Portal>
        <BaseUIDialog.Backdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-16">
          <BaseUIDialog.Popup className="container bg-sky-100 space-y-16 p-16 rounded-lg shadow-xl">
            <BaseUIDialog.Title className="text-3xl">
              {title}
            </BaseUIDialog.Title>
            {children}
          </BaseUIDialog.Popup>
        </div>
      </BaseUIDialog.Portal>
    </BaseUIDialog.Root>
  );
}
