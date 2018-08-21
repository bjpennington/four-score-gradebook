import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SCORE_ACTIONS } from '../../redux/actions/scoreActions';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';
import {STUDENT_ACTIONS} from '../../redux/actions/studentActions';

import Nav from '../Nav/Nav';
import GradeAssignmentListItem from '../GradeAssignmentListItem/GradeAssignmentListItem';

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
        let filteredArray = arrayToFilter.filter(function(score) {
            return score.scoreId !== id
        });
        this.setState({
            arrayOfChanges: [...filteredArray,   {
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
    }

    cancelGrading = () => {
        if (this.state.arrayOfChanges.length > 0) {
            if (window.confirm('Are you sure you want to cancel?')) {
                this.props.history.push(`/scores/${this.props.assignment.classroom_id}`)
            }
        }
        else { this.props.history.push(`/scores/${this.props.assignment.classroom_id}`) }
    }

    render() {
        let content = null;
        console.log(this.state.arrayOfChanges)

        let studentsMapArray = this.props.students.map((student, index) => {
            return (
                <GradeAssignmentListItem key={index} student={student} editScore={this.editScore} />
            )
        })

        if (this.props.user.userName) {
            content = (
                <div>
                    <h3>
                        {this.props.assignment.assignment_name}
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Standard</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsMapArray}
                        </tbody>
                    </table>
                    <button onClick={this.cancelGrading}>Back to Classroom</button>
                    <button onClick={this.sendScoreUpdates}>Submit</button>
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

export default withRouter(connect(mapStateToProps)(GradeAssignment));