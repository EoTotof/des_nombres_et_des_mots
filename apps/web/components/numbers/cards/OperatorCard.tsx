import { Operator } from "@dnedm/game-core";
import { Plus, Minus, X, Divide, LucideIcon } from "lucide-react";

type OperatorCardProps = {
  operator: Operator;
};

export default function OperatorCard({ operator }: OperatorCardProps) {
  const Icon = ICON_BY_OPERATOR[operator];

  return (
    <div className="p-16 text-white bg-sky-700 rounded-xl text-center shadow-sm/30">
      <Icon size={40} />
    </div>
  );
}

const ICON_BY_OPERATOR: Record<Operator, LucideIcon> = {
  "+": Plus,
  "-": Minus,
  "*": X,
  "/": Divide,
};
