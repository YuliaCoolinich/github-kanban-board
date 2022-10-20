import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';

import Column from './Column';

import IIssue from '../../interfaces/IIssue';
import IColumn from '../../interfaces/IColumn';

import styles from './styles';


interface IKanbanBoard {
    columns: IColumn[];
    changeIssueStatus: (issueId: number, previousStatus: string, newStatus: string) => void;
}

const KanbanBoard = (props: IKanbanBoard) => {
    const { columns, changeIssueStatus } = props;

    console.log(`columns in KANBAN BOARD:`);
    console.log(columns);

    /*
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
    } */

    return(
            <Container style={styles.containerWrapper}> 
                <Container style={styles.container}>
                { 
                    columns.map(column => 
                        <Column 
                            column={column}
                            key={column.status.id}
                            changeIssueStatus={changeIssueStatus}
                            //changeCardPriority={changeCardPriority}
                        />)
                }
                </Container>
            </Container>
    );
}

export default KanbanBoard;
