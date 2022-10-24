import { useDrop } from 'react-dnd';
import { Container, Segment, Header } from 'semantic-ui-react';

import Card from '../Card';

import IColumn from '../../../interfaces/IColumn';
import IDraggableItem from '../../../interfaces/IDraggableItem';

import ITEM_TYPES from '../../../data/types';

import styles from './styles';
import IIssue from '../../../interfaces/IIssue';

const EMPTY_COLUMN_INFO = 'Empty list';

type IColumnProps = {
    column: IColumn;
    changeIssueStatus: (issueId: number, previousStatus: string, newStatus: string) => void;
    changeIssuesOrder: (status: string, previousIndex: number, newIndex: number) => void;
}

const Column = ( props: IColumnProps  ) => {
    const status: string = props.column.status.title;
    const issues: IIssue[] = props.column.cards;
    const { changeIssueStatus, changeIssuesOrder } = props;

    const[{ isOver }, dropRef] = useDrop({
        accept: ITEM_TYPES.CARD,
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => {
            const droppedItem = item as IDraggableItem;
            if (status !== droppedItem.status) {
                changeIssueStatus(droppedItem.id, droppedItem.status, status);
            }
        },
    });

    return ( // TO-DO create general droppable element with passing children item
            <div ref={dropRef} style={styles.wrapper}>
                <Container style={styles.container}>
                    <Header>{status}</Header>
                    <Segment style={isOver ? styles.cardSegmentDropped : styles.cardSegment}>
                        {
                            issues.length === 0 
                                ? <div style={styles.infoContent}>{EMPTY_COLUMN_INFO}</div>
                                : issues.map((issue, index) => 
                                    <Card 
                                        issue={issue} 
                                        order={index}
                                        changeIssuesOrder={changeIssuesOrder}
                                        key={issue.id}
                                    />)
                        }
                    </Segment>
                </Container>
           </div>
        )
};

export default Column;