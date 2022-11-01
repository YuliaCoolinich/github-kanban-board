import actionTypes from './actionTypesNames';
import IKanbanBoardPageActionTypes from './interfaces/actionTypes';
import IColumn from '../../../interfaces/IColumn';

export const getIssues = (url: string): IKanbanBoardPageActionTypes => ({
    type: actionTypes.ISSUES_GET_REQUEST,
    payload: {
        url
    }
});

export const getIssuesSuccess = (columns: IColumn[]): IKanbanBoardPageActionTypes => ({
    type: actionTypes.ISSUES_GET_SUCCESS,
    payload: {
        columns
    }
});

export const getIssuesFail = (message: string): IKanbanBoardPageActionTypes => ({
    type: actionTypes.ISSUES_GET_ERROR,
    payload: {
        message
    }
})

///////////////////////////////////////////////////////////////////////////////////////

export const setUrl = (url: string): IKanbanBoardPageActionTypes => ({
    type: actionTypes.URL_SET,
    payload: {
        url
    }
});

///////////////////////////////////////////////////////////////////////////////////////

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

export const setIsLoading = (isLoading: boolean) : IKanbanBoardPageActionTypes => ({
    type: actionTypes.LOADING_SET,
    payload: {
        isLoading
    }
});