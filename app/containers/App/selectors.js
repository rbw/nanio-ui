import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const loadingSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

export { selectGlobal, loadingSelector };
