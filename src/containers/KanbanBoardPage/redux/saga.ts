import { call, put, takeEvery, all } from 'redux-saga/effects';
import IColumn from '../../../interfaces/IColumn';
import IIssue from '../../../interfaces/IIssue';
import { getIssues } from './interfaces/actionTypes';
import actionTypes from './actionTypesNames';
import * as actions from './actions';
import * as pageServices from '../services/issueServices';
import * as issuesService from '../services/issueServices';
import * as storageService from '../services/storageServices';

import { ERROR_API_SERVICE_TYPES as ERROR_TYPES } from '../errors/errorTypes';
import ServiceError from '../errors/ServiceError';

function* getIssuesSaga(action: getIssues) {
    try {
        const { url } = action.payload;

        yield put(actions.setIsLoading(true));

        const issues: IIssue[] = yield call(pageServices.loadIssues, url);
        let columns: IColumn[] = issuesService.filterIssues(issues);
        if (storageService.isSaved(url)) {
            console.log('use saved data');
            columns = storageService.extractSaved(url);
        } else {
            console.log('request new data');
            const issues: IIssue[] = yield call(pageServices.loadIssues, url);
            columns = issuesService.filterIssues(issues);
        }
        yield put(actions.getIssuesSuccess(columns));

        storageService.save(url, columns);

    } catch (error) {
        if (error instanceof ServiceError) {
            yield put(actions.getIssuesFail(error.message));
        } else {
            yield put(actions.getIssuesFail(ERROR_TYPES.INCORRECT_REQUEST));
        }
    } finally {
        yield put(actions.setIsLoading(false));
    }
}

function* watchGetIssues() {
    yield takeEvery(actionTypes.ISSUES_GET_REQUEST, getIssuesSaga);
}
export default function* KanbanBoardPageSaga() {
    yield all([ watchGetIssues() ]);
}