import { useState } from 'react';
import KanbanBoard from '../../components/KanbanBoard';
import Navigation from '../../components/Navigation';

import IIssue from '../../interfaces/IIssue';

import * as pageServices from './services';

// const MOCKED_URL = `${DOMAIN}facebook/react`;
// https://github.com/facebook/react

const ProjectPage = () => {
    const [url, setUrl] = useState<string>("");
    const [issues, setIssues] = useState<IIssue[]>([]);

    const handleLoadIssues = async () => {
        const issues: IIssue[] = await pageServices.loadIssues(url);
        setIssues(issues);
    }

    return (
        <>
            <Navigation 
                url={url}
                setUrl={setUrl}
                loadIssues={handleLoadIssues}
            />
            <KanbanBoard issues={issues} />
        </>
    )
};

export default ProjectPage;