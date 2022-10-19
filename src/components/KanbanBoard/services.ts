import IIssue from '../../interfaces/IIssue';

export const filterByStatus = (cards: IIssue[], status: string) => cards.filter(card => card.state === status);