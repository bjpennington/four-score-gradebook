import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';

class ClassroomsListItem extends Component {

    editClassroom = () => {
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.SET_CURRENT_CLASSROOM,
            payload: this.props.classroom.id
        });
        this.props.history.push(`/manage_classroom/${this.props.classroom.id}`);
    }

    render() {
        console.log('classroom:', this.props);
        return (
            <tr>
                <td><Link to={`/scores/${this.props.classroom.id}`}>{this.props.classroom.classroom_name}</Link></td>
                <td><button onClick={this.editClassroom}>Edit</button></td>
            </tr>
        )
    }

}

export default withRouter(connect()(ClassroomsListItem));