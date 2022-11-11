import { DOMAIN } from '../../../data/urls';
import * as issuesService from '../../../api/services/issuesService';
import IIssue from '../../../interfaces/IIssue';

import CARD_STATUSES, { STATUS, STATUS_API } from '../../../data/statuses';
import IStatus from '../../../interfaces/IStatus';
import IColumn from '../../../interfaces/IColumn';

import ServiceError from '../errors/ServiceError';
import { ERROR_ISSUE_SERVICE_TYPES as ERROR_TYPES } from '../errors/errorTypes';

export const loadIssues = async (url: string): Promise<IIssue[]> => {
    const path: string = url.replace(DOMAIN, "");

    const receivedIssues: IIssue[] = await issuesService.getNewIssues(path);
    const issues: IIssue[] = mapIssues(receivedIssues);
    return issues;
};

const mapIssues = (receivedIssues: IIssue[]): IIssue[] => (
    receivedIssues.map(issue => ({
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

    columns.forEach(column => {
        column.cards.forEach(card => card.status = column.status.title);
        updateCardsPriority(column);
    });
    return columns;
}

const updateCardsPriority = (column: IColumn): void => {
    column.cards.forEach((card, index) => card.priority = index);
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
    const columnFrom: IColumn | undefined = columns.find(column => column.status.title === previousStatus);
    if (!columnFrom) {
        throw new ServiceError(ERROR_TYPES.COLUMN_NOT_FOUND);
    }
    const columnTo: IColumn | undefined = columns.find(column => column.status.title === newStatus);
    if (!columnTo) {
        throw new ServiceError(ERROR_TYPES.COLUMN_NOT_FOUND);
    }
    const issueIndex: number = columnFrom.cards.findIndex(issue => issue.id === issueId);
    if (issueIndex === -1) {
        throw new ServiceError(ERROR_TYPES.ISSUE_NOT_FOUND);
    }

    const changedIssue: IIssue = columnFrom.cards[issueIndex];
    changedIssue.status = newStatus;
    
    columnFrom.cards.splice(issueIndex, 1);
    columnTo.cards.push(changedIssue);

    updateCardsPriority(columnFrom);
    updateCardsPriority(columnTo);
    return columns;
}

export const changeIssueOrder = (columns: IColumn[], status: string, previousIndex: number, newIndex: number): IColumn[] => {
    const issuesChangedOrder: IIssue[]  = columns.find(column => column.status.title === status)?.cards as IIssue[];
    if (!issuesChangedOrder.length) {
        throw new ServiceError(ERROR_TYPES.INCORRECT_ISSUE_COUNT);
    }
    const movedCard: IIssue = issuesChangedOrder[previousIndex];

    issuesChangedOrder.splice(previousIndex, 1);
    issuesChangedOrder.splice(newIndex, 0, movedCard);
    issuesChangedOrder.forEach((card, index) => card.priority = index);

    const updatedColumns: IColumn[] = columns.map(column => {
        if (column.status.title === status) column.cards = issuesChangedOrder;
        return column;
    });
    return updatedColumns;
}