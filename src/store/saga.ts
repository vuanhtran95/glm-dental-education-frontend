import { fork } from "redux-saga/effects";
import userSaga from "./user/saga";
import dialogSaga from "./dialog/saga";
import scenarioSaga from "./scenario/saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(dialogSaga);
  yield fork(scenarioSaga);
}
