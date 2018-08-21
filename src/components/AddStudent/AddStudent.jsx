import React, { Component } from 'react';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentListItem from '../StudentListItem/StudentListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudent extends Component {

    defaultState = {
        newStudent: '',
        classroom_id: this.props.match.params.id,
    }
    constructor(props) {
        super(props);
        this.state = this.defaultState
    }

    componentDidMount() {
        this.props.dispatch({
            type: STUDENT_ACTIONS.FETCH_STUDENT,
            payload: this.props.match.params.id,
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
        this.props.dispatch({
            type: STUDENT_ACTIONS.ADD_STUDENT,
            payload: this.state
        });
        toast("Student added!", {
            hideProgressBar: true,
        });
        this.setState(
            this.defaultState
        );
    }

    render() {

        let studentsMapArray = this.props.classroomStudents.map((student, index) => {
            return (
                <StudentListItem key={index} student={student} />
            )
        })

        return (
            <div>
                <ToastContainer
                    autoClose={2500}
                    newestOnTop
                />
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
    return ({
        classroomStudents: state.student.students,
    })
}

export default withRouter(connect(mapStateToProps)(AddStudent));                  