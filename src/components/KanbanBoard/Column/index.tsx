import { useDrop } from 'react-dnd';
import { Container, Segment, Header } from 'semantic-ui-react';

import Card from '../Card';

import IColumn from '../../../interfaces/IColumn';

import ITEM_TYPES from '../../../data/types';

import styles from './styles';
import IIssue from '../../../interfaces/IIssue';

const EMPTY_COLUMN_INFO = 'Empty list';

type IColumnProps = {
    column: IColumn;
    changeIssueStatus: (issueId: number, previousStatus: string, newStatus: string) => void;
    changeCardPriority?: (status: string, previousPriority: number, newPriority: number) => void;
}

const Column = ( props: IColumnProps  ) => {
    const status: string = props.column.status.title;
    const cards: IIssue[] = props.column.cards;
    const { changeIssueStatus } = props;

    const[{ isOver }, dropRef] = useDrop({
        accept: ITEM_TYPES.CARD,
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => {
            console.log('item');
            console.log(item);
            if(status !== (item as any).status) {
                console.log(`changeCardStatus(${(item as any).id}, ${(item as any).status}, ${status})`);
                changeIssueStatus((item as any).id, (item as any).status, status);
            }
        },
    });

    return ( // TO-DO create general droppable element with passing children item
            <div ref={dropRef} style={styles.wrapper}>
                <Container style={styles.container}>
                    <Header>{status}</Header>
                    <Segment style={isOver ? styles.cardSegmentDropped : styles.cardSegment}>
                        {
                            cards.length === 0 
                                ? <div style={styles.infoContent}>{EMPTY_COLUMN_INFO}</div>
                                : cards.map(card => 
                                    <Card 
                                        card={card} 
                                        //changeCardPriority={props.changeCardPriority}
                                        key={card.id} 
                                    />)
                        }
                    </Segment>
                </Container>
           </div>
        )
};

export default Column;