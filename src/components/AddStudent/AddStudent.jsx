import React, { Component } from 'react';
import {STUDENT_ACTIONS} from '../../redux/actions/studentActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class AddStudent extends Component {

    defaultState = {
        newStudent: '',
        classroom_id: this.props.currentClassroom.id
    }
    constructor(props) {
        super(props);
        this.state = this.defaultState
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                ...this.state,
                [propertyName]: event.target.value
            })
        }
    }

    addStudent = (event) => {
        event.preventDefault();
        console.log('classroom created:', this.state);
        this.props.dispatch({
            type: STUDENT_ACTIONS.ADD_STUDENT,
            payload: this.state
        });
        this.setState(
            this.defaultState
        )
    }

    render() {
        console.log('addStudent props:', this.props)
        return (
            <div>
                <form onSubmit={this.addStudent}>
                    <input
                        type="text"
                        placeholder="Student Name"
                        value={this.state.newStudent}
                        onChange={this.handleChangeFor('newStudent')}
                    />
                    <button type="submit">+</button>
                </form>


                <table>
                    <thead>
                        <tr>
                            <th>Students</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BJ Pennington</td>
                            <td><button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>De'Anthony Miller</td>
                            <td><button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>Peter Johnson</td>
                            <td><button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>Tyler Sehr</td>
                            <td><button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>Dane Smith</td>
                            <td><button>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        currentClassroom: state.classroom.currentClassroom
    })
}

export default withRouter(connect(mapStateToProps)(AddStudent));                  