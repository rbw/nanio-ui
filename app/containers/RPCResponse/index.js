import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import StatusIcon from '@material-ui/icons/Restore';
import ReactJson from 'react-json-view';

import {
  responseSelector,
  errorSelector,
  loadingSelector,
} from 'containers/RPCRequest/selectors';

import { styles } from './styles';

export class RPCResponse extends React.PureComponent {
  renderSummary = (error, elapsed) => {
    const { classes } = this.props;
    const errorIcon = <StatusIcon style={{ paddingBottom: 2, fontSize: 17 }} />;

    return (
      <div className={classes.summary}>
        {errorIcon}
        {`${elapsed}ms, `}
        {error ? 'failure' : 'success'}
      </div>
    );
  };

  render() {
    const {
      classes,
      error,
      loading,
      response: { result, elapsed },
    } = this.props;

    if (loading)
      return <div className={classes.sending}>awaiting response...</div>;

    if (result.size > 0) {
      const res = result.toJS();
      if (res.contents && typeof res.contents === 'string') {
        res.contents = JSON.parse(res.contents);
      }
      return (
        <div className={classes.root}>
          <ReactJson
            src={res}
            theme="harmonic"
            displayDataTypes={false}
            enableClipboard={false}
            style={{ backgroundColor: 'transparent' }}
          />
          {this.renderSummary(error, elapsed)}
        </div>
      );
    }

    return <div className={classes.ready}>~ ready for action</div>;
  }
}

RPCResponse.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  response: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: loadingSelector(),
  error: errorSelector(),
  response: responseSelector(),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(RPCResponse);
