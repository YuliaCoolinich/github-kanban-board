import IColumn from "../../../interfaces/IColumn";
import IIssue from "../../../interfaces/IIssue";
import IStatus from "../../../interfaces/IStatus";

import ServiceError from '../errors/ServiceError';
import { ERROR_ISSUE_SERVICE_TYPES as ERROR_TYPES } from '../errors/errorTypes';

import * as services from "../services/issueServices";

import { STATUS } from '../../../data/statuses';

const moockedUrl = 'https://github.com/facebook/react';
const moockedIncorrectUrl = 'https://github.com/notfacebook/notreact';

const issueOpenWithAssignee: IIssue = {
    id: 123,
    number: 25661,
    title: "Some new bug with assignee",
    html_url: "https://github.com/facebook/react/issues/25661",
    state: 'open',
    user: {
            id: 123456,
            login: "IlonMask",
            avatar_url: "https://github.com/IlonMask",
            html_url: "https://github.com/IlonMask"
    },
    assignee: {
            id: 123456,
            login: "IlonMask",
            avatar_url: "https://github.com/IlonMask",
            html_url: "https://github.com/IlonMask"
    },
    comments: 0,
    created_at: "2022-11-10T16:40:39Z"
};
const issueOpenWithoutAssignee: IIssue = {
    id: 456,
    number: 256689,
    title: "Some new bug without assignee",
    html_url: "https://github.com/facebook/react/issues/256689",
    state: 'open',
    user: {
            id: 123456,
            login: "IlonMask",
            avatar_url: "https://github.com/IlonMask",
            html_url: "https://github.com/IlonMask"
    },
    assignee: undefined,
    comments: 0,
    created_at: "2022-11-10T16:40:39Z"
};
const issueClosedWithoutAssignee: IIssue = {
    id: 456,
    number: 256689,
    title: "Some closed task without assignee",
    html_url: "https://github.com/facebook/react/issues/256689",
    state: 'close',
    user: {
            id: 123456,
            login: "IlonMask",
            avatar_url: "https://github.com/IlonMask",
            html_url: "https://github.com/IlonMask"
    },
    assignee: undefined,
    comments: 0,
    created_at: "2022-11-10T16:40:39Z"
};

const statusTO_DO: IStatus = {
    title: STATUS.TO_D0,
    id: 0,
};
const statusIN_PROGRESS: IStatus = {
    title: STATUS.IN_PROGRESS,
    id: 1,
};
const statusDONE: IStatus = {
    title: STATUS.DONE,
    id: 2,
};
const mockedReceivedIssues: IIssue[] = [issueOpenWithAssignee, issueOpenWithoutAssignee, issueClosedWithoutAssignee];
const filteredIssuesToColumns: IColumn[] = [{
        status: statusTO_DO,
        cards: [issueOpenWithoutAssignee]
    }, {
        status: statusIN_PROGRESS,
        cards: [issueOpenWithAssignee]
    }, {
        status: statusDONE,
        cards: [issueClosedWithoutAssignee]
    }
];

afterEach(() => {
    jest.restoreAllMocks();
});

describe("Issue services unit tests", () => {
    it("shouldn't load issues when request ones with incorrect url", async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 400,
            json: () => Promise.resolve({ success: false }),
        }),
        ) as jest.Mock;

        await expect(services.loadIssues(moockedIncorrectUrl)).rejects.toThrowError('Incorrect request');
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    it("should load all issues when request ones with correct url", async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve(mockedReceivedIssues),
        }),
        ) as jest.Mock;

        await expect(services.loadIssues(moockedUrl)).resolves.toStrictEqual(mockedReceivedIssues);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    it("should filter by columns", () => {
        const filter = jest.spyOn(services, "filterIssues");

        services.filterIssues(mockedReceivedIssues);

        expect(filter).toBeCalled();
        expect(filter).toReturnWith(filteredIssuesToColumns);;
    });
    it("should change issue status ", () => {
        const changeStatus = jest.spyOn(services, "changeIssueStatus");
        const columnsBefore: IColumn[] = [{
            status: statusTO_DO,
            cards: [issueOpenWithoutAssignee]
        }, {
            status: statusIN_PROGRESS,
            cards: [issueOpenWithAssignee] // change the status of this issue to DONE
        }, {
            status: statusDONE,
            cards: [issueClosedWithoutAssignee]
        }];

        const columnsAfter: IColumn[] = [{
            status: statusTO_DO,
            cards: [issueOpenWithoutAssignee]
        }, {
            status: statusIN_PROGRESS,
            cards: [] // changed IN PROGRESS column
        }, {
            status: statusDONE,
            cards: [issueClosedWithoutAssignee, issueOpenWithAssignee] // changed DONE column
        }];

        services.changeIssueStatus(columnsBefore, issueOpenWithAssignee.id, STATUS.IN_PROGRESS, STATUS.DONE);

        expect(changeStatus).toBeCalled();
        expect(changeStatus).toReturnWith(columnsAfter);
    });
    it("should throw ServerError when changeIssueStatus function can not find from which column should change the status of the card", () => {
        const columnsBefore: IColumn[] = [{
            status: statusTO_DO,
            cards: [issueOpenWithoutAssignee]
        }, {
            status: statusIN_PROGRESS,
            cards: [issueOpenWithAssignee]
        }, {
            status: statusDONE,
            cards: [issueClosedWithoutAssignee]
        }];

        try {
            services.changeIssueStatus(columnsBefore, issueOpenWithAssignee.id, 'SomeRandomStatus', STATUS.DONE);
        } catch(error) {
            expect(error).toBeInstanceOf(ServiceError);
            expect(error).toHaveProperty('message', ERROR_TYPES.COLUMN_NOT_FOUND);
        }
    });
    it("should throw ServerError when changeIssueStatus function can not find to which column should change the status of the card", () => {
        const columnsBefore: IColumn[] = [{
            status: statusTO_DO,
            cards: [issueOpenWithoutAssignee]
        }, {
            status: statusIN_PROGRESS,
            cards: [issueOpenWithAssignee]
        }, {
            status: statusDONE,
            cards: [issueClosedWithoutAssignee]
        }];

        try {
            services.changeIssueStatus(columnsBefore, issueOpenWithAssignee.id, STATUS.IN_PROGRESS, 'SomeRandomStatus');
        } catch(error) {
            expect(error).toBeInstanceOf(ServiceError);
            expect(error).toHaveProperty('message', ERROR_TYPES.COLUMN_NOT_FOUND);
        }
    });
    it("should throw ServerError when changeIssueStatus function can not find issue id in columns", () => {
        const someRandomId = 123456789;
        const columnsBefore: IColumn[] = [{
            status: statusTO_DO,
            cards: [issueOpenWithoutAssignee]
        }, {
            status: statusIN_PROGRESS,
            cards: [issueOpenWithAssignee]
        }, {
            status: statusDONE,
            cards: [issueClosedWithoutAssignee]
        }];

        try {
            services.changeIssueStatus(columnsBefore, someRandomId, STATUS.IN_PROGRESS, STATUS.DONE);
        } catch(error) {
            expect(error).toBeInstanceOf(ServiceError);
            expect(error).toHaveProperty('message', ERROR_TYPES.ISSUE_NOT_FOUND);
        }
    });
    it("should change the issue order from 0 to 1 and vice versa", () => {
        const changeOrder = jest.spyOn(services, "changeIssueOrder");
        const columnsBefore: IColumn[] = [{
                status: statusTO_DO,
                cards: [issueOpenWithoutAssignee]
            }, {
                status: statusIN_PROGRESS,
                cards: []
            }, {
                status: statusDONE,
                cards: [issueClosedWithoutAssignee, issueOpenWithAssignee] // change issueOpenWithAssignee to 0 position
        }];
        const columnsAfter: IColumn[] = [{
            status: statusTO_DO,
            cards: [issueOpenWithoutAssignee]
        }, {
            status: statusIN_PROGRESS,
            cards: []
        }, {
            status: statusDONE,
            cards: [issueOpenWithAssignee, issueClosedWithoutAssignee] // result position of issueOpenWithAssignee is 0
        }];

        services.changeIssueOrder(columnsBefore, STATUS.DONE, 0, 1);

        expect(changeOrder).toBeCalled();
        expect(changeOrder).toReturnWith(columnsAfter);

        services.changeIssueOrder(columnsAfter, STATUS.DONE, 1, 0);

        expect(changeOrder).toBeCalled();
        expect(changeOrder).toReturnWith(columnsBefore);
    });

});