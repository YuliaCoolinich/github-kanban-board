import IIssue from "../../../../interfaces/IIssue";

export default interface IKanbanBoardPageState {
    issues: IIssue[];
    url: string;
    errorMessage: string;
};