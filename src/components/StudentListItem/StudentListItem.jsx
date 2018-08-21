import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';
import swal from 'sweetalert';

class StudentListItem extends Component {

    deleteStudent = () => {
        swal({
            title: `Delete ${this.props.student.student_name}?`,
            text: `Are you sure you want to delete ${this.props.student.student_name}? All their scores will also be deleted. This cannot be undone.`,
            icon: "warning",
            dangerMode: true,
            buttons: [true, "Delete"],
        })
            .then(confirmed => {
                if (confirmed) {
                    this.props.dispatch({
                        type: STUDENT_ACTIONS.DELETE_STUDENT,
                        payload: this.props.student.id
                    });
                }
            });
    }

    render() {
        return (
            <tr>
                <td>{this.props.student.student_name}</td>
                <td><button onClick={this.deleteStudent}>Delete</button></td>
            </tr>
        )
    }
}

export default connect()(StudentListItem);