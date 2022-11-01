import { useDrag, useDrop } from 'react-dnd';
import moment from 'moment';
import { Card as CardWrapper, CardHeader, CardMeta, Grid } from 'semantic-ui-react';

import IIssue from '../../../interfaces/IIssue';
import IDraggableItem from '../../../interfaces/IDraggableItem';

import ITEM_TYPES from '../../../data/types';

import styles from './styles';

type ICardProps = {
    issue: IIssue;
    order: number;
    changeIssuesOrder: (status: string, previousIndex: number, newIndex: number) => void;
}

const USER_ACCOUNT_LINK_TITLE = 'Link to user github account';
const ISSUE_LINK_TITLE = 'Link to issue github page';

const Card = (props: ICardProps) => {
    const { issue, order, changeIssuesOrder } = props;

    const draggableItem: IDraggableItem = {
        id: issue.id, 
        priority: order, 
        status: issue.status as string,
    }

    const[{ isDragging }, dragRef] = useDrag({
        type: ITEM_TYPES.CARD,
        item: draggableItem,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
    });

    const[, dropRef] = useDrop({
        accept: ITEM_TYPES.CARD,
        collect: monitor => ({
            isOver: monitor.isOver()
        }),
        
        drop: (item: any) => {
            const droppedItem = item as IDraggableItem;
             if (issue.status === item.status) {
                changeIssuesOrder(String(issue.status), droppedItem.priority, Number(issue!.priority));
             }
        },
    });

    const dateWrapper = () => {
        return `#${issue.number} opened ${moment([issue.created_at]).toNow()} ago`;
    }

    return (
        <div ref={dragRef} style={styles.container}>
            <div ref={dropRef} style={isDragging ? styles.underDraggableContainer : styles.draggableContainer}> 
                    <CardWrapper.Content>
                        <CardHeader style={styles.title}>
                            <a href={issue.html_url} title={ISSUE_LINK_TITLE} >
                                {issue.title}
                            </a>
                        </CardHeader>
                        <CardMeta style={styles.date}>{dateWrapper()}</CardMeta>
                        <CardWrapper.Description style={styles.discription}>
                            <Grid columns={3} style={styles.dataColumnsWrapper}>
                                <Grid.Column style={styles.dataColumns}>
                                    <a href={issue.user.html_url} title={USER_ACCOUNT_LINK_TITLE}>
                                        {issue.user.login}
                                    </a>
                                </Grid.Column>
                                <Grid.Column style={styles.dataColumns}>|</Grid.Column>
                                <Grid.Column style={styles.dataColumns}>{`Comments: ${issue.comments}`}</Grid.Column>
                            </Grid>
                        </CardWrapper.Description>
                    </CardWrapper.Content>
            </div>
        </div>
    );
}

export default Card;