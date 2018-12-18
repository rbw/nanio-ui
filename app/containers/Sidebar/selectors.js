import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const rpcItemsSelector = () =>
  createSelector(selectGlobal, globalState =>
    globalState
      .get('schemas')
      .keySeq()
      .toArray(),
  );

export { rpcItemsSelector };
