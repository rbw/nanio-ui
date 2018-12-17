import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const rpcItemsSelector = () =>
  createSelector(selectGlobal, globalState =>
    globalState
      .getIn(['config', 'rpc'])
      .keySeq()
      .toArray(),
  );

export { rpcItemsSelector };
