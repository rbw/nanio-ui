import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { hideModal } from 'containers/Modal/actions';

import Modal from 'components/Modal';

const styles = () => ({
  backButton: {
    position: 'absolute',
    bottom: 10,
    left: 6,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    right: 6,
  },
});

class Settings extends React.PureComponent {
  state = {};

  render() {
    const { classes, modalProps, hide } = this.props;

    return (
      <Modal
        onCancel={hide}
        {...modalProps}
      >
      </Modal>
    );
  }
}

Settings.propTypes = {
  hide: PropTypes.func.isRequired,
  modalProps: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    hide: () => {
      dispatch(hideModal());
    },
  };
}

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(Settings);
