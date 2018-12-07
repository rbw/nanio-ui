import { getOne } from 'containers/Backend/actions';
import { LOAD_REQUESTED, LOAD_RESOLVED, LOAD_REJECTED } from './constants';

export function uiConfig() {
  return getOne({
    path: 'api/ui',
    id: '',
    onStart: LOAD_REQUESTED,
    onSuccess: LOAD_RESOLVED,
    onError: LOAD_REJECTED,
  });
}
