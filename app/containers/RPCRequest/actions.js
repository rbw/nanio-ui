import { create } from 'containers/Backend/actions';
import {
  PAYLOAD_SET,
  LOAD_REQUESTED,
  LOAD_RESOLVED,
  LOAD_REJECTED
} from './constants';

export function payloadSet(data) {
  return {
    type: PAYLOAD_SET,
    payload: data,
  };
}

export function payloadSend(payload) {
  return create({
    path: '/node-rpc',
    onStart: LOAD_REQUESTED,
    onSuccess: LOAD_RESOLVED,
    onError: LOAD_REJECTED,
    payload,
  });
}
