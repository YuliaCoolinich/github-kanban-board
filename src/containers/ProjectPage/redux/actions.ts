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