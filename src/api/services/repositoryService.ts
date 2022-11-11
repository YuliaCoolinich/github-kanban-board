import * as apiService from '../apiServices/apiService';
import { API_URL } from '../../data/urls';
import IRepository from '../../interfaces/IRepository';

export const getStarGazersCount = async (path: string): Promise<number> => {
    const endPoint = `repos/${path}`;
    const response: IRepository = await apiService.getRequest({
        apiUrl: API_URL,
        originServer: API_URL,
        endpoint: endPoint,
    });
    const starGazersCount: number = response.stargazers_count;
    return starGazersCount;
}