import { Switch as BaseUISwitch } from "@base-ui/react/switch";

type SwitchProps = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

export default function Switch({ enabled, setEnabled }: SwitchProps) {
  return (
    <BaseUISwitch.Root
      checked={enabled}
      onCheckedChange={setEnabled}
      className="group inline-flex h-20 w-36 items-center rounded-full bg-gray-300 transition data-checked:bg-sky-600"
    >
      <BaseUISwitch.Thumb className="size-16 translate-x-2 rounded-full bg-white transition group-data-checked:translate-x-18" />
    </BaseUISwitch.Root>
  );
}
