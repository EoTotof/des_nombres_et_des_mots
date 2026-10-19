import { RoundParameters as NumbersRoundParameters } from "@/app/numbers/_components/GameParameters";
import { RoundParameters as WordsRoundParameters } from "@/app/words/_components/GameParameters";
import Slider from "@/components/inputs/Slider";
import { GameParameters as GameParametersT } from "@dnedm/game-core";

type GameParametersProps = {
  parameters: GameParametersT;
  setParameters: (parameters: GameParametersT) => void;
  disabled?: boolean;
};

export default function GameParameters({
  parameters,
  setParameters,
  disabled,
}: GameParametersProps) {
  return (
    <div className="space-y-8">
      <div className="md:flex md:items-center">
        <Slider
          label="Mode de jeu"
          value={parameters.gameMode}
          options={[
            { label: "Classique", value: "mixed" },
            { label: "Que des nombres", value: "numbers" },
            { label: "Que des mots", value: "words" },
          ]}
          onChange={(value: GameParametersT["gameMode"]) =>
            setParameters({ ...parameters, gameMode: value })
          }
          disabled={disabled}
        />
      </div>
      <div className="md:flex md:items-center">
        <Slider
          label="Nombres de manches"
          value={parameters.roundCount}
          options={[
            { label: "2", value: 2 },
            { label: "4", value: 4 },
            { label: "6", value: 6 },
            { label: "8", value: 8 },
            { label: "10", value: 10 },
            { label: "12", value: 12 },
            { label: "16", value: 16 },
            { label: "20", value: 20 },
          ]}
          onChange={(value) =>
            setParameters({ ...parameters, roundCount: value })
          }
          disabled={disabled}
        />
      </div>
      <div className="md:flex md:items-center">
        <Slider
          label="Chronomètre"
          value={parameters.roundDuration}
          options={[
            { label: "30s", value: 30 },
            { label: "45s", value: 45 },
            { label: "60s", value: 60 },
            { label: "90s", value: 90 },
          ]}
          onChange={(value) =>
            setParameters({ ...parameters, roundDuration: value })
          }
          disabled={disabled}
        />
      </div>

      {parameters.gameMode !== "words" ? (
        <>
          <div className="text-xl font-semibold">Des nombres</div>
          <NumbersRoundParameters
            parameters={parameters.numbersParameters}
            setParameters={(numbersParameters) =>
              setParameters({ ...parameters, numbersParameters })
            }
            disabled={disabled}
          />
        </>
      ) : null}
      {parameters.gameMode !== "numbers" ? (
        <>
          <div className="text-xl font-semibold">Des mots</div>
          <WordsRoundParameters
            parameters={parameters.wordsParameters}
            setParameters={(wordsParameters) =>
              setParameters({ ...parameters, wordsParameters })
            }
            disabled={disabled}
          />
        </>
      ) : null}
    </div>
  );
}
