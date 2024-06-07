import { fork } from 'redux-saga/effects';
import userSaga from './users/saga';

export default function* rootSaga() {
  yield fork(userSaga);
  // yield fork(saga2);
  // yield fork(saga3);
  // code after fork-effect
}
