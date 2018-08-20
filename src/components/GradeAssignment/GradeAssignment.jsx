import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SCORE_ACTIONS } from '../../redux/actions/scoreActions';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';

import Nav from '../Nav/Nav';
import GradeAssignmentListItem from '../GradeAssignmentListItem/GradeAssignmentListItem';

class GradeAssignment extends Component {
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
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    render() {
        let content = null;

        let scoresMapArray = this.props.scores.map((score, index) => {
            return(
                <GradeAssignmentListItem key={index} score={score} />
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
                            {scoresMapArray}
                        </tbody>
                    </table>
                    <button onClick={() => { this.props.history.push(`/assignments/${this.props.assignment.classroom_id}`) }}>Cancel</button>
                    <button>Submit</button>
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
    scores: state.score.scores,
});

export default withRouter(connect(mapStateToProps)(GradeAssignment));