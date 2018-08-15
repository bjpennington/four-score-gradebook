import React, { Component } from 'react';
import {connect} from 'react-redux';
import {STUDENT_ACTIONS} from '../../redux/actions/studentActions';

class StudentListItem extends Component {

    deleteStudent = () => {
        this.props.dispatch({
            type: STUDENT_ACTIONS.DELETE_STUDENT,
            payload: this.props.student.id
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.student.student_name}</td>
                <td onClick={this.deleteStudent}><button>Delete</button></td>
            </tr>
        )
    }
}

export default connect()(StudentListItem);