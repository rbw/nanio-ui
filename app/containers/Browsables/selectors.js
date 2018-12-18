import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const rpcSchemaSelector = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['config', 'rpc']));

export { rpcSchemaSelector };
