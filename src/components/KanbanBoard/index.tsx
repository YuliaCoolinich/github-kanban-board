import { Segment } from 'semantic-ui-react';
import Column from '../Column';
import { ICard } from '../Card';
import styles from './styles';

const KanbanBoard = () => {
    const card1: ICard = {
        title: "Some isue title",
        index: "315",
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 2,
      };
      const card2: ICard = {
        title: "Some another isue title",
        index: "316",
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 4,
      };
      const cards: ICard[] = [];
      cards.push(card1);
      cards.push(card2);

    return(
        <Segment style={styles.segment}>
            <Column title={'To-do'} cards={cards} />
            <Column title={'In Progress'} cards={cards} />
            <Column title={'Done'} cards={cards} />
        </Segment>

    );
}

export default KanbanBoard;
