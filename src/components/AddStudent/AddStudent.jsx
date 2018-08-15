import React, { Component } from 'react';
import {STUDENT_ACTIONS} from '../../redux/actions/studentActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import StudentListItem from '../StudentListItem/StudentListItem';

class AddStudent extends Component {

    defaultState = {
        newStudent: '',
        classroom_id: this.props.currentClassroom.id
    }
    constructor(props) {
        super(props);
        this.state = this.defaultState
    }

    componentDidMount() {
        this.props.dispatch({
            type: STUDENT_ACTIONS.FETCH_STUDENT,
            payload: this.props.currentClassroom.id,
        });
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

        let studentsMapArray = this.props.classroomStudents.map((student, index) => {
            return (
                <StudentListItem key={index} student={student} />
            )
        })

        console.log('addStudent props:', this.props)
        return (
            <div>
                {JSON.stringify(this.props.classroomStudents)}
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
                        {studentsMapArray}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        currentClassroom: state.classroom.currentClassroom,
        classroomStudents: state.student.students,
    })
}

export default withRouter(connect(mapStateToProps)(AddStudent));                  