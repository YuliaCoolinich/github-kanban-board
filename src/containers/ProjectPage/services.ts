import { DOMAIN } from '../../data/urls';
import * as issuesService from '../../api/services/issuesService';
import IIssue from '../../interfaces/IIssue';

export const loadIssues = async (url: string): Promise<IIssue[]> => {
    const path: string = url.replace(DOMAIN, "");
    //console.log(path);
    const issues: IIssue[] = await issuesService.getIssues(path);
    //console.log(cards);
    return issues;
};