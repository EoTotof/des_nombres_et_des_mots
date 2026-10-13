import { z } from "zod";

// TODO schemas for every client event

export const createLobbySchema = z.object({
  name: z.string().trim().min(1),
});

export const joinLobbySchema = z.object({
  lobbyId: z.uuid(),
  name: z.string().trim().min(1),
});
