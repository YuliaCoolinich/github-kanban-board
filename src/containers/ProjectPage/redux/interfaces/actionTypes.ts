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

type IKanbanBoardPageActionTypes = setIssues | setUrl;

export default IKanbanBoardPageActionTypes;