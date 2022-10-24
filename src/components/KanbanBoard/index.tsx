import { Container } from 'semantic-ui-react';

import Column from './Column';
import IColumn from '../../interfaces/IColumn';

import styles from './styles';


interface IKanbanBoard {
    columns: IColumn[];
    changeIssueStatus: (issueId: number, previousStatus: string, newStatus: string) => void;
    changeIssuesOrder: (status: string, previousIndex: number, newIndex: number) => void;
}

const KanbanBoard = (props: IKanbanBoard) => {
    const { columns, changeIssueStatus, changeIssuesOrder } = props;

    return(
            <Container style={styles.containerWrapper}> 
                <Container style={styles.container}>
                { 
                    columns.map(column => 
                        <Column 
                            column={column}
                            key={column.status.id}
                            changeIssueStatus={changeIssueStatus}
                            changeIssuesOrder={changeIssuesOrder}
                        />)
                }
                </Container>
            </Container>
    );
}

export default KanbanBoard;
