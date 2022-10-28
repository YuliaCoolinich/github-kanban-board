import { Container, Loader, Segment, Message } from 'semantic-ui-react';

import Column from './Column';
import IColumn from '../../interfaces/IColumn';

import styles from './styles';

interface IKanbanBoard {
    columns: IColumn[];
    isLoading: boolean;
    error: string;
    changeIssueStatus: (issueId: number, previousStatus: string, newStatus: string) => void;
    changeIssuesOrder: (status: string, previousIndex: number, newIndex: number) => void;
}

const LOADING_MESSAGE = 'Loading';

const KanbanBoard = (props: IKanbanBoard) => {
    const { columns, isLoading, error, changeIssueStatus, changeIssuesOrder } = props;

    return(
            <Container style={styles.containerWrapper}>
                {  error.length > 0 
                    ? <Message error content={error} />
                    : null
                }
                <Container style={styles.container}>
                    {
                        isLoading
                        ?   <Segment style={styles.segment}>
                                <Loader active content={LOADING_MESSAGE} />
                            </Segment>
                        : columns.map(column => 
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
