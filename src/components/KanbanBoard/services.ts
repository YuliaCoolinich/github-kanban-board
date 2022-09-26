import ICard from '../../interfaces/ICard';

export const filterByStatus = (cards: ICard[], status: string) => cards.filter(card => card.status === status);