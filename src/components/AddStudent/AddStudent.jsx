import React, { Component } from 'react';
import { STUDENT_ACTIONS } from '../../redux/actions/studentActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentListItem from '../StudentListItem/StudentListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Button, Table, TableRow, TableCell, TableBody, TableHead, TextField} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {withStyles} from '@material-ui/core/styles'

import './addStudent.css';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 300,
      maxWidth: '40%',
      margin: 10,
    },
    button: {
        margin: 10,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
  });

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
            <div className="addStudentFlexbox">
                <ToastContainer
                    autoClose={2500}
                    newestOnTop
                />
                <form onSubmit={this.addStudent}>
                    <TextField
                        type="text"
                        placeholder="Student Name"
                        id="studentName"
                        label="Student Name"
                        value={this.state.newStudent}
                        onChange={this.handleChangeFor('newStudent')}
                    >
                    </TextField>
                    <Button variant="fab" mini color="secondary" type="submit"><Add /></Button>
                </form>


                <Table className={this.props.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Students</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentsMapArray}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        classroomStudents: state.student.students,
    })
}

const connectedAddStudent = withRouter(connect(mapStateToProps)(AddStudent));
export default withStyles(styles)(connectedAddStudent);