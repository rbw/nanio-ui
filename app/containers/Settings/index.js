import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { hideModal } from 'containers/Modal/actions';
import Modal from 'components/Modal';
import styles from './style';

class Settings extends React.PureComponent {
  state = {
    apiKey: undefined,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveSettings = () => {
    localStorage.setItem('apiKey', this.state.apiKey);
    this.props.hide();
  };

  componentWillMount() {
    this.setState({ apiKey: localStorage.getItem('apiKey') || '' });
  }

  render() {
    const { classes, modalProps, hide } = this.props;

    return (
      <Modal onCancel={hide} onConfirm={this.saveSettings} {...modalProps}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="API key"
            fullWidth
            placeholder="Enter API key"
            name="apiKey"
            value={this.state.apiKey}
            onChange={this.handleChange}
          />
        </form>
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
