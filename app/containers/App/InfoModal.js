import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'components/Modal';
import { hideInfoModal } from './actions';

class InfoModal extends React.PureComponent {
  handleConfirm = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <Modal
        onConfirm={this.handleConfirm}
        onCancel={this.props.hideModal}
        width="400px"
        {...this.props.modalProps}
      >
      </Modal>
    );
  }
}

InfoModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalProps: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => {
      dispatch(hideInfoModal());
    },
  };
}

export function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
