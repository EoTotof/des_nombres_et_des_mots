import { ScreenSizeT } from "@/lib/tailwind";
import { Operator } from "@dnedm/game-core";
import clsx from "clsx";
import { Plus, Minus, X, Divide, LucideIcon } from "lucide-react";
import { MouseEventHandler } from "react";

type OperatorCardProps = {
  size: ScreenSizeT;
  operator: Operator;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
};

export default function OperatorCard({
  size,
  operator,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OperatorCardProps) {
  const Icon = ICON_BY_OPERATOR[operator];

  return (
    <button
      type="button"
      className={clsx(
        "flex",
        onClick && "cursor-pointer hover:scale-[1.1] transition",
      )}
      onClick={(event) => {
        onClick?.(event);
        onMouseLeave?.(event);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        className={clsx(
          "text-white bg-sky-700 rounded-xl shadow-sm/30 flex items-center justify-center",
          operatorCardClassNameVariants[size],
        )}
      >
        <Icon size={operatorIconSizeVariants[size]} />
      </span>
    </button>
  );
}

const ICON_BY_OPERATOR: Record<Operator, LucideIcon> = {
  "+": Plus,
  "-": Minus,
  "*": X,
  "/": Divide,
};

export const operatorCardClassNameVariants: Record<ScreenSizeT, string> = {
  xs: "size-32",
  sm: "size-40",
  md: "size-48",
  lg: "size-72",
};

export const operatorIconSizeVariants: Record<ScreenSizeT, number> = {
  xs: 24,
  sm: 24,
  md: 32,
  lg: 40,
};
