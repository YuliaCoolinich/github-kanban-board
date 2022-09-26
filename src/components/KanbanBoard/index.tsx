import { useState } from 'react';
import { Segment } from 'semantic-ui-react';

import Column from './Column';

import ICard from '../../interfaces/ICard';
import IColumn from '../../interfaces/IColumn';

import * as cardsServices from './services';

import CARD_STATUSES from '../../data/statuses';
import cards from '../../data/mockCards';

import styles from './styles';

const setDefaultColumnsValues =  (cards: ICard[]): IColumn[] => {
    const columns: IColumn[] =  CARD_STATUSES.map(status => ({ 
        cards: cardsServices.filterByStatus(cards, status.title),
        status: status
    }));

    // set default priority values
    columns.forEach((column) => (column.cards.forEach((card, index) => card.priority = index)));
    return columns;
}

// TO-DO move to services file:
const filterCardsByStatus = (cards: ICard[]): IColumn[] => {
   const columns: IColumn[] =  CARD_STATUSES.map(status => ({ 
        cards: cardsServices.filterByStatus(cards, status.title),
        status: status
    }));

    return columns;
}

const KanbanBoard = () => {
    const [columns, setColumns] = useState(setDefaultColumnsValues(cards));

    const changeCardStatus = (cardId: number, newStatus: string) => {
        const card = cards.find( card => card.id === cardId) as ICard;
        
        if (card.status === newStatus) 
            return;

        card.status = newStatus;
        setColumns(filterCardsByStatus(cards));
    }

    const changeCardPriority = (status: string, previousPriority: number, newPriority: number) => {
        const cardsList = cardsServices.filterByStatus(cards, status);
        const movedCard = cardsList[previousPriority];

        cardsList.splice(previousPriority, 1);
        cardsList.splice(newPriority, 0, movedCard);
        cardsList.forEach((card, index) => card.priority = index);

        const updatedColumns: IColumn[] = columns.map(column => {
            if (column.status.title === status) column.cards = cardsList;
            return column;
        });
        setColumns(updatedColumns);
    }

    return(
            <Segment style={styles.segment}> 
            { 
                columns.map(column => 
                    <Column 
                        column={column}
                        key={column.status.id}
                        changeCardStatus={changeCardStatus}
                        changeCardPriority={changeCardPriority}
                    />)
            }
            </Segment>
    );
}

export default KanbanBoard;
