export interface Option {
    id: number;
    text: string;
    pollId: number;
    votes: number;
  }
  export interface Poll {
    id: number;
    question: string;
    options: Option[];
    createdAt: Date;
    expiresAt: Date;
  }
  