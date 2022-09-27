import { useDrag, useDrop } from 'react-dnd';
import { Card as CardWrapper, CardHeader, CardMeta, Label, Divider, Grid, Segment as Container } from 'semantic-ui-react';

import ICard from '../../../interfaces/ICard';

import ITEM_TYPES from '../../../data/types';

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

    const dateWrapper = () => {
        return `#${card.id} opened ${card.daysNumber} days ago`;
    }

    return (
        <div ref={dragRef} style={styles.container}>
            <div ref={dropRef} style={isDragging ? styles.underDraggableContainer : styles.draggableContainer}> 
                    <CardWrapper.Content>
                        <CardHeader style={styles.title}>{card.title}</CardHeader>
                        <CardMeta style={styles.date}>{dateWrapper()}</CardMeta>
                        <CardWrapper.Description style={styles.discription}>
                            <Grid columns={3} style={styles.dataColumnsWrapper}>
                                <Grid.Column style={styles.dataColumns}>{card.author}</Grid.Column>
                                <Grid.Column style={styles.dataColumns}>|</Grid.Column>
                                <Grid.Column style={styles.dataColumns}>{`Comments: ${card.comentsNumber}`}</Grid.Column>
                            </Grid>
                        </CardWrapper.Description>
                    </CardWrapper.Content>
            </div>
        </div>
    );
}

export default Card;