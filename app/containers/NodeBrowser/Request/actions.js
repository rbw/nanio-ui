import { create } from '../../Backend/actions';
import {
  REQUEST_SET,
  LOAD_REQUESTED,
  LOAD_RESOLVED,
  LOAD_REJECTED,
} from './constants';

export function requestSet(action, data, _protected) {
  return {
    type: REQUEST_SET,
    action,
    payload: data,
    protected: _protected,
  };
}

export function payloadSend(payload) {
  return create({
    path: '/node',
    onStart: LOAD_REQUESTED,
    onSuccess: LOAD_RESOLVED,
    onError: LOAD_REJECTED,
    payload,
  });
}
