import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../Nav/Nav';

class GradeAssignment extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.FETCH_CURRENT_CLASSROOM,
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

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        Grade Assignment
            </p>
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
});

export default connect(mapStateToProps)(GradeAssignment);