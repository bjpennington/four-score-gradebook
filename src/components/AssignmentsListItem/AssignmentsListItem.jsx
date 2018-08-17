import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class AssignmentsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        }
    }

    editAssignment = () => {
        this.setState({
            editMode: true
        })
    }

    render() {
        console.log('assignment:', this.props);
            return (


                <tr>
                    <td><Link to={`/grade/${this.props.assignment.id}`}>{this.props.assignment.assignment_name}</Link></td>
                    <td><button onClick={this.editAssignment}>Edit</button></td>
                </tr>
            )
        }
}

export default withRouter(connect()(AssignmentsListItem));