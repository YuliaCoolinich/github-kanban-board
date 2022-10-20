import { DOMAIN } from '../../data/urls';
import * as issuesService from '../../api/services/issuesService';
import IIssue from '../../interfaces/IIssue';

import CARD_STATUSES, { STATUS, STATUS_API } from '../../data/statuses';
import IStatus from '../../interfaces/IStatus';
import IColumn from '../../interfaces/IColumn';

export const loadIssues = async (url: string): Promise<IIssue[]> => {
    const path: string = url.replace(DOMAIN, "");

    // TO-DO load all issues from all pages
    const recivedIssues: IIssue[] = await issuesService.getIssues(path);
    const issues: IIssue[] = mapIssues(recivedIssues);
    console.log(issues);
    return issues;
};

const mapIssues = (recivedIssues: IIssue[]): IIssue[] => (
    recivedIssues.map(issue => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        html_url: issue.html_url,
        state: issue.state,
        user: {
                id: issue.user.id,
                login: issue.user.login,
                avatar_url: issue.user.avatar_url,
                html_url: issue.user.html_url
            },
        assignee: issue.assignee 
            ? {
                id: issue.assignee.id,
                login: issue.assignee.login,
                avatar_url: issue.assignee.avatar_url,
                html_url: issue.assignee.html_url
            }
            : undefined,
        comments: issue.comments,
        created_at: issue.created_at
    })
    )
);

export const filterIssues =  (issues: IIssue[]): IColumn[] => {
    const columns: IColumn[] = CARD_STATUSES.map(status => ({ 
        status,
        cards: filterIssuesByStatus(issues, status)
    }));

    columns.forEach(column => column.cards.forEach(card => card.status = column.status.title));
    return columns;
}

const filterIssuesByStatus = (issues: IIssue[], status: IStatus): IIssue[] => { 
   switch(status.title) {
        case STATUS.TO_D0: 
            return issues.filter(card => (card.state === STATUS_API.OPEN && !card.assignee));
        case STATUS.IN_PROGRESS: 
            return issues.filter(card => (card.state === STATUS_API.OPEN && card.assignee));
        case STATUS.DONE: 
            return issues.filter(card => card.state === STATUS_API.CLOSE);
        default:
            return [];
    }
};


export const changeIssueStatus = (columns: IColumn[], issueId: number, previousStatus: string, newStatus: string): IColumn[] => {
    const columnFrom: IColumn = columns.find(column => column.status.title === previousStatus) as IColumn;
    const columnTo: IColumn = columns.find(column => column.status.title === newStatus) as IColumn;
    const issueIndex: number = columnFrom?.cards.findIndex(issue => issue.id === issueId);

    const changedIssue: IIssue = columnFrom.cards[issueIndex];
    changedIssue.status = newStatus;
    
    columnFrom.cards.splice(issueIndex, 1);
    columnTo.cards.push(changedIssue);
    return columns;

}