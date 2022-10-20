import { useReducer } from 'react';
import KanbanBoard from '../../components/KanbanBoard';
import Navigation from '../../components/Navigation';

import IIssue from '../../interfaces/IIssue';
import kanbanBoardPageReducer from './redux/reducer';
import actionTypes from './redux/actionTypesNames';

import initialState from "./redux/initialState";

import * as pageServices from './services';

// const MOCKED_URL = `${DOMAIN}facebook/react`;
// https://github.com/facebook/react

const ProjectPage = () => {
    // const [url, setUrl] = useState<string>("");
    // const [issues, setIssues] = useState<IIssue[]>([]);

    const [state, dispatch] = useReducer(kanbanBoardPageReducer, initialState);

    const handleInputUrl = (url: string) => {
        dispatch({ type: actionTypes.URL_SET, payload: { url }});
    }

    const handleLoadIssues = async () => {
        const issues: IIssue[] = await pageServices.loadIssues(state.url);
        //setIssues(issues);
        dispatch({ type: actionTypes.ISSUES_SET, payload: { issues }});
    }
    const changeIssueStatus = (issueId: number, previousStatus: string, newStatus: string) => {
        dispatch({ type: actionTypes.STATUS_ISSUE_CHANGE, payload: { issueId, previousStatus, newStatus }});
    }

    return (
        <>
            <Navigation 
                url={state.url}
                setUrl={handleInputUrl}
                loadIssues={handleLoadIssues}
            />
            <KanbanBoard columns={state.columns} changeIssueStatus={changeIssueStatus} />
        </>
    )
};

export default ProjectPage;