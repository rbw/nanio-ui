import React from 'react';

import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';

import Browser from 'containers/Browser';
import NotFoundPage from 'containers/NotFoundPage';
import injectSaga from 'utils/injectSaga';

import saga from 'containers/Backend/sagas';

import Sidebar from '../Sidebar';
import { styles } from './styles';
import { uiConfig } from './actions';
import { loadingSelector } from './selectors';


const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  transitions: {
    // create: () => 'none',
  },
  typography: {
    fontFamily: ['Roboto'],
    fontSize: 14,
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    background: {
      default: '#eeeeee',
      paper: '#FFFFFF',
    },
    primary: {
      light: '#00adb5',
      main: '#53354a',
      contrastText: '#7a7a7a',
    },
    secondary: {
      light: '#0066ff',
      main: '#414D59',
      contrastText: '#3a3a3a',
    },
  },
});

class Root extends React.PureComponent {
  componentWillMount() {
    this.props.getUiConfig();
  }

  render() {
    const { classes, loading } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div
          className={classes.loadingOverlay}
          style={{ visibility: loading ? 'visible' : 'hidden' }}
        >
          <div className={classes.loadingWrapper}>
            <CircularProgress
              thickness={3}
              style={{ width: 110, height: 110, color: '#90878d' }}
            />
            <div className={classes.loadingMessage}>[fetching config]</div>
          </div>
        </div>
        <Grid container className={classes.root} direction="row">
          <CssBaseline />
          <Grid item>
            <Sidebar />
          </Grid>
          <Grid item className={classes.contentContainer}>
            <Switch>
              <Route exact path="/" component={Browser} />
              <Route exact path="/browser" component={Browser} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getUiConfig: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getUiConfig: () => {
      dispatch(uiConfig());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: loadingSelector(),
});

export default compose(
  withStyles(styles),
  injectSaga({ key: 'backend_crud', saga }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Root);
