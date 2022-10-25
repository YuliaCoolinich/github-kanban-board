import actionTypes from './actionTypesNames';
import IKanbanBoardPageActionTypes from './interfaces/actionTypes';
import IIssue from '../../../interfaces/IIssue';

export const setIssues = (issues: IIssue[]): IKanbanBoardPageActionTypes => ({
    type: actionTypes.ISSUES_SET,
    payload: {
        issues
    }
});

export const setUrl = (url: string): IKanbanBoardPageActionTypes => ({
    type: actionTypes.URL_SET,
    payload: {
        url
    }
});

export const changeIssueStatus = (issueId: number,  previousStatus: string, newStatus: string): IKanbanBoardPageActionTypes => ({
    type: actionTypes.STATUS_ISSUE_CHANGE,
    payload: {
        issueId, 
        previousStatus,
        newStatus
    }
});

export const changeIssuesOrder = (status: string, previousIndex: number, newIndex: number): IKanbanBoardPageActionTypes => ({
    type: actionTypes.ORDER_ISSUES_CHANGE,
    payload: {
        status,
        previousIndex,
        newIndex
    }
});