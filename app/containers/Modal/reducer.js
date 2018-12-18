import { fromJS } from 'immutable';

import { MODAL_SHOW, MODAL_HIDE } from './constants';

const initialState = fromJS({
  type: null,
  props: {},
});

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_SHOW:
      return state
        .set('type', action.modalType)
        .setIn(['props', 'modalProps'], {
          ...action.modalProps,
          open: true,
        })
        .setIn(['props', 'extraProps'], {
          ...action.extraProps,
        });
    case MODAL_HIDE:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;
