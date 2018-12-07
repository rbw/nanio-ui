import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRPC = state => state.get('rpc', initialState);

export const responseSelector = () =>
  createSelector(
    createSelector(selectRPC, rpcState => rpcState.get('result')),
    createSelector(selectRPC, rpcState => rpcState.get('time')),
    (result, time) => ({ result, elapsed: time.get('end') - time.get('begin') })
  );

export const payloadSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('payload'));

export const loadingSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('loading'));

export const errorSelector = () =>
  createSelector(selectRPC, rpcState => rpcState.get('error'));
