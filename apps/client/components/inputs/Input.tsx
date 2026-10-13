import { Input as BaseUIInput } from "@base-ui/react/input";

type InputProps = {
  value?: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder?: string;
};

export default function Input({
  value,
  onValueChange,
  label,
  placeholder,
}: InputProps) {
  return (
    <label className="flex flex-col items-start gap-1">
      <span className="font-semibold">{label}</span>
      <BaseUIInput
        className="bg-white px-8 py-8 text-md placeholder:text-neutral-500"
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
      />
    </label>
  );
}
