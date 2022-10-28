import IIssue from '../../../../interfaces/IIssue';
import IColumn from '../../../../interfaces/IColumn';
import actionTypes from '../actionTypesNames';

export interface getIssues {
    type: typeof actionTypes.ISSUES_GET_REQUEST,
    payload: {
        url: string,
    }
}


export interface getIssuesSuccess {
    type: typeof actionTypes.ISSUES_GET_SUCCESS,
    payload: {
        columns: IColumn[],
    }
}

export interface getIssuesFail {
    type: typeof actionTypes.ISSUES_GET_ERROR,
    payload: {
        message: string,
    }
}

///////////////////////////////////////////////////////

export interface setUrl {
    type: typeof actionTypes.URL_SET,
    payload: {
        url: string,
    }
}

///////////////////////////////////////////////////////

export interface changeIssueStatus {
    type: typeof actionTypes.STATUS_ISSUE_CHANGE,
    payload: {
        issueId: number,
        previousStatus: string,
        newStatus: string,
    }
}

export interface changeIssuesOrder {
    type: typeof actionTypes.ORDER_ISSUES_CHANGE,
    payload: {
        status: string, 
        previousIndex: number,
        newIndex: number,
    }
}

type IKanbanBoardPageActionTypes = getIssues | getIssuesSuccess | getIssuesFail | setUrl | changeIssueStatus | changeIssuesOrder;

export default IKanbanBoardPageActionTypes;