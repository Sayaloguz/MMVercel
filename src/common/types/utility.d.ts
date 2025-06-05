export type User = {
  id: string;
  steamId: string;
  name: string;
  avatar: string;
};
export type Game = {
  appid: string;
  name: string;
  shortDescription: string;
  categories: string[];
  headerImage: string;
  lastUpdated: string;
};

export type Jam = {
  id: string;
  userId: string;
  gameId: string;
  title: string;
  maxPlayers: number;
  players: User[];
  description: string;
  state: string;
  jamDate: string;
  jamTime: string;
  user?: User;
  game?: Game;
  createdBy: User;
  gameMode: "CASUAL" | "COMPETITIVE" | "COMPLETIST";
  voiceMode: "TEXT" | "HEAR" | "TALK";
  language: "INDEF" | "ES" | "EN" | "FR" | "PT" | "IT";
  duration: "15-30" | "30-60" | "60-120" | "120-180" | "180-240" | "240+";
};

export type Invitation = {
  invId: string;
  jamId: string;
  senderId: string;
  receiverId: string;
  sentDate: string;
};

export type FullInvitation = {
  invitation: Invitation;
  sender: User;
  jam: Jam;
};

export interface JamInputDTO {
  title: string;
  description: string;
  game: Game;
  jamDate: string;
  jamTime: string;
  state: "OPEN" | "FULL" | "FINISHED";
  createdBy: Usuario;
  createdAt: string;
  maxPlayers: number;
  players: Usuario[];
  gameMode: "CASUAL" | "COMPETITIVE" | "COMPLETIST";
  voiceMode: "TEXT" | "HEAR" | "TALK";
  language: "INDEF" | "ES" | "EN" | "FR" | "PT" | "IT";
  duration: "15-30" | "30-60" | "60-120" | "120-180" | "180-240" | "240+";
}

export interface JamUpdateDTO {
  id: string;
  title: string;
  description: string;
  jamDate: string;
  jamTime: string;
  maxPlayers: number;
  gameMode: "CASUAL" | "COMPETITIVE" | "COMPLETIST";
  voiceMode: "TEXT" | "HEAR" | "TALK";
  language: "INDEF" | "ES" | "EN" | "FR" | "PT" | "IT";
  duration: "15-30" | "30-60" | "60-120" | "120-180" | "180-240" | "240+";
}
