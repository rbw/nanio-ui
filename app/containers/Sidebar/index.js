import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
import Octicon, { MarkGithub } from '@githubprimer/octicons-react';

import { showSettingsModal } from 'containers/Modal/actions';
import { rpcItemsSelector } from './selectors';
import { styles } from './styles';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ['100', '200'],
    };
  }

  renderIcon = icon => (
    <ListItemIcon className={this.props.classes.menuIcon}>
      <Icon style={{ fontSize: 20 }}>{icon}</Icon>
    </ListItemIcon>
  );

  renderItemText = (item, onClick = null) => {
    const { classes } = this.props;
    const level = Number(item.id.charAt(0));
    const indentClass = `indentLevel${level}`;

    return (
      <ListItem
        button
        className={classnames(classes.listItem, classes[indentClass])}
        onClick={onClick}
        key={item.id}
      >
        {this.renderIcon(item.icon)}
        <ListItemText
          id={item.id}
          primary={item.label}
          disableTypography
          className={classes.itemText}
        />
      </ListItem>
    );
  };

  renderLeaf = item => {
    const { classes } = this.props;
    let onClick = null;

    if ('link' in item) {
      return (
        <HashLink to={item.link} key={item.id} className={classes.navLink}>
          {this.renderItemText(item)}
        </HashLink>
      );
    }

    if ('modal' in item) {
      switch (item.modal) {
        case 'settings':
          onClick = this.props.openSettings;
          break;
        default:
          break;
      }
    }

    return this.renderItemText(item, onClick);
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
        {this.renderItemText(item, this.toggleExpanded)}
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

    const rpcMenuItems = rpcItems.map((group, idx) => ({
      id: String(300 + idx),
      label: group.toLowerCase(),
      link: `/browser#${group}`,
    }));

    const sidebar = [
      {
        id: '100',
        label: 'explore',
        link: '/browser',
        icon: 'terrain',
        items: [
          {
            id: '200',
            label: 'node',
            link: '/browser',
            icon: 'device_hub',
            items: rpcMenuItems,
          },
          {
            id: '201',
            label: 'plugins',
            link: '/browser',
            icon: 'layers',
          },
        ],
      },
      {
        id: '101',
        label: 'configure',
        modal: 'settings',
        dialog: 'settings',
        icon: 'settings',
      },
    ];

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.title}>
            <span>NANIO</span>
            <span className={classes.version}> v1.1.3</span>
          </ListSubheader>
        }
        className={classes.root}
      >
        {sidebar.map(this.renderItem)}
        <a
          className={classes.githubLink}
          href="http://github.com/rbw/nanio"
          target="_blank"
        >
          <Octicon
            className={classes.githubLinkIcon}
            icon={MarkGithub}
            size={50}
          />
        </a>
      </List>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  rpcItems: PropTypes.array.isRequired,
  openSettings: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    openSettings: () => {
      dispatch(
        showSettingsModal({
          titleText: 'Configure',
          contextText: 'Settings are /currently/ persisted in the browser.',
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
          width: 650,
        }),
      );
    },
  };
}

const mapStateToProps = createStructuredSelector({
  rpcItems: rpcItemsSelector(),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Sidebar);
