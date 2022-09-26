import { STATUS } from './statuses';
import ICard from '../interfaces/ICard';

const cards: ICard[] = [
    {
        title: "Some isue title",
        id: 315,
        status: STATUS.TO_D0, 
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 2,
    }, {
        title: "Some another issue title",
        id: 316,
        status: STATUS.TO_D0, 
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 4,
    }, {
        title: "Some another issue title",
        id: 317,
        status: STATUS.TO_D0, 
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 4,
    }, {
        title: "Some another issue title",
        id: 318,
        status: STATUS.TO_D0, 
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 4,
    }, {
        title: "Some another issue title",
        id: 319,
        status: STATUS.IN_PROGRESS, 
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 4,
    }, {
        title: "Some another issue title",
        id: 320,
        status: STATUS.DONE, 
        author: "Admin",
        comentsNumber: 3,
        daysNumber: 4,
}];

export default cards;