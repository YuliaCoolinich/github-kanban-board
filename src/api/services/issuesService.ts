import * as apiService from '../apiServices/apiService';
import ICard from '../../interfaces/IIssue';
import { API_URL } from '../../data/urls';

const ISSUES_PER_PAGE_MAX = 100;

export const getIssues = async (url: string, per_page = ISSUES_PER_PAGE_MAX): Promise<ICard[]> => {
    const endPoint = `repos/${url}/issues`;
    const response: ICard[] = await apiService.getRequest({
        apiUrl: API_URL,
        originServer: API_URL,
        endpoint: endPoint,
        query: {
            per_page
        }
    });
    return response;
}