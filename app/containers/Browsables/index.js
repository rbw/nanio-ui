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
import AttributesIcon from '@material-ui/icons/Notes';
import { createStructuredSelector } from 'reselect';
import { requestSet } from 'containers/RPCRequest/actions';
import { schemasSelector } from './selectors';
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
    this.props.setRequest(action, payload, _protected);
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
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
            <AttributesIcon style={{ paddingBottom: 2, paddingRight: 3 }} />
            <span>
              {action.enabled ? 'enabled' : 'disabled'}
              {`, `}
              {action.protected ? 'protected' : 'public'}
            </span>
          </span>
          <span>
            <span
              onClick={() =>
                setRequest(action.action, examples.request, action.protected)
              }
              className={classes.exampleLink}
            >
              load example
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
        <Typography paragraph className={classes.title}>
          {groupName} <span className={classes.command}>commands</span>
        </Typography>
        {actions.map(this.renderAction)}
      </div>
    );
  };

  render() {
    const { classes, schemas } = this.props;

    return (
      <div className={classes.root}>
        {schemas.entrySeq().map(this.renderActionGroup)}
      </div>
    );
  }
}

Browsables.propTypes = {
  classes: PropTypes.object.isRequired,
  setRequest: PropTypes.func.isRequired,
  schemas: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    setRequest: (action, data, _protected) => {
      dispatch(requestSet(action, data, _protected));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  schemas: schemasSelector(),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Browsables);
