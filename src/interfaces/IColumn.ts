import IIssue from "./IIssue";
import IStatus from './IStatus';

interface IColumn {
    status: IStatus;
    cards: IIssue[];
}

export default IColumn;