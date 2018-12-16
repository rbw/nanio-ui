import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NodeRPCIcon from '@material-ui/icons/ListAlt';
import ServerInfoIcon from '@material-ui/icons/InsertChartOutlined';

import Collapse from '@material-ui/core/Collapse';

import { rpcSidebarSelector } from 'containers/App/selectors';
import { styles } from './styles';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ['node_rpc'],
    };
  }

  toggleExpanded = e => {
    const clicked = e.target.id;

    if (this.state.expanded.includes(clicked)) {
      this.setState(state => ({
        expanded: state.expanded.filter(item => item !== clicked),
      }));
    } else {
      this.setState(state => state.expanded.push(clicked));
    }
  };

  getNestedItem = text => (
    <ListItem
      button
      key={text}
      component="a"
      href={`#${text}`}
    >
      <ListItemText
        primary={text}
        disableTypography
        className={this.props.classes.itemTextNested}
      />
    </ListItem>
  );

  render() {
    const { classes, rpc } = this.props;
    const { expanded } = this.state;
    console.log('expanded: ', expanded);

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.title}>
            {`NAN<IO/>`}
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem
          button
          className={classes.listItem}
          onClick={this.toggleExpanded}
        >
          <ServerInfoIcon className={classes.menuIcon} />
          <ListItemText
            primary="Stats"
            disableTypography
            className={classes.itemText}
          />
        </ListItem>
        <ListItem
          button
          className={classes.listItem}
          onClick={this.toggleExpanded}
        >
          <NodeRPCIcon className={classes.menuIcon} />
          <ListItemText
            primary="Node RPC"
            id="node_rpc"
            disableTypography
            className={classes.itemText}
          />
          {expanded.includes('node_rpc') ? (
            <ExpandLess className={classes.expandable} />
          ) : (
            <ExpandMore className={classes.expandable} />
          )}
        </ListItem>
        <Collapse
          in={expanded.includes('node_rpc')}
          timeout="auto"
          unmountOnExit
          className={classes.nested}
        >
          <List component="div" disablePadding>
            {rpc.map(this.getNestedItem)}
          </List>
        </Collapse>
      </List>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  rpc: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rpc: rpcSidebarSelector(),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(Sidebar);
