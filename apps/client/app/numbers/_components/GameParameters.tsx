import Slider from "@/components/inputs/Slider";
import Switch from "@/components/inputs/Switch";
import {
  DEFAULT_NUMBERS_ROUND_PARAMETERS,
  NumbersRoundParameters,
} from "@dnedm/game-core";

type GameParametersProps = {
  parameters: NumbersRoundParameters;
  setParameters: (parameters: NumbersRoundParameters) => void;
};

export default function GameParameters({
  parameters,
  setParameters,
}: GameParametersProps) {
  return (
    <div className="space-y-8">
      <div className="md:flex md:items-center">
        <Slider
          label="Chronomètre"
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
        onClick={() => setParameters(DEFAULT_NUMBERS_ROUND_PARAMETERS)}
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
  parameters: Omit<NumbersRoundParameters, "duration">;
  setParameters: (parameters: Omit<NumbersRoundParameters, "duration">) => void;
  disabled?: boolean;
}) {
  return (
    <>
      <div className="md:flex md:items-center">
        <Slider
          label="Grands nombres"
          value={parameters.bigNumberCount}
          options={[
            { label: "0", value: 0 },
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "Aléatoire", value: null },
          ]}
          onChange={(value) =>
            setParameters({ ...parameters, bigNumberCount: value })
          }
          disabled={disabled}
        />
      </div>
      <div className="md:flex md:items-center">
        <label className="mb-2 md:w-280 md:mb-0">
          Autoriser les nombres inatteignables
        </label>
        <div>
          <Switch
            enabled={parameters.allowUnreachableTarget}
            setEnabled={(enabled) =>
              setParameters({
                ...parameters,
                allowUnreachableTarget: enabled,
              })
            }
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}
