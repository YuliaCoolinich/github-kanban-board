import IKanbanBoardPageStore from "./interfaces/IKanbanBoardPageState";
import IKanbanBoardPageActionTypes from './interfaces/actionTypes';
import actionTypes from './actionTypesNames';

import initalState from "./initialState";
import * as issuesService from '../services';

const kanbanBoardPageReducer = (state: IKanbanBoardPageStore = initalState, action: IKanbanBoardPageActionTypes): IKanbanBoardPageStore => {
    console.log(action.type);
    switch (action.type) {
        case actionTypes.ISSUES_SET:
            return {
                ...state,
                errorMessage: '',
                columns: issuesService.filterIssues(action.payload.issues)
            };
        case actionTypes.URL_SET: 
            return {
                ...state,
                url: action.payload.url,
                errorMessage: '',
            }
        case actionTypes.STATUS_ISSUE_CHANGE: 
            return {
                ...state,
                columns: issuesService.changeIssueStatus(state.columns, action.payload.issueId, action.payload.previousStatus, action.payload.newStatus),
                errorMessage: '',
            }
        default:
            return state;
    }
}

export default kanbanBoardPageReducer;