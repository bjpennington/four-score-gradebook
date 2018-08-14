import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../Nav/Nav';

class ScoresTable extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
        console.log('scores props:', this.props.match);
        

        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        Scores Table
                    </p>
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
});

export default connect(mapStateToProps)(ScoresTable);