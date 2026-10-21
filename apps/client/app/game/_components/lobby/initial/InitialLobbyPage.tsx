import { GameParameters as GameParametersT } from "@dnedm/game-core";
import { ClientEvents } from "@dnedm/game-contracts";
import Button from "@/components/Button";
import { useState } from "react";
import Input from "@/components/inputs/Input";
import { Copy, CopyCheck } from "lucide-react";
import GameParameters from "./GameParameters";
import { useLobbyContext } from "@/app/game/_contexts/lobbyContext";

export default function InitialLobbyPage() {
  const { socket, lobbyState, onLeave } = useLobbyContext();

  const isLobbyOwner = lobbyState.playerName === lobbyState.owner;
  function updateParameters(parameters: GameParametersT) {
    socket.emit(ClientEvents.UpdateGameParameters, parameters);
  }

  const lobbyUrl = `${window.location.origin}/game?uuid=${lobbyState.lobbyId}`;
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-16">
      <div>
        <div className="mb-4 text-2xl font-semibold">Inviter des joueurs</div>
        <div className="flex items-center gap-8">
          <Input value={lobbyUrl} />
          <Button
            onClick={() => {
              setUrlCopied(true);
              void navigator.clipboard.writeText(lobbyUrl);
            }}
          >
            {urlCopied ? <CopyCheck /> : <Copy />}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-4 text-2xl font-semibold">Paramètres</div>
        <GameParameters
          parameters={lobbyState.parameters}
          setParameters={updateParameters}
          disabled={!isLobbyOwner}
        />
      </div>
      <div>
        <div className="text-2xl font-semibold">Joueurs</div>
        <ul>
          {lobbyState.players.map((name) => (
            <li key={name} className="text-lg">
              {name}
            </li>
          ))}
        </ul>
      </div>
      {isLobbyOwner ? (
        <Button onClick={() => socket.emit(ClientEvents.StartGame)}>
          Démarrer la partie
        </Button>
      ) : null}
      <Button color="secondary" onClick={onLeave}>
        Quitter la partie
      </Button>
    </div>
  );
}
