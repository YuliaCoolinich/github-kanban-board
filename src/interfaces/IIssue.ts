import IUser from './IUser';

interface IIssue {
    id: number;
    title: string;
    state: string; // TO-DO Status type
    priority?: number;
    number: number;
    html_url: string;
    comments: number;
    created_at: string;
    user: IUser,
    assignee?: IUser;
}

export default IIssue;