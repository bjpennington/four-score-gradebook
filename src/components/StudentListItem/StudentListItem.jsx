import React, { Component } from 'react';

class StudentListItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.student.student_name}</td>
                <td><button>Delete</button></td>
            </tr>
        )
    }
}

export default StudentListItem;