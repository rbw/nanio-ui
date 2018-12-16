import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import StatusIcon from '@material-ui/icons/Restore';
import ReactJson from 'react-json-view';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  actionSelector,
  responseSelector,
  errorSelector,
  loadingSelector,
} from 'containers/RPCRequest/selectors';

import { styles } from './styles';

export class RPCResponse extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      result: {},
    };
  }

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

  resFormatter = res => {
    switch (this.props.action) {
      case 'block':
        if (res.contents && typeof res.contents === 'string') {
          return JSON.parse(res.contents);
        }
        break;
      case 'blocks':
      case 'blocks_info':
        Object.entries(res.blocks).forEach(([hash, block]) => {
          if (this.props.action === 'blocks') {
            res.blocks[hash] = JSON.parse(block);
          } else {
            res.blocks[hash].contents = JSON.parse(block.contents);
          }
        });
        return res;
      default:
        return res;
    }
  };

  componentWillReceiveProps(nextProps) {
    const { result } = nextProps.response;

    if (result && result.size > 0) {
      this.setState({ result: this.resFormatter(result.toJS()) });
      console.log(this.state.result);
    }
  }

  render() {
    const {
      classes,
      error,
      loading,
      response: { result, elapsed },
    } = this.props;

    if (loading)
      return <div className={classes.sending}>[awaiting response]</div>;

    // Attempt JSON deserialization for readability
    if (result.size > 0) {
      return (
        <PerfectScrollbar className={classes.root}>
          <ReactJson
            src={this.state.result}
            name="result"
            theme="twilight"
            indentWidth={3}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            className={classes.output}
            style={{
              backgroundColor: 'transparent',
              padding: 10,
              paddingLeft: 0,
            }}
          />
          {this.renderSummary(error, elapsed)}
        </PerfectScrollbar>
      );
    }

    return <div className={classes.ready}> {`[awaiting request]`}</div>;
  }
}

RPCResponse.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  response: PropTypes.object.isRequired,
  action: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: loadingSelector(),
  action: actionSelector(),
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
