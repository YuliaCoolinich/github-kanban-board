import RequestMethods from "../constants/RequestMethods";

export default interface IRequestArgument {
    apiUrl: string;
    originServer: string;
    endpoint: string;
    type?: RequestMethods;
    query?: {
        [key: string]: string | number;
    };
    body?: {
        [key: string]: string;
    };
    params?: {
        [key: string]: string;
    }
}