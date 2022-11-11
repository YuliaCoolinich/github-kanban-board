import IKanbanBoardPageStore from "./interfaces/IKanbanBoardPageState";
import IKanbanBoardPageActionTypes from './interfaces/actionTypes';
import actionTypes from './actionTypesNames';

import initialState from "./initialState";
import * as issuesService from '../services/issueServices';

const kanbanBoardPageReducer = (state: IKanbanBoardPageStore = initialState, action: IKanbanBoardPageActionTypes): IKanbanBoardPageStore => {
    console.log(action.type);
    switch (action.type) {
        case actionTypes.ISSUES_GET_SUCCESS:
            return {
                ...state,
                errorMessage: '',
                columns: action.payload.columns
            };
        case actionTypes.ISSUES_GET_ERROR:
            return {
                ...state,
                columns: [],
                errorMessage: action.payload.message
            }
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
        case actionTypes.ORDER_ISSUES_CHANGE: 
            return {
                ...state,
                columns: issuesService.changeIssueOrder(state.columns, action.payload.status, action.payload.previousIndex, action.payload.newIndex),
            }
        case actionTypes.LOADING_SET:
            return {
                ...state,
                isLoading: action.payload.isLoading,
            }
        default:
            return state;
    }
}

export default kanbanBoardPageReducer;