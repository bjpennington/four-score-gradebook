import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {Button, TableCell, TableRow} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Edit} from '@material-ui/icons';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 300,
      maxWidth: 500,
    },
    tableCell: {
      fontSize: "20px",        
    },
    editCells: {
        maxWidth: 30,
    },
  });
class ClassroomsListItem extends Component {

    editClassroom = () => {
        this.props.history.push(`/manage_classroom/${this.props.classroom.id}`);
    }

    render() {
        return (
            <TableRow>
                <TableCell className={this.props.classes.tableCell}><Link to={`/scores/${this.props.classroom.id}`}>{this.props.classroom.classroom_name}</Link></TableCell>
                <TableCell className={this.props.classes.editCells}><Button onClick={this.editClassroom}><Edit /></Button></TableCell>
            </TableRow>
        )
    }

}

const connectedClassroomsListItem = withRouter(connect()(ClassroomsListItem))
export default withStyles(styles)(connectedClassroomsListItem);