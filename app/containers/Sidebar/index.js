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

import Collapse from '@material-ui/core/Collapse';

import { rpcSidebarSelector } from 'containers/App/selectors';
import { styles } from './styles';

class Sidebar extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  getNestedItem = text => (
    <ListItem button key={text} component="a" href={`#${text}`}>
      <ListItemText
        primary={text}
        disableTypography
        className={this.props.classes.itemTextNested}
      />
    </ListItem>
  );

  render() {
    const { classes, rpc } = this.props;

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.title}>
            {'[NANIO]'}
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button onClick={this.handleClick}>
          <ListItemText
            primary="Node API"
            disableTypography
            className={classes.itemText}
          />
          {this.state.open ? (
            <ExpandLess className={classes.expandable} />
          ) : (
            <ExpandMore className={classes.expandable} />
          )}
        </ListItem>
        <Collapse
          in={this.state.open}
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
