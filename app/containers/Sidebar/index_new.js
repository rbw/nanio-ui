import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import ListSubheader from '@material-ui/core/ListSubheader';
import Icon from '@material-ui/core/Icon';

import { rpcSidebarSelector } from 'containers/App/selectors';
import { styles } from './styles';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ['root_browser'],
    };
  }

  renderLeaf = item => {
    const { classes } = this.props;

    return (
      <NavLink to={item.link} key={item.id} className={classes.navLink}>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.menuIcon}>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            disableTypography
            className={classes.itemText}
          />
        </ListItem>
      </NavLink>
    );
  };

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

  renderBranch = item => {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div key={item.id}>
        <ListItem
          button
          onClick={this.toggleExpanded}
          className={classes.listItem}
        >
          <Icon className={classes.menuIcon}>{item.icon}</Icon>
          <ListItemText
            id={item.id}
            primary={item.label}
            disableTypography
            className={classes.itemText}
          />
        </ListItem>
        <Collapse
          timeout="auto"
          in={expanded.includes(item.id)}
          unmountOnExit
          className={classes.nested}
        >
          {item.items.map(this.renderItem)}
        </Collapse>
      </div>
    );
  };

  renderItem = item =>
    item.items ? this.renderBranch(item) : this.renderLeaf(item);

  render() {
    const { classes, rpc } = this.props;

    const sidebar = [
      {
        id: 'root_browser',
        label: 'Browser',
        isOpen: false,
        icon: 'import_contacts',
        items: [],
      },
      {
        id: 'root_settings',
        label: 'Settings',
        link: '/settings',
        icon: 'settings',
        items: [
          {
            id: 'settings_auth',
            label: 'Authentication',
            link: '/authentication',
          },
        ],
      },
      {
        id: 'root_about',
        label: ' About',
        link: '/about',
        icon: 'info_outlined',
      },
    ];

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
        {sidebar.map(this.renderItem)}
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
