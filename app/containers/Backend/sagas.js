import { take, takeEvery, call, put } from 'redux-saga/effects';
import { getList, getOne, create, update } from 'utils/httpClient';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  REQUEST_SEND,
  REQUEST_GET_ONE,
  REQUEST_GET_LIST,
  REQUEST_CREATE,
  REQUEST_REMOVE,
  REQUEST_UPDATE,
} from './constants';

const REQUEST_TYPES = {
  [REQUEST_GET_ONE]: getOne,
  [REQUEST_GET_LIST]: getList,
  [REQUEST_CREATE]: create,
  [REQUEST_UPDATE]: update,
};

export function* handleRequest(action) {
  const { subType, onStart, onSuccess, onError, path } = action;

  if (!path) throw Error('Missing resource path in request');

  const request = { resource: path };

  switch (subType) {
    case REQUEST_GET_ONE:
      request.id = action.id;
      break;
    case REQUEST_GET_LIST:
      request.params = action.params;
      break;
    case REQUEST_UPDATE:
      request.id = action.id;
      request.payload = action.payload;
      break;
    case REQUEST_CREATE:
      request.payload = action.payload;
      break;
    case REQUEST_REMOVE:
      request.id = action.id;
      break;
    default:
      throw Error(`Unknown action type "${subType}" for "${path}"`);
  }

  yield put({ type: onStart });

  try {
    const response = yield call(REQUEST_TYPES[subType], request);
    yield put({ type: onSuccess, data: response.data });
  } catch (error) {
    yield put({ type: onError, error });
  }
}

export default function* crudWatcher() {
  yield takeEvery(REQUEST_SEND, handleRequest);
  yield take(LOCATION_CHANGE);
}
