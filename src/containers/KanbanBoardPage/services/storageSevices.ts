import IColumn from '../../../interfaces/IColumn';
import storage from '../../../data/casheStorage';

import ServiceError from '../errors/ServiceError';
import { ERROR_STORAGE_SERVICE_TYPES as ERROR_TYPES } from '../errors/errorTypes';

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
    if (!storedColumns) {
        throw new ServiceError(ERROR_TYPES.REPOSITORY_NOT_FOUND);
    }

    const storedObject: IColumn[] = JSON.parse(storedColumns);
    return storedObject;
};

export const update = (url: string, columns: IColumn[]) => {
    if (!storage.getItem(url)) {
        throw new ServiceError(ERROR_TYPES.REPOSITORY_NOT_FOUND);
    }
    
    storage.setItem(url, JSON.stringify(columns));
}
