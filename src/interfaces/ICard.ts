export interface ICard {
    id: number;
    title: string;
    status: string; // TO-DO Status type
    author: string;
    daysNumber: number; // TO-DO change to date and use momentum
    comentsNumber: number;
    priority?: number;
}

export default ICard;