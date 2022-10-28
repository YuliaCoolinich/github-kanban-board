import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react';

import Column from './Column';
import IColumn from '../../interfaces/IColumn';

import styles from './styles';

interface IKanbanBoard {
    columns: IColumn[];
    isLoading: boolean;
    changeIssueStatus: (issueId: number, previousStatus: string, newStatus: string) => void;
    changeIssuesOrder: (status: string, previousIndex: number, newIndex: number) => void;
}

const LOADING_MESSAGE = 'Loading';

const KanbanBoard = (props: IKanbanBoard) => {
    const { columns, isLoading, changeIssueStatus, changeIssuesOrder } = props;

    return(
            <Container style={styles.containerWrapper}>
                {
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
                }
            </Container>
    );
}

export default KanbanBoard;
