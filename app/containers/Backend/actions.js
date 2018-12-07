import {
  REQUEST_SEND,
  REQUEST_GET_ONE,
  REQUEST_GET_LIST,
  REQUEST_UPDATE,
  REQUEST_CREATE,
  REQUEST_REMOVE,
} from './constants';

export function getOne(requestParams) {
  return sendRequest({
    subType: REQUEST_GET_ONE,
    ...requestParams,
  });
}

export function getList(requestParams) {
  return sendRequest({
    subType: REQUEST_GET_LIST,
    ...requestParams,
  });
}

export function create(requestParams) {
  return sendRequest({
    subType: REQUEST_CREATE,
    ...requestParams,
  });
}

export function update(requestParams) {
  return sendRequest({
    subType: REQUEST_UPDATE,
    ...requestParams,
  });
}

export function remove(requestParams) {
  return sendRequest({
    subType: REQUEST_REMOVE,
    ...requestParams,
  });
}

export function sendRequest(props) {
  return {
    type: REQUEST_SEND,
    ...props,
  };
}
