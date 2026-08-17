type TimerProps = {
  currentTime: number;
  maxTime: number;
  showTime?: boolean;
};

export default function Timer({ currentTime, maxTime, showTime }: TimerProps) {
  return (
    <div className="flex gap-8 items-center">
      {showTime ? (
        <div className="w-24 text-xl font-bold">{currentTime}</div>
      ) : null}
      <div className="flex-1 h-16 bg-sky-300 rounded-xl">
        <div
          className="h-16 bg-sky-800 transition-[width] duration-1000 rounded-xl"
          style={{ width: `${(100 * currentTime) / maxTime}%` }}
        ></div>
      </div>
    </div>
  );
}
