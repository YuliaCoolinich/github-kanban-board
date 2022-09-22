import { Card, CardHeader, CardMeta, Divider, Grid } from 'semantic-ui-react';
import styles from './styles';

export interface ICard {
    title: string;
    index: string;
    author: string;
    daysNumber: number; // change to date
    comentsNumber: number;
}

const TaskCard = (props: ICard) => {
    return (
        <Card style={styles.container}>
           <Card.Content>
            <CardHeader style={styles.title}>{props.title}</CardHeader>
            <CardMeta style={styles.date}>#{props.index} opened {props.daysNumber} days ago</CardMeta>
            </Card.Content> 
            <Card.Content style={styles.dataLinks}>
                <Grid.Column>
                    {props.author}
                </Grid.Column>
                <Divider vertical>|</Divider> 
                <Grid.Column>
                    Comments: {props.comentsNumber}
                </Grid.Column>
            </Card.Content>
        </Card>
    );
}

export default TaskCard;