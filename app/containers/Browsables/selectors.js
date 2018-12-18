import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const schemasSelector = () =>
  createSelector(selectGlobal, globalState => globalState.get('schemas'));

export { schemasSelector };
