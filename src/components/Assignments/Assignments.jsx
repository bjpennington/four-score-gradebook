import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';
import { STANDARD_ACTIONS } from '../../redux/actions/standardActions';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';

import { Button, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Nav from '../Nav/Nav';
import AssignmentsListItem from '../AssignmentsListItem/AssignmentsListItem';
import AddAssignmentDialog from '../AddAssignmentDialog/AddAssignmentDialog';

import './assignments.css';
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
        maxWidth: 900,
    },
    tableCell: {
        fontSize: "50px",
    },
    button: {
        margin: 5,
    }
});

class Assignments extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.FETCH_CURRENT_CLASSROOM,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: ASSIGNMENT_ACTIONS.FETCH_ASSIGNMENTS,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: STANDARD_ACTIONS.FETCH_STANDARD,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: STUDENT_ACTIONS.FETCH_STUDENT,
            payload: this.props.match.params.id,
        })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    render() {

        let assignmentMapArray = this.props.assignments.map((assignment, index) => {
            return (
                <AssignmentsListItem assignment={assignment} key={index} />
            )
        });

        let content = null;

        if (this.props.user.userName) {
            content = (
                <div className="assignmentsGrid">
                    <div className="assignmentsContainer">
                        <h2>Assignments for {this.props.classroom.classroom_name}</h2>
                        <Grid container justify="center" alignItems="center">
                            <Button className={this.props.classes.button} variant="contained" onClick={() => { this.props.history.push(`/scores/${this.props.match.params.id}`) }}>Back to Classroom</Button>
                            <AddAssignmentDialog />
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignmentMapArray}
                            </TableBody>
                        </Table>
                    </Grid>
                </div>
                </div >
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    assignments: state.assignment.assignments,
    classroom: state.classroom.currentClassroom,
});

const connectedAssignments = connect(mapStateToProps)(Assignments);
export default withStyles(styles)(connectedAssignments);