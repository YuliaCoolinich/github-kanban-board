import IKanbanBoardPageStore from "./interfaces/IKanbanBoardPageState";
import IKanbanBoardPageActionTypes from './interfaces/actionTypes';
import actionTypes from './actionTypesNames';

import initalState from "./initialState";

const kanbanBoardPageReducer = (state: IKanbanBoardPageStore = initalState, action: IKanbanBoardPageActionTypes): IKanbanBoardPageStore => {
    console.log(action.type);
    switch (action.type) {
        case actionTypes.ISSUES_SET:
            return {
                ...state,
                issues: action.payload.issues,
                errorMessage: ''
            };
        case actionTypes.URL_SET: 
            return {
                ...state,
                url: action.payload.url,
                errorMessage: '',
            }
        default:
            return state;
    }
}

export default kanbanBoardPageReducer;