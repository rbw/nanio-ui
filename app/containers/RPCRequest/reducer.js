import { fromJS, Map } from 'immutable';
import {
  REQUEST_SET,
  LOAD_REQUESTED,
  LOAD_RESOLVED,
  LOAD_REJECTED,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  result: {},
  time: {
    begin: 0,
    end: 0,
  },
  action: undefined,
  protected: undefined,
  payload: {"action": "version"},
});

function rpcReducer(state = initialState, action) {
  const timestamp = new Date().getTime();
  const hasNodeError = action.data && 'error' in action.data;

  switch (action.type) {
    case REQUEST_SET:
      return state
        .set('payload', fromJS(action.payload))
        .set('action', fromJS(action.action));
    case LOAD_REQUESTED:
      return initialState
        .set('loading', true)
        .set('payload', state.get('payload'))
        .set('protected', state.get('protected'))
        .set('action', state.get('action'))
        .setIn(['time', 'begin'], timestamp);
    case LOAD_RESOLVED:
      return state
        .set('loading', false)
        .set('error', hasNodeError)
        .set('result', fromJS(action.data))
        .setIn(['time', 'end'], timestamp);
    case LOAD_REJECTED:
      return state
        .set('loading', false)
        .set('error', true)
        .set('result', fromJS(action.error.response.data))
        .setIn(['time', 'end'], timestamp);
    default:
      return state;
  }
}

export default rpcReducer;
