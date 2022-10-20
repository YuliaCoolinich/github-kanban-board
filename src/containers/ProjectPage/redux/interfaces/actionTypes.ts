import IIssue from '../../../../interfaces/IIssue';
import actionTypes from '../actionTypesNames';

export interface setIssues {
    type: typeof actionTypes.ISSUES_SET,
    payload: {
        issues: IIssue[],
    }
}

export interface setUrl {
    type: typeof actionTypes.URL_SET,
    payload: {
        url: string,
    }
}

export interface changeIssueStatus {
    type: typeof actionTypes.STATUS_ISSUE_CHANGE,
    payload: {
        issueId: number,
        previousStatus: string,
        newStatus: string,
    }
}

type IKanbanBoardPageActionTypes = setIssues | setUrl | changeIssueStatus;

export default IKanbanBoardPageActionTypes;