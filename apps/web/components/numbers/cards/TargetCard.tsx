type TargetCardProps = {
  targetValue: number;
};

export default function TargetCard({ targetValue }: TargetCardProps) {
  return (
    <div className="p-16 text-white bg-sky-950 rounded-lg text-9xl font-bold text-center max-lg:text-8xl">
      {targetValue}
    </div>
  );
}
