import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';

import styles from './styles';

class Modal extends React.Component {
  renderTitle = () => (
    <DialogTitle id="dialog-title">
      {this.props.titleIcon} {this.props.titleText} {this.renderSubtitleText()}
    </DialogTitle>
  );

  renderSubtitleText = () => {
    const { subtitleText, classes } = this.props;
    if (!subtitleText) {
      return null;
    }

    return (
      <div className={classes.headerSubtitleText}>
        {this.props.subtitleText}
      </div>
    );
  };

  renderContextText = () => (
    <span>
      <DialogContentText
        id="dialog-description"
        classes={{
          root: this.props.classes.dialogContentText,
        }}
      >
        {this.props.contextText}
      </DialogContentText>
    </span>
  );

  renderCancelButton = () => (
    <Button onClick={this.props.onCancel} color="primary">
      {this.props.cancelButtonText}
    </Button>
  );

  renderConfirmButton = () => (
    <Button
      onClick={this.props.onConfirm}
      disabled={this.props.confirmDisabled}
      color="primary"
      autoFocus
    >
      {this.props.confirmButtonText}
    </Button>
  );

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        transitionDuration={0}
        open={this.props.open}
        maxWidth="md"
        classes={{
          paper: classes.paper,
        }}
      >
        {this.props.titleText ? this.renderTitle() : null}
        <DialogContent style={{ width: this.props.width || 600 }}>
          {this.props.contextText ? this.renderContextText() : null}
          {this.props.children}
        </DialogContent>
        <DialogActions>
          {this.props.cancelButtonText ? this.renderCancelButton() : null}
          {this.props.confirmButtonText ? this.renderConfirmButton() : null}
        </DialogActions>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  width: PropTypes.number,
  children: PropTypes.node,
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subtitleText: PropTypes.string,
  titleIcon: PropTypes.node,
  cancelButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmDisabled: PropTypes.bool,
  contextText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default withStyles(styles)(Modal);
