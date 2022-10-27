import { all } from 'redux-saga/effects';
import KanbanBoardPageSaga from '../containers/KanbanBoardPage/redux/saga';

export default function* rootSaga() {
    yield all([ KanbanBoardPageSaga() ]);
};