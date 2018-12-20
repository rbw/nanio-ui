import { getList } from 'containers/Backend/actions';
import { LOAD_REQUESTED, LOAD_RESOLVED, LOAD_REJECTED } from './constants';

export function getRPCSchemas() {
  return getList({
    path: 'api/node',
    onStart: LOAD_REQUESTED,
    onSuccess: LOAD_RESOLVED,
    onError: LOAD_REJECTED,
  });
}
