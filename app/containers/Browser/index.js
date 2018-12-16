import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import PerfectScrollbar from 'react-perfect-scrollbar';
import APIKeyIcon from '@material-ui/icons/Lock';

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
          <PerfectScrollbar>
            <Browsables />
          </PerfectScrollbar>
          <div className={classes.actionWrapper}>
            <div className={classes.actionContainer}>
              <APIKeyIcon className={classes.actionIcon} />
            </div>
          </div>
        </Grid>
        <Grid
          container
          item
          lg={6}
          xs={5}
          direction="column"
          className={classes.rightPane}
        >
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
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Browser);
