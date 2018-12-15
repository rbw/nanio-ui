import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { requestSet } from 'containers/RPCRequest/actions';
import { styles } from './styles';
import FieldsTable from './fields';

class Browsables extends React.Component {
  state = {
    expanded: null,
  };

  clickPanel = (action, fields, _protected) => {
    /* Convert array to object for serialization later */
    const payload = fields
      .filter(field => field.required)
      .reduce((map, { name }) => ({ ...map, [name]: '' }), {});

    payload.action = action;
    this.props.setRequest(payload, _protected);
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  renderEnabled = isEnabled => {
    return isEnabled ? (
      <span style={{ color: '#86b186' }}> enabled</span>
    ) : (
      <span style={{ color: '#ce6a6a' }}> disabled</span>
    );
  };

  renderProtected = isProtected => {
    return isProtected ? (
      <span style={{ color: '#ce6ab7' }}> protected</span>
    ) : (
      <span style={{ color: '#86b186' }}> public</span>
    );
  };

  renderDetails = action => {
    const { classes, setRequest } = this.props;
    const { examples } = action;

    return (
      <ExpansionPanelDetails className={classes.itemDetails}>
        <Typography className={classes.bodyDescription}>
          {action.description}
        </Typography>
        <FieldsTable fields={action.fields} />
        <div className={classes.expansionFooter}>
          <span style={{ float: 'left' }}>
            access:
            <span>
              {this.renderProtected(action.protected)},
              {this.renderEnabled(action.enabled)}
            </span>
          </span>
          <span>
            <span
              onClick={() => setRequest(examples.request, action.protected)}
              className={classes.exampleLink}
            >
              load example {`=>`}
            </span>
          </span>
        </div>
      </ExpansionPanelDetails>
    );
  };

  renderAction = action => {
    const { classes } = this.props;

    return (
      <ExpansionPanel
        key={action.name}
        expanded={this.state.expanded === action.name}
        onChange={this.handleChange(action.name)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() =>
            this.clickPanel(action.action, action.fields, action.protected)
          }
        >
          <Typography className={classes.itemLeftHeading}>
            {action.name}
          </Typography>
          <Typography className={classes.itemRightHeading} noWrap>
            {action.description}
          </Typography>
        </ExpansionPanelSummary>
        {this.renderDetails(action)}
      </ExpansionPanel>
    );
  };

  renderActionGroup = ([groupName, _actions]) => {
    const { classes } = this.props;
    const actions = _actions.toJS();

    return (
      <div key={groupName} className={classes.groupHeading} id={groupName}>
        <Typography variant="h5" paragraph>
          {groupName}
        </Typography>
        {actions.map(this.renderAction)}
      </div>
    );
  };

  render() {
    const { classes, actionGroups } = this.props;

    return (
      <div className={classes.root}>
        {actionGroups.entrySeq().map(this.renderActionGroup)}
      </div>
    );
  }
}

Browsables.propTypes = {
  classes: PropTypes.object.isRequired,
  setRequest: PropTypes.func.isRequired,
  actionGroups: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    setRequest: (data, _protected) => {
      dispatch(requestSet(data, _protected));
    },
  };
}

export function mapStateToProps(state) {
  const groups = state.getIn(['global', 'config', 'rpc']);
  return {
    actionGroups: groups,
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Browsables);
