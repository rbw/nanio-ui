import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingsModal from 'containers/Settings';
import { SETTINGS } from './constants';

const MODAL_COMPONENTS = {
  [SETTINGS]: SettingsModal,
};

class ModalContainer extends React.PureComponent {
  render() {
    const { type, props } = this.props;
    if (!type) {
      return null;
    }

    const ModalComponent = MODAL_COMPONENTS[type];
    return <ModalComponent {...props} />;
  }
}

ModalContainer.propTypes = {
  type: PropTypes.string,
  props: PropTypes.object,
};

export default connect(state => state.get('modal').toJS())(ModalContainer);
