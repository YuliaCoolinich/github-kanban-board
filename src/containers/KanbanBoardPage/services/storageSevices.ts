import IColumn from '../../../interfaces/IColumn';
import storage from '../../../data/casheStorage';

export const save = (url: string, columns: IColumn[]) => {
    if (!storage.getItem(url)) {
       storage.setItem(url, JSON.stringify(columns));
    }
};

export const isSaved = (url: string): boolean => {
    return !!storage.getItem(url);
}

export const extractSaved = (url: string): IColumn[] => {
    const storedColumns = storage.getItem(url);
    if (!storedColumns) 
        throw new Error("error");

    const storedObject: IColumn[] = JSON.parse(storedColumns);
    return storedObject;
};

export const update = (url: string, columns: IColumn[]) => {
    if (!storage.getItem(url)) {
        console.log('error - no saved repository before');
    } else {
        storage.setItem(url, JSON.stringify(columns));
    }
}
