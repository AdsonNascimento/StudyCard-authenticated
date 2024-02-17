export type Answer = {
    text: string;
    isCorrect: boolean;
} 

export type Card = {
    id: number;
    id_discipline: number;
    question: string;
    answers: Answer[];
    current_difficulty: number;
    card_created: Date;
    last_interaction: Date;
    result: Boolean;
}