import { fromJS } from 'immutable';
import {
  PAYLOAD_SET,
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
  payload: {
    action: 'version',
  },
});

function rpcReducer(state = initialState, action) {
  const timestamp = new Date().getTime();
  const hasNodeError = action.data && 'error' in action.data;

  switch (action.type) {
    case PAYLOAD_SET:
      return state.set('payload', fromJS(action.payload));
    case LOAD_REQUESTED:
      return initialState
        .set('loading', true)
        .set('payload', state.get('payload'))
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
