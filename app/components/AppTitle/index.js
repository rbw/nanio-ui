import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  title: {
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Warnes',
    fontSize: 24,
    textTransform: 'uppercase',
  },
});

const AppTitle = props => (
  <div className={props.classes.title}>{props.text}</div>
);

AppTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(AppTitle);
