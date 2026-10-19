import { Switch as BaseUISwitch } from "@base-ui/react/switch";
import clsx from "clsx";

type SwitchProps = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  disabled?: boolean;
};

export default function Switch({ enabled, setEnabled, disabled }: SwitchProps) {
  return (
    <BaseUISwitch.Root
      checked={enabled}
      onCheckedChange={setEnabled}
      className={clsx(
        "group inline-flex h-20 w-36 items-center rounded-full bg-gray-300 transition data-checked:bg-sky-600",
        !disabled && "cursor-pointer",
      )}

      disabled={disabled}
    >
      <BaseUISwitch.Thumb className="size-16 translate-x-2 rounded-full bg-white transition group-data-checked:translate-x-18" />
    </BaseUISwitch.Root>
  );
}
