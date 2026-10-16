import { breakpoints } from "@/lib/tailwind";
import { Slider as BaseUISlider } from "@base-ui/react/slider";
import { useWindowSize } from "@react-hookz/web";

type SliderProps<T> = {
  label: React.ReactNode;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  disabled?: boolean;
};

export default function Slider<T>({
  label,
  value,
  options,
  onChange,
  disabled,
}: SliderProps<T>) {
  const { width: windowWidth } = useWindowSize();

  const currentIndex = options.findIndex((option) => option.value === value);

  return (
    <BaseUISlider.Root
      min={0}
      max={options.length - 1}
      step={1}
      value={currentIndex}
      onValueChange={(index) => {
        if (!options[index]) {
          throw Error("Options index out of range");
        }
        onChange(options[index].value);
      }}
      className={"flex-1 md:flex md:items-center"}
      disabled={disabled}
    >
      <BaseUISlider.Label className="mb-2 md:w-280 md:mb-0">
        {label}
        {windowWidth < breakpoints.md
          ? ` - ${options[currentIndex]?.label}`
          : null}
      </BaseUISlider.Label>

      <div className="flex-1 flex gap-32 items-center">
        <BaseUISlider.Control className="flex-1 flex h-16 w-full items-center cursor-pointer">
          <BaseUISlider.Track className="relative h-8 w-full rounded-full bg-gray-300">
            <BaseUISlider.Indicator className="absolute h-full rounded-full bg-sky-600" />

            {options.map((_, index) => {
              if (index !== 0 && index !== options.length - 1) {
                return (
                  <span
                    key={index}
                    className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    style={{
                      left: `${(index / (options.length - 1)) * 100}%`,
                    }}
                  />
                );
              }
            })}
            <BaseUISlider.Thumb className="size-16 rounded-full bg-white shadow ring-1 ring-gray-300 focus:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky-600" />
          </BaseUISlider.Track>
        </BaseUISlider.Control>
        {windowWidth >= breakpoints.md ? (
          <BaseUISlider.Label className={"w-128"}>
            {options[currentIndex]?.label}
          </BaseUISlider.Label>
        ) : null}
      </div>
    </BaseUISlider.Root>
  );
}
