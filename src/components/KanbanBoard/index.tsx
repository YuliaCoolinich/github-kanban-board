import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';

import Column from './Column';

import IIssue from '../../interfaces/IIssue';
import IColumn from '../../interfaces/IColumn';

import * as cardsServices from './services';

import CARD_STATUSES from '../../data/statuses';
//import cards from '../../data/mockCards';

import styles from './styles';

const setDefaultColumnsValues =  (cards: IIssue[]): IColumn[] => {
    const columns: IColumn[] =  CARD_STATUSES.map(status => ({ 
        cards: cardsServices.filterByStatus(cards, status.value),
        status: status
    }));

    // set default priority values
    columns.forEach((column) => (column.cards.forEach((card, index) => card.priority = index)));
    console.log(columns);
    return columns;
}

// TO-DO move to services file:
const filterCardsByStatus = (cards: IIssue[]): IColumn[] => {
   const columns: IColumn[] =  CARD_STATUSES.map(status => ({ 
        cards: cardsServices.filterByStatus(cards, status.value),
        status: status
    }));

    return columns;
}

interface IKanbanBoard {
    issues: IIssue[];
}

const KanbanBoard = (props: IKanbanBoard) => {
    const { issues } = props;
    const [columns, setColumns] = useState<IColumn[]>([]); //useState(setDefaultColumnsValues(cards));

    useEffect(() => {
        const columns = setDefaultColumnsValues(issues);
        setColumns(columns);
    }, [issues]);

    //console.log(issues);
    //console.log(columns);

    const changeCardStatus = (cardId: number, newStatus: string) => {
        const card = issues.find( card => card.id === cardId) as IIssue;
        
        if (card.state === newStatus) 
            return;

        card.state = newStatus;
        setColumns(filterCardsByStatus(issues));
    }

    const changeCardPriority = (status: string, previousPriority: number, newPriority: number) => {
        const cardsList: IIssue[] = cardsServices.filterByStatus(issues, status);
        const movedCard: IIssue = cardsList[previousPriority];

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
            <Container style={styles.containerWrapper}> 
                <Container style={styles.container}>
                { 
                    columns.map(column => 
                        <Column 
                            column={column}
                            key={column.status.id}
                            changeCardStatus={changeCardStatus}
                            changeCardPriority={changeCardPriority}
                        />)
                }
                </Container>
            </Container>
    );
}

export default KanbanBoard;
