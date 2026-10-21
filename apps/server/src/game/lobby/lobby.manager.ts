import { Player, PlayerId } from "@dnedm/game-core";
import { Lobby } from "./lobby.js";
import { ServerPayloads } from "@dnedm/game-contracts";

const LOBBY_CLEANUP_INTERVAL = 60_000; // 1 minute
const LOBBY_INACTIVITY_TIMEOUT = 15 * 60_000; // 15 minutes

export class LobbyManager {
  private readonly lobbies = new Map<string, Lobby>();
  private readonly playerLobbies = new Map<PlayerId, string>();
  private readonly cleanupTimer: ReturnType<typeof setInterval>;
  public readonly dispatchToPlayer: (
    playerId: PlayerId,
    payload: ServerPayloads[keyof ServerPayloads],
  ) => void;

  constructor(
    dispatchToPlayer: (
      playerId: PlayerId,
      payload: ServerPayloads[keyof ServerPayloads],
    ) => void,
  ) {
    this.dispatchToPlayer = dispatchToPlayer;
    this.cleanupTimer = setInterval(
      () => this.deleteInactiveLobbies(),
      LOBBY_CLEANUP_INTERVAL,
    );
  }

  findPlayerLobby(player: PlayerId): Lobby | null {
    const lobbyId = this.playerLobbies.get(player);
    if (!lobbyId) {
      return null;
    }

    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) {
      return null;
    }

    return lobby;
  }

  createLobby(owner: Player) {
    if (this.playerLobbies.has(owner.id)) {
      throw new Error("Player is already in a lobby");
    }
    const lobby = new Lobby(owner, this.dispatchToPlayer);
    this.lobbies.set(lobby.id, lobby);
    lobby.addPlayer(owner);
    this.playerLobbies.set(owner.id, lobby.id);
  }

  getLobby(lobbyId: string): Lobby {
    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) {
      throw Error("Lobby does not exist");
    }
    return lobby;
  }

  joinLobby(player: Player, lobbyId: string) {
    if (this.playerLobbies.has(player.id)) {
      throw new Error("Player is already in a lobby");
    }

    const lobby = this.getLobby(lobbyId);
    lobby.addPlayer(player);
    this.playerLobbies.set(player.id, lobby.id);
  }

  leaveLobby(playerId: string, lobbyId: string) {
    if (!this.playerLobbies.has(playerId)) {
      throw new Error("Player is not in a lobby");
    }

    const lobby = this.getLobby(lobbyId);
    lobby.removePlayer(playerId);
    this.playerLobbies.delete(playerId);
  }

  private deleteInactiveLobbies(): void {
    const now = Date.now();

    for (const lobby of this.lobbies.values()) {
      if (
        lobby.players.length === 0 ||
        now - lobby.lastActivityAt.getTime() >= LOBBY_INACTIVITY_TIMEOUT
      ) {
        this.deleteLobby(lobby.id);
      }
    }
  }

  private deleteLobby(lobbyId: string): void {
    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) {
      return;
    }

    for (const player of lobby.players) {
      this.playerLobbies.delete(player.id);
    }

    this.lobbies.delete(lobbyId);
  }
}
