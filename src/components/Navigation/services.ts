import ISection from '../../interfaces/ISection';
import { DOMAIN } from '../../data/urls';
import ValidationError from './errors/ValidationError';
import { ERROR_VALIDATION_TYPES } from '../Navigation/errors/errorTypes';
import * as issuesService from '../../api/services/issuesService';
import * as repositoryService from '../../api/services/repositoryService';

export const getStarGazersCount = async (url: string) => {
    const path: string = url.replace(DOMAIN, "");
    const starGazersCount: number = await repositoryService.getStarGazersCount(path);
    return starGazersCount;
  };

export const parseUrl = (url: string): ISection[] | undefined => {
    if (isCorrectUrl(url)) {
        const path: string[] = url.replace(DOMAIN, "").split('/');
    
        const sections: ISection[] = path.reduce((accumulator, segment, index ) => {
            const section: ISection = {
                key: segment,
                content: uppercasedFirstLetter(segment),
                active: index === path.length - 1,
                href: getSegmentUrl(path, index),
            };
            accumulator = [...accumulator, section];
            return accumulator;
        }, [] as ISection[]);
        return sections;
    }
};

const isCorrectUrl = (url: string): boolean => {
    const regex = new RegExp(/([\/])\1|^[\/]/);
    const path: string = url.replace(DOMAIN, "");
    if (path.length === url.length) {
        throw new ValidationError(ERROR_VALIDATION_TYPES.INCORRECT_DOMAIN); 
    }

    const isIncorrectUrl: boolean = regex.test(path);
    if (isIncorrectUrl) {
        throw new ValidationError(ERROR_VALIDATION_TYPES.EXTRA_SLASH); 
    }
    return !isIncorrectUrl;
}

const uppercasedFirstLetter = (word: string) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`

const getSegmentUrl = (path: string[], sectionIndex: number) => `${DOMAIN}${path.filter((value, i) => i <= sectionIndex ? value : '').join('/')}`
