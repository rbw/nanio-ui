import { fromJS } from 'immutable';

import { LOAD_REJECTED, LOAD_RESOLVED, LOAD_REQUESTED } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  schemas: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REQUESTED:
      return state.set('loading', true).set('error', false);
    case LOAD_RESOLVED:
      return state.set('schemas', fromJS(action.data)).set('loading', false);
    case LOAD_REJECTED:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
