import { combineReducers } from "redux";
import kanbanBoardPageReducer from "../containers/KanbanBoardPage/redux/reducer";

const rootReduser = combineReducers({
    kanbanBoardPageReducer,
});
export default rootReduser;
export type RootState = ReturnType<typeof rootReduser>;