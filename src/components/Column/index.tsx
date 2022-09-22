import { Container, Segment, Header } from 'semantic-ui-react';
import Card, { ICard } from '../Card';
import styles from './styles';

interface IColumn {
    title: string;
    cards: ICard[];
}
const Column = ( props: IColumn ) => {
    return (
        <Container style={styles.container}>
            <Header>{props.title}</Header>
            <Segment style={styles.cardSegment}>
                {
                    props.cards.length === 0 
                    ? <div>Empty list</div>
                    : props.cards.map(card => <Card {...card} key={card.index} />)}
            </Segment>
        </Container>
    );
};

export default Column;