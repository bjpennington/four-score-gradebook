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


class AssignmentsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        }
    }

    editAssignment = () => {
        this.setState({
            editMode: true
        })
    }

    render() {
            return (


                <TableRow>
                    <TableCell className={this.props.classes.tableCell}><Link to={`/grade/${this.props.assignment.id}`}>{this.props.assignment.assignment_name}</Link></TableCell>
                    <TableCell className={this.props.classes.editCells}><Button onClick={this.editAssignment}><Edit/></Button></TableCell>
                </TableRow>
            )
        }
}

const connectedAssignmentsListItem = withRouter(connect()(AssignmentsListItem));
export default withStyles(styles)(connectedAssignmentsListItem);