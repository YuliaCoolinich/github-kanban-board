import IStatus from "./IStatus";

interface IDraggableItem {
    id: number;
    priority: number;
    status: string; // TO-DO change to IStatus
};

export default IDraggableItem;