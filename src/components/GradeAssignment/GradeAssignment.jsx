import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {ASSIGNMENT_ACTIONS} from '../../redux/actions/assignmentActions';

import Nav from '../Nav/Nav';

class GradeAssignment extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: ASSIGNMENT_ACTIONS.FETCH_CURRENT_ASSIGNMENT,
            payload: this.props.match.params.id
        })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    render() {
        let content = null;
        console.log(this.props)

        if (this.props.user.userName) {
            content = (
                <div>
                    {JSON.stringify(this.props.assignment)}
                    {JSON.stringify(this.props.assignment.assignment_name)}
                    <h3>
                        {this.props.assignment.assignment_name}
                    </h3>
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
});

export default withRouter(connect(mapStateToProps)(GradeAssignment));