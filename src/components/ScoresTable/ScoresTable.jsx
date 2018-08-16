import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';

import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STANDARD_ACTIONS } from '../../redux/actions/standardActions';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';
import { SCORE_ACTIONS } from '../../redux/actions/scoreActions';

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

        // NEED TO STRUCTURE DATA FOR GRIDDLE!!!!
        // [
        // {
        //     student_name: this.props.students.student_name,
        //     standard_0: this.props.standards[0]score_for_standard: max(this.props.scores where student_id === student.id && standard_id === standard.id)
        //     repeat for all standards...
        // }
        //     {
        //         repeat for all scores...
        //     }
        // ]



        let studentRows = this.props.students.map((student) => {

            let standardsHeader = this.props.standards.map((standard) => {
                let scoresForStandard = [0]
                for (let score of this.props.scores) {

                    if (score.standard_id === standard.id && score.student_id === student.id) {
                        scoresForStandard.push(score.score)
                    }
                }
                return (
                    {
                        [standard.standard_name]: Math.max(...scoresForStandard)
                    }
                )
            })
            console.log(standardsHeader);
            console.log(...standardsHeader);

            for (let i = 0; i < standardsHeader; i++) {
                console.log(standardsHeader[0]);
            }


            return (
                {
                    student_name: student.student_name,
                    ...standardsHeader
                }
            )
        });

        console.log(studentRows);


        let content = null;

        if (this.props.user.userName) {
            content = (

                <div>
                    {/* {JSON.stringify(this.props.standards)} */}
                    {/* {JSON.stringify(this.props.students)} */}
                    {/* {JSON.stringify(this.props.scores)} */}
                    {JSON.stringify(studentRows)}
                    <h3>{this.props.currentClassroom.classroom_name}</h3>
                    <p>
                        Scores Table
                    </p>
                    <Griddle results={studentRows} />
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