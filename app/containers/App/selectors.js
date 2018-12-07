import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const configSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('config'));

const rpcSidebarSelector = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['config', 'rpc']).keySeq().toArray(),
  );

export { selectGlobal, configSelector, rpcSidebarSelector };
