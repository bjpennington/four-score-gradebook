import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SCORE_ACTIONS } from '../../redux/actions/scoreActions';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';

import {Table, TableHead, TableBody, TableRow, TableCell, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Nav from '../Nav/Nav';
import GradeAssignmentListItem from '../GradeAssignmentListItem/GradeAssignmentListItem';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
        margin: 25,
    },
    button: {
        margin: 5,
    }
})

class GradeAssignment extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrayOfChanges: [],
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: ASSIGNMENT_ACTIONS.FETCH_CURRENT_ASSIGNMENT,
            payload: this.props.match.params.id
        });
        this.props.dispatch({
            type: SCORE_ACTIONS.FETCH_ASSIGNMENT_SCORES,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: STUDENT_ACTIONS.FETCH_ASSIGNMENT_STUDENTS,
            payload: this.props.match.params.id,
        });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    editScore = (eventValue, id) => {
        let arrayToFilter = [...this.state.arrayOfChanges];
        let filteredArray = arrayToFilter.filter(function (score) {
            return score.scoreId !== id
        });
        this.setState({
            arrayOfChanges: [...filteredArray, {
                newScore: eventValue,
                scoreId: id,
            }]
        });
    }

    sendScoreUpdates = () => {
        if (this.state.arrayOfChanges.length !== 0) {
            this.props.dispatch({
                type: SCORE_ACTIONS.EDIT_SCORE,
                payload: this.state.arrayOfChanges,
            });
        }
        this.setState({
            arrayOfChanges: [],
        });
        swal({
            title: "Scores Submitted!",
            icon: "success",
            buttons: false,
            timer: 2000,
        });
    }

    cancelGrading = () => {
        if (this.state.arrayOfChanges.length > 0) {
            swal({
                title: "Are you sure you want to leave?",
                text: "Any changes you have made won't be saved if you leave now.",
                buttons: [true, "Yes, View Classroom"],
                icon: "warning",
                dangerMode: true,
            })
                .then(confirmed => {
                    if (confirmed) {
                        this.props.history.push(`/scores/${this.props.assignment.classroom_id}`);
                    }
                });
        }
        else { this.props.history.push(`/scores/${this.props.assignment.classroom_id}`) }
    }

    render() {
        let content = null;

        let studentsMapArray = this.props.students.map((student, index) => {
            return (
                <GradeAssignmentListItem key={index} student={student} editScore={this.editScore} />
            )
        })

        if (this.props.user.userName) {
            content = (
                <div>
                    <h2>
                        {this.props.assignment.assignment_name}
                    </h2>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student</TableCell>
                                <TableCell>Standard</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentsMapArray}
                        </TableBody>
                    </Table>
                    <Button className={this.props.classes.button} variant="contained" onClick={this.cancelGrading}>Back to Classroom</Button>
                    <Button className={this.props.classes.button} variant="contained" color="primary" onClick={this.sendScoreUpdates}>Submit</Button>
                </div>
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
    assignment: state.assignment.currentAssignment,
    scores: state.score.assignmentScores,
    students: state.student.assignmentStudents,
});

const connectedGradeAssignment = withRouter(connect(mapStateToProps)(GradeAssignment));

export default withStyles(styles)(connectedGradeAssignment);