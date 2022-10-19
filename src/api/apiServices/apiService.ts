import * as apiHelper from './apiHelper';
import IRequestArgument from './interfaces/IRequestArgument';
import RequestMethods from './constants/RequestMethods';

const sendRequest = async (apiArgs: IRequestArgument): Promise<any> => {
    const response: Response = await apiHelper.callApi(apiArgs);
   
    const result = await response.json();
    console.log(result);
    return result;
}

export const getRequest = async (args: IRequestArgument): Promise<any> => {
    console.log(args);
    const apiArgs: IRequestArgument = {
        ...args,
        type: RequestMethods.GET,
    };
    return await sendRequest(apiArgs);
}