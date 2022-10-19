import { useDrag, useDrop } from 'react-dnd';
import moment from 'moment';
import { Card as CardWrapper, CardHeader, CardMeta, Grid } from 'semantic-ui-react';

import IIssue from '../../../interfaces/IIssue';

import ITEM_TYPES from '../../../data/types';

import styles from './styles';

type ICardProps = {
    card: IIssue;
    changeCardPriority: (status: string, previousPriority: number, newPriority: number) => void;
}

const Card = (props: ICardProps) => {
    const card = props.card;
    const changeCardPriority = props.changeCardPriority;

    const[{ isDragging }, dragRef] = useDrag({
        type: ITEM_TYPES.CARD,
        item: { id: card.id, priority: card.priority, status: card.state },
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
            if(card.state === (item as any).status)
                changeCardPriority(card.state, (item as any).priority, Number(card!.priority));
        },
    });

    const dateWrapper = () => {
        return `#${card.number} opened ${moment([card.created_at]).toNow()} ago`;
    }

    return (
        <div ref={dragRef} style={styles.container}>
            <div ref={dropRef} style={isDragging ? styles.underDraggableContainer : styles.draggableContainer}> 
                    <CardWrapper.Content>
                        <CardHeader style={styles.title}>
                            <a href={card.html_url}>
                                {card.title}
                            </a>
                        </CardHeader>
                        <CardMeta style={styles.date}>{dateWrapper()}</CardMeta>
                        <CardWrapper.Description style={styles.discription}>
                            <Grid columns={3} style={styles.dataColumnsWrapper}>
                                <Grid.Column style={styles.dataColumns}>
                                    <a href={card.user.html_url}>{card.user.login}</a>
                                </Grid.Column>
                                <Grid.Column style={styles.dataColumns}>|</Grid.Column>
                                <Grid.Column style={styles.dataColumns}>{`Comments: ${card.comments}`}</Grid.Column>
                            </Grid>
                        </CardWrapper.Description>
                    </CardWrapper.Content>
            </div>
        </div>
    );
}

export default Card;