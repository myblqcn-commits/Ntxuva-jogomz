export interface FirebasePlayerProfile {
  id: string;
  displayName: string;
  photoURL?: string;
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  seedsCaptured: number;
  experiencePoints: number;
  level: number;
  levelTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirebaseMatchRecord {
  id: string;
  playerId: string;
  playerName: string;
  gameMode: 'ai' | 'two_player' | 'pass_and_play';
  difficulty?: string;
  winner: 'player1' | 'player2' | 'draw';
  isWinner: boolean;
  seedsCaptured: number;
  totalTurns: number;
  winReason: string;
  createdAt: string;
}

export interface LeaderboardPlayer extends FirebasePlayerProfile {
  rank: number;
  winRate: number;
}
