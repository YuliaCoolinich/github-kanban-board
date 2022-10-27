import KanbanBoard from '../../components/KanbanBoard';
import Navigation from '../../components/Navigation';

import useActions from './hooks/useActions';
import useTypedSelector from './hooks/useTypedSelector';

import * as storageService from './services/storageSevices';

// https://github.com/facebook/react

const KanbanBoardPage = () => {
    const actions = useActions();
    const state = useTypedSelector(state => state.kanbanBoardPageReducer);

    const handleInputUrl = (url: string) => {
        actions.setUrl(url);
    }

    const handleLoadIssues = async () => {
        actions.getIssues(state.url);
    }
    const changeIssueStatus = (issueId: number, previousStatus: string, newStatus: string) => {
        actions.changeIssueStatus(issueId, previousStatus, newStatus);
        storageService.update(state.url, state.columns);
    }

    const changeIssuesOrder = (status: string, previousIndex: number, newIndex: number) => {
        actions.changeIssuesOrder(status, previousIndex, newIndex);
        storageService.update(state.url, state.columns);
    }

    // TO-DO add error message block
    return (
        <>
            <Navigation 
                url={state.url}
                setUrl={handleInputUrl}
                loadIssues={handleLoadIssues}
            />
            <KanbanBoard 
                columns={state.columns} 
                changeIssueStatus={changeIssueStatus}
                changeIssuesOrder={changeIssuesOrder}
            />
        </>
    )
};

export default KanbanBoardPage;