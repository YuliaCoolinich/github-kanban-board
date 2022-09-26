import { useDrag, useDrop } from 'react-dnd';
import { Card as CardWrapper, CardHeader, CardMeta, Divider, Grid } from 'semantic-ui-react';

import ICard from '../../interfaces/ICard';

import ITEM_TYPES from '../../data/types';

import styles from './styles';

type ICardProps = {
    card: ICard;
    changeCardPriority: (status: string, previousPriority: number, newPriority: number) => void;
}

const Card = (props: ICardProps) => {
    const card = props.card;
    const changeCardPriority = props.changeCardPriority;

    const[{ isDragging }, dragRef] = useDrag({
        type: ITEM_TYPES.CARD,
        item: { id: card.id, priority: card.priority, status: card.status },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
    });

    const[{ isOver }, dropRef] = useDrop({
        accept: ITEM_TYPES.CARD,
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => {
            if(card.status === (item as any).status)
                changeCardPriority(card.status, (item as any).priority, Number(card!.priority));
        },
    });

    return (
        <div style={styles.container} ref={dragRef}>
        <div ref={dropRef} style={isDragging ? styles.underDraggableContainer : styles.draggableContainer}>
                <CardWrapper>
                <CardWrapper.Content>
                    <CardHeader style={styles.title}>{card.title}</CardHeader>
                    <CardMeta style={styles.date}>#{card.id} opened {card.daysNumber} days ago</CardMeta>
                    </CardWrapper.Content> 
                    <CardWrapper.Content style={styles.dataLinks}>
                        <Grid.Column>
                            {card.author}
                        </Grid.Column>
                        <Divider vertical>|</Divider> 
                        <Grid.Column>
                            Comments: {card.comentsNumber}
                        </Grid.Column>
                    </CardWrapper.Content>
                </CardWrapper>
        </div>
        </div>
    );
}

export default Card;