import { ScreenSizeT } from "@/lib/tailwind";
import clsx from "clsx";

type TargetCardProps = {
  size: ScreenSizeT;
  targetValue: number;
};

export default function TargetCard({ size, targetValue }: TargetCardProps) {
  return (
    <div
      className={clsx(
        "p-16 text-white bg-sky-950 rounded-lg font-bold text-center",
        textSizeVariants[size],
      )}
    >
      {targetValue}
    </div>
  );
}

const textSizeVariants: Record<ScreenSizeT, string> = {
  xs: "text-3xl",
  sm: "text-5xl",
  md: "text-8xl",
  lg: "text-9xl",
};
