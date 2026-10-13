import { RoundScore } from "@dnedm/game-core";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "motion/react";

type LeaderboardProps = {
  title: React.ReactNode;
  scores: RoundScore[];
  withTransition?: boolean;
};

export default function Leaderboard({
  title,
  scores,
  withTransition,
}: LeaderboardProps) {
  const [shouldTransition, setShouldTransition] = useState<boolean>(
    Boolean(withTransition),
  );

  if (scores.length === 0) {
    return null;
  }

  function scoreReduceFn(total: RoundScore, round: RoundScore) {
    for (const player of Object.keys(round)) {
      total[player] = (total[player] ?? 0) + (round[player] ?? 0);
    }
    return total;
  }

  const currentTotalScores = scores.reduce<RoundScore>(scoreReduceFn, {});

  const previousTotalScores =
    scores.length > 1
      ? scores
          .toSpliced(scores.length - 1, 1)
          .reduce<RoundScore>(scoreReduceFn, {})
      : currentTotalScores;

  const totalScores = shouldTransition
    ? previousTotalScores
    : currentTotalScores;

  const sortedScores = Object.entries(totalScores).sort(
    ([, a], [, b]) => b - a,
  );

  const rankedScores: RankedScore[] = [];
  let rank = 0;

  sortedScores.forEach(([name, score], index) => {
    if (index === 0 || score !== sortedScores[index - 1]![1]) {
      rank = index + 1;
    }

    rankedScores.push([name, rank, score]);
  });

  setTimeout(() => setShouldTransition(false), 100);

  return (
    <div>
      <div className="mb-8 text-2xl font-semibold">{title}</div>
      <ul className="flex flex-col gap-4">
        {rankedScores.map(([name, rank, score]) => (
          <motion.li
            layout
            key={name}
            className={clsx(
              "flex justify-between bg-sky-200 px-12 py-4 rounded-lg text-2xl",
              rank === 1 && "font-bold",
              (rank === 2 || rank === 3) && "font-semibold",
            )}
          >
            <span>{rank}</span>
            <span>{name}</span>
            <span>{score}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

type RankedScore = [name: string, rank: number, score: number];
