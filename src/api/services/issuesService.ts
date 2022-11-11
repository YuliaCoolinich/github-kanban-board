import * as apiService from '../apiServices/apiService';
import IIssue from '../../interfaces/IIssue';
import { API_URL } from '../../data/urls';

const ISSUES_PER_PAGE_MAX = 100;
const SORT_CREATED = 'created';
const DIRECTION_DESC = 'desc';

export const getAllIssues = async (url: string, per_page = ISSUES_PER_PAGE_MAX): Promise<IIssue[]> => {
    const endPoint = `repos/${url}/issues`;
    let page: number = 1;
    let response: IIssue[] = [];
    let issues: IIssue[] = [];
    do {
        response = await apiService.getRequest({
            apiUrl: API_URL,
            originServer: API_URL,
            endpoint: endPoint,
            query: {
                per_page,
                page,
            }
        });
        issues = [...issues, ...response];
        page++;

    } while (response.length);
    console.log(`number of issues received is ${issues.length}`);

    return issues;
}

export const getNewIssues = async (url: string, per_page = ISSUES_PER_PAGE_MAX): Promise<IIssue[]> => {
    const endPoint = `repos/${url}/issues`;
    const response: IIssue[] = await apiService.getRequest({
        apiUrl: API_URL,
        originServer: API_URL,
        endpoint: endPoint,
        query: {
            per_page,
            sort: SORT_CREATED,
            direction: DIRECTION_DESC
        }
    });
    console.log(`number of issues received is ${response.length}`);
    return response;
}