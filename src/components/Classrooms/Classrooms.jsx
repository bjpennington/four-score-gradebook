import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';

import Nav from '../Nav/Nav';
import ClassroomsListItem from '../ClassroomsListItem/ClassroomsListItem';

import './classrooms.css'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
        maxWidth: 900,
    },
    tableCell: {
        fontSize: "50px",
    }
});

class Classrooms extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CLASSROOM_ACTIONS.FETCH_CLASSROOMS });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    handeCreateClassroom = () => {
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.CREATE_CLASSROOM,
            payload: { classroom_name: 'New Classroom' }
        });
        toast("Classroom created!", {
            hideProgressBar: true,
        });
    }


    render() {

        let classroomMapArray = this.props.classrooms.map((classroom, index) => {
            return (
                <ClassroomsListItem classroom={classroom} key={index} />
            )
        });

        let content = null;

        if (this.props.user.userName) {
            content = (
                <div className="classroomsGrid">
                <div className="classroomsContainer">
                    <ToastContainer
                        autoClose={2500}
                        newestOnTop
                    />
                    <h2>{this.props.user.userName}'s Classrooms:</h2>
                    <Grid container justify="center" alignItems="center">
                    <Button width="50%" color="secondary" variant="contained" onClick={this.handeCreateClassroom}>
                        Create New Classroom
                    </Button>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classroomMapArray}
                        </TableBody>
                    </Table>
                    </Grid>
                </div>
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    classrooms: state.classroom.classrooms,
    currentClassroom: state.classroom.currentClassroom
});

const connectedClassrooms = connect(mapStateToProps)(Classrooms);
export default withStyles(styles)(connectedClassrooms)