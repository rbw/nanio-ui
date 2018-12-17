import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
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

import { rpcItemsSelector } from './selectors';
import { styles } from './styles';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ['root_browser'],
    };
  }

  renderIcon = icon => (
    <ListItemIcon className={this.props.classes.menuIcon}>
      <Icon style={{ fontSize: 20 }}>{icon}</Icon>
    </ListItemIcon>
  );

  renderItemText = item => {
    const { classes } = this.props;

    return (
      <ListItem button className={classes.listItem}>
        {this.renderIcon(item.icon)}
        <ListItemText
          primary={item.label}
          disableTypography
          className={classes.itemText}
        />
      </ListItem>
    );
  };

  renderLeaf = item => {
    const { classes } = this.props;

    if ('link' in item) {
      return (
        <HashLink to={item.link} key={item.id} className={classes.navLink}>
          {this.renderItemText(item)}
        </HashLink>
      );
    }

    return (
      <HashLink to={item.link} key={item.id} className={classes.navLink}>
        {this.renderItemText(item)}
      </HashLink>
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
          {this.renderIcon(item.icon)}
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
    const { classes, rpcItems } = this.props;

    const rpcMenuItems = rpcItems.map(group => ({
      id: `rpc_${group}`,
      label: group.toLowerCase(),
      link: `/browser#${group}`,
    }));

    const sidebar = [
      {
        id: 'root_browser',
        label: 'explore',
        link: '/browser',
        icon: 'terrain',
        items: rpcMenuItems,
      },
      {
        id: 'root_settings',
        label: 'configure',
        link: '#',
        dialog: 'settings',
        icon: 'style',
      },
    ];

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.title}>
            <span>NANIO</span>
            <span className={classes.version}> v16.1.0</span>
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
  rpcItems: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rpcItems: rpcItemsSelector(),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(Sidebar);
