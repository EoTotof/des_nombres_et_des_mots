export enum ClientEvents {
  Ping = "client.ping",
  CreateLobby = "client.lobby.create",
  JoinLobby = "client.lobby.join",
  LeaveLobby = "client.lobby.leave",
  UpdateGameParameters = "client.game.updateParameters",
  StartGame = "client.game.start",
  PushMove = "client.game.pushMove",
  UndoMove = "client.game.undoMove",
  StartNextRound = "client.game.startNextRound",
}
