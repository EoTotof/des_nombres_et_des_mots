import Slider from "@/components/inputs/Slider";
import {
  DEFAULT_WORDS_ROUND_PARAMETERS,
  WordsRoundParameters,
} from "@dnedm/game-core";

type GameParametersProps = {
  parameters: WordsRoundParameters;
  setParameters: (parameters: WordsRoundParameters) => void;
};

export default function GameParameters({
  parameters,
  setParameters,
}: GameParametersProps) {
  return (
    <div className="space-y-8">
      <div className="md:flex md:items-center">
        <label className="md:w-280">Chronomètre</label>
        <Slider
          value={parameters.duration}
          options={[
            { label: "30s", value: 30 },
            { label: "45s", value: 45 },
            { label: "60s", value: 60 },
            { label: "90s", value: 90 },
            { label: "Aucun", value: null },
          ]}
          onChange={(value) =>
            setParameters({ ...parameters, duration: value })
          }
        />
      </div>
      <RoundParameters
        parameters={parameters}
        setParameters={(roundParameters) =>
          setParameters({
            duration: parameters.duration,
            ...roundParameters,
          })
        }
      />
      <div
        className="cursor-pointer font-semibold"
        onClick={() => setParameters(DEFAULT_WORDS_ROUND_PARAMETERS)}
      >
        Rétablir les valeurs par défaut
      </div>
    </div>
  );
}

export function RoundParameters({
  parameters,
  setParameters,
  disabled,
}: {
  parameters: Omit<WordsRoundParameters, "duration">;
  setParameters: (parameters: Omit<WordsRoundParameters, "duration">) => void;
  disabled?: boolean;
}) {
  return (
    <div className="md:flex md:items-center">
      <label className="md:w-280">Voyelles</label>
      <Slider
        value={parameters.vowelCount}
        options={[
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
          { label: "6", value: 6 },
          { label: "7", value: 7 },
          { label: "8", value: 8 },
          { label: "Aléatoire", value: null },
        ]}
        onChange={(value) =>
          setParameters({ ...parameters, vowelCount: value })
        }
        disabled={disabled}
      />
    </div>
  );
}
