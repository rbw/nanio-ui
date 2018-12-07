import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

import Grid from '@material-ui/core/Grid';
import Browsables from 'containers/Browsables';
import RPCRequest from 'containers/RPCRequest';
import RPCResponse from 'containers/RPCResponse';

import { styles } from './styles';

export class Browser extends React.PureComponent {
  render() {
    const { classes, rpc } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item lg={6} xs={7} className={classes.leftPane}>
          <Scrollbars autoHide autoHideTimeout={500}>
            <Browsables />
          </Scrollbars>
        </Grid>
        <Grid item lg={6} xs={5} className={classes.rightPane}>
          <div className={classes.rightPaneTitle}>Payload</div>
          <RPCRequest />
          <div
            className={classnames(
              classes.rightPaneTitle,
              classes.rightPaneResponse,
            )}
          >
            Response
          </div>
          <Scrollbars style={{ height: '46%' }}>
            <RPCResponse />
          </Scrollbars>
        </Grid>
      </Grid>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
  rpc: PropTypes.object.isRequired,
};

export function mapStateToProps(state) {
  return {
    rpc: state.get('rpc'),
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(Browser);
