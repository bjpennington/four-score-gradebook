import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';

import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STANDARD_ACTIONS } from '../../redux/actions/standardActions';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';
import { SCORE_ACTIONS } from '../../redux/actions/scoreActions';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import Nav from '../Nav/Nav';

import './scoreTable.css';

const styles = theme => ({
    button: {
        margin: 5,
    },
    input: {
        display: 'none',
    },
});

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
        console.log(this.props)

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

            const standardsObject = standardsHeader.reduce((accumulator, currentValue) => {
                return { ...accumulator, ...currentValue }
            }, {})

            return (
                {
                    student_name: student.student_name,
                    ...standardsObject
                }
            )
        });


        let content = null;

        if (this.props.user.userName) {
            content = (

                <div className="scoreViewGrid">
                    <h2>{this.props.currentClassroom.classroom_name}</h2>
                    <Button className={this.props.classes.button} variant="outlined" color="primary" onClick={this.editClassroom}>
                        Edit Classroom
                    </Button>
                    <Button className={this.props.classes.button} variant="contained" color="primary" onClick={this.goToAssignments}>
                        Assignments
                    </Button>
                    <Griddle results={studentRows} />
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
    standards: state.standard.standards.allStandards,
    students: state.student.students,
    scores: state.score.scores,
});

const connectedScoresTable = connect(mapStateToProps)(ScoresTable);
export default withStyles(styles)(connectedScoresTable);