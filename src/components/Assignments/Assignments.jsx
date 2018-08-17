import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';

import Nav from '../Nav/Nav';
import AssignmentsListItem from '../AssignmentsListItem/AssignmentsListItem';
import AddAssignmentModal from '../AddAssignmentModal/AddAssignmentModal';

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
                <div>
                    <button onClick={() => {this.props.history.push(`/scores/${this.props.match.params.id}`)}}>Back to Classroom</button>
                    <AddAssignmentModal />
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignmentMapArray}
                        </tbody>
                    </table>
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
    assignments: state.assignment.assignments
});

export default connect(mapStateToProps)(Assignments);