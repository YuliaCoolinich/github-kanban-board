import IStatus from "../interfaces/IStatus";

export const STATUS = {
    TO_D0: "ToDo",
    IN_PROGRESS: "In Progress",
    DONE: "Done"
};

export const STATUS_API = {
    OPEN: 'open',
    CLOSE: 'close',
    ALL: 'all',
}

const CARD_STATUSES: IStatus[] = [{
    title: STATUS.TO_D0,
    value: STATUS_API.OPEN,
    id: 0,
}, {
    title: STATUS.IN_PROGRESS,
    value: STATUS_API.OPEN,
    id: 1,
}, {
    title: STATUS.DONE,
    value: STATUS_API.CLOSE,
    id: 2
}
];

export default CARD_STATUSES;