import { getOne } from 'containers/Backend/actions';
import { LOAD_REQUESTED, LOAD_RESOLVED, LOAD_REJECTED } from './constants';

export function getRPCSchema() {
  return getOne({
    path: 'api',
    id: 'schema',
    onStart: LOAD_REQUESTED,
    onSuccess: LOAD_RESOLVED,
    onError: LOAD_REJECTED,
  });
}
