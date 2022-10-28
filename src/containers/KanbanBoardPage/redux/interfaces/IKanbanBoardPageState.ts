import IColumn from "../../../../interfaces/IColumn"

export default interface IKanbanBoardPageState {
    columns: IColumn[];
    url: string;
    errorMessage: string;
    isLoading: boolean;
};