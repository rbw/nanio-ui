import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/pastel_on_dark';
import { payloadSend, payloadSet } from './actions';
import { loadingSelector, payloadSelector } from './selectors';

import { styles } from './styles';

class RPCRequest extends React.PureComponent {
  constructor(props) {
    super(props);

    // Use local state for payload to minimize overhead on editor update
    this.state = {
      payload: '{}',
    };
  }

  serializePayload = obj => JSON.stringify(obj, null, '\t');

  sendPayload = () => {
    const payload = JSON.parse(this.state.payload);

    // Serialize `block` if an object was provided
    if (payload.block && typeof payload.block === 'object') {
      payload.block = JSON.stringify(payload.block);
    }

    this.props.sendPayload(JSON.stringify(payload));
  };

  syncPayload = text => {
    this.setState({ payload: text });
  };

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.payload) !== JSON.stringify(this.props.payload)
    ) {
      const payload = this.serializePayload(nextProps.payload);
      this.setState({ payload });
    }
  }

  componentWillMount() {
    const payload = this.serializePayload(this.props.payload);
    this.setState({ payload });
  }

  render() {
    const { classes, extra, loading } = this.props;

    return (
      <div className={classes.root}>
        <Button
          className={classes.editorSendButton}
          role="button"
          onClick={this.sendPayload}
          disabled={loading}
        >
          RUN
        </Button>
        <AceEditor
          className={classes.editor}
          mode="json"
          theme="pastel_on_dark"
          fontSize={16}
          width="100%"
          showGutter
          showLineNumbers={false}
          onChange={this.syncPayload}
          showPrintMargin={false}
          highlightActiveLine={false}
          value={this.state.payload}
          style={{ overflow: 'hidden' }}
          editorProps={{
            $blockScrolling: Infinity,
            $cursorStyle: 'smooth',
            $fontFamily: 'tahoma',
          }}
          {...extra}
        />
      </div>
    );
  }
}

RPCRequest.propTypes = {
  classes: PropTypes.object.isRequired,
  extra: PropTypes.object,
  payload: PropTypes.object.isRequired,
  sendPayload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    sendPayload: data => {
      dispatch(payloadSend(data));
    },
    setPayload: data => {
      dispatch(payloadSet(data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  payload: payloadSelector(),
  loading: loadingSelector(),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(RPCRequest);
