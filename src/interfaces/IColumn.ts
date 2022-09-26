import ICard from "./ICard";
import IStatus from './IStatus';

interface IColumn {
    status: IStatus;
    cards: ICard[];
}

export default IColumn;