import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Grid from '@material-ui/core/Grid';
import Browsables from 'containers/Browsables';
import RPCRequest from 'containers/RPCRequest';
import RPCResponse from 'containers/RPCResponse';

import { styles } from './styles';

export class Browser extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" className={classes.root}>
        <Grid item lg={6} xs={7} className={classes.leftPane}>
          <div className={classes.actionBarWrapper}>
            <div className={classes.actionBar}>
              Bajsa
            </div>
          </div>
          <PerfectScrollbar style={{ height: 'calc(100% - 60px)' }}>
            <Browsables />
          </PerfectScrollbar>
        </Grid>
        <Grid item lg={6} xs={5}>
          <Grid container direction="column" className={classes.rightPane}>
            <Grid item style={{ height: '40%' }}>
              <div className={classes.rightPaneTitle}>Payload</div>
              <RPCRequest />
            </Grid>
            <Grid item style={{ height: 'calc(60% - 60px)' }}>
              <div
                className={classnames(
                  classes.rightPaneTitle,
                  classes.responseTitle,
                )}
              >
                Response
              </div>
              <RPCResponse />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Browser);
