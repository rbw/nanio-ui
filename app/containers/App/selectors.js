import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const loadingSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const rpcConfigSelector = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['config', 'rpc']));

const rpcSidebarSelector = () =>
  createSelector(selectGlobal, globalState =>
    globalState
      .getIn(['config', 'rpc'])
      .keySeq()
      .toArray(),
  );

export { selectGlobal, loadingSelector, rpcSidebarSelector, rpcConfigSelector };
