import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class ClassroomsListItem extends Component {

    editClassroom = () => {
        this.props.push.history('/manage_classroom')
    }

    render() {
        return (
            <tr>
                <td>{this.props.classroom.classroom_name}</td>
                <td><button onClick={this.editClassroom}>Edit</button></td>
            </tr>
        )
    }

}

export default withRouter(connect()(ClassroomsListItem));