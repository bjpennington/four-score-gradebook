import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';
import {STUDENT_ACTIONS} from '../../redux/actions/studentActions';
import {SCORE_ACTIONS} from '../../redux/actions/scoreActions';

import Nav from '../Nav/Nav';

class ScoresTable extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.FETCH_CURRENT_CLASSROOM,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: STANDARD_ACTIONS.FETCH_STANDARD,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: STUDENT_ACTIONS.FETCH_STUDENT,
            payload: this.props.match.params.id,
        });
        this.props.dispatch({
            type: SCORE_ACTIONS.FETCH_SCORE,
            payload: this.props.match.params.id,
        });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    editClassroom = () => {
        this.props.history.push(`/manage_classroom/${this.props.match.params.id}`)
    }

    goToAssignments = () => {
        this.props.history.push(`/assignments/${this.props.match.params.id}`)
    }

    render() {
        
        let standardsMapArray = this.props.standards.map((standard, index) => {
            return(
                <th key={index}>{standard.standard_name}</th>
            )
        });

        let studentsMapArray = this.props.students.map((student, index) => {
            return (
                <tr key={index}>
                    <td>{student.student_name}</td>
                </tr>
            )
        })

        let content = null;

        if (this.props.user.userName) {
            content = (

                <div>
                    {JSON.stringify(this.props.standards)}
                    {JSON.stringify(this.props.students)}
                    {JSON.stringify(this.props.scores)}
                    <h3>{this.props.currentClassroom.classroom_name}</h3>
                    <p>
                        Scores Table
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {standardsMapArray}
                            </tr>
                        </thead>
                        <tbody>
                            {studentsMapArray}
                        </tbody>
                    </table>
                    <button onClick={this.editClassroom}>
                        Edit Classroom
                    </button>
                    <button onClick={this.goToAssignments}>
                        Assignments
                    </button>
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
    currentClassroom: state.classroom.currentClassroom,
    standards: state.standard.standards,
    students: state.student.students,
    scores: state.score.scores,
});

export default connect(mapStateToProps)(ScoresTable);