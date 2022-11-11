import IKanbanBoardPageState from "./interfaces/IKanbanBoardPageState";

const initialState: IKanbanBoardPageState = {
    columns: [],
    url: '',
    errorMessage: '',
    isLoading: false,
}

export default initialState;