import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Grid from '@material-ui/core/Grid';

import { styles } from './styles';

export class About extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" className={classes.root}>
        <Grid item xs={6} className={classes.leftPane}>
          <PerfectScrollbar>
            Hej
          </PerfectScrollbar>
        </Grid>
        <Grid item xs={6} className={classes.rightPane} />
      </Grid>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
