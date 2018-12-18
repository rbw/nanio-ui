import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRPC = state => state.get('rpc', initialState);

const responseSelector = () =>
  createSelector(
    createSelector(selectRPC, rpcState => rpcState.get('result')),
    createSelector(selectRPC, rpcState => rpcState.get('time')),
    (result, time) => ({ result, elapsed: time.get('end') - time.get('begin') })
  );

const actionSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('action'));

const payloadSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('payload'));

const loadingSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('loading'));

const errorSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('error'));

export { selectRPC, responseSelector, actionSelector, payloadSelector, loadingSelector, errorSelector };
