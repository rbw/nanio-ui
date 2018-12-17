import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflow: 'hidden',
  },
});

const TableHeadRow = withStyles(theme => ({
  head: {
    backgroundColor: '#f8f8f8',
  },
}))(TableRow);

function FieldsTable(props) {
  const { classes, fields } = props;

  return (
    <Paper className={classes.root} elevation={3}>
      <Table className={classes.table}>
        <TableHead>
          <TableHeadRow>
            <TableCell>Field name</TableCell>
            <TableCell>Required</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {fields.map(field => {
            return (
              <TableRow key={field.name}>
                <TableCell component="th" scope="row">
                  {field.name}
                </TableCell>
                <TableCell>{JSON.stringify(field.required)}</TableCell>
                <TableCell>{field.type}</TableCell>
                <TableCell>{field.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

FieldsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
};

export default withStyles(styles)(FieldsTable);
