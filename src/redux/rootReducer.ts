import { combineReducers } from "redux";
import kanbanBoardPageReducer from "../containers/KanbanBoardPage/redux/reducer";

const rootReducer = combineReducers({
    kanbanBoardPageReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;