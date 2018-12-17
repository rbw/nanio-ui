import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BrowseIcon from '@material-ui/icons/ListAlt';
import AboutIcon from '@material-ui/icons/InfoOutlined';
import SettingsIcon from '@material-ui/icons/Settings';

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

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.title}>
            / NANIO /
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem
          button
          className={classes.listItem}
        >
          <AboutIcon className={classes.menuIcon} />
          <ListItemText
            primary="About"
            disableTypography
            className={classes.itemText}
          />
        </ListItem>
        <ListItem
          button
          className={classes.listItem}
          component="a"
          href="browser"
          onClick={this.toggleExpanded}
        >
          <BrowseIcon className={classes.menuIcon} />
          <ListItemText
            primary="Browse"
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
        <ListItem
          button
          className={classes.listItem}
          onClick={this.toggleExpanded}
        >
          <SettingsIcon className={classes.menuIcon} />
          <ListItemText
            primary="Settings"
            id="settings"
            disableTypography
            className={classes.itemText}
          />
          {expanded.includes('settings') ? (
            <ExpandLess className={classes.expandable} />
          ) : (
            <ExpandMore className={classes.expandable} />
          )}
        </ListItem>
        <Collapse
          in={expanded.includes('settings')}
          timeout="auto"
          unmountOnExit
          className={classes.nested}
        >
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText
                primary="Authentication"
                disableTypography
                className={this.props.classes.itemTextNested}
              />
            </ListItem>
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
