import * as queryString from "query-string";
import IRequestArgument from "./interfaces/IRequestArgument";

import ServiceError from "../../containers/KanbanBoardPage/errors/ServiceError";

export async function callApi(args: IRequestArgument): Promise<Response> {
    const result: Response = await fetch(createRequest(args));

    if( !result.ok) {
        const resultJSON = await result.json();
        throw new ServiceError(resultJSON.error?.message);
    }

    return result;
}

const createRequest = (args: IRequestArgument): Request => {
    return new Request(getURL(args), {
        method: args.type,
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
            'Origin': args.originServer,
        },
        body: JSON.stringify(args.body),
        mode: 'cors',
    });
}

const getURL = (args: IRequestArgument): string => {
    return (
        args.apiUrl +
        args.endpoint +
        (args.query ? `?${queryString.stringify(args.query)}` : "")
    )
}