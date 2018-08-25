import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';

import Nav from '../Nav/Nav';
import AddStudent from '../AddStudent/AddStudent';
import AddStandard from '../AddStandard/AddStandard';

import './manageClassroom.css';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: 5,
    }
});


class ManageClassroom extends Component {

    defaultState = {
        classroom_name: '',
        id: this.props.match.params.id,
    }

    constructor(props) {
        super(props);
        this.state = this.defaultState
    }

    componentDidMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER,
        });
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.FETCH_CURRENT_CLASSROOM,
            payload: this.props.match.params.id,
        });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                ...this.state,
                [propertyName]: event.target.value
            })
        }
    }

    updateClassroomName = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.EDIT_CLASSROOM,
            payload: this.state
        });
        toast("Classroom updated!", {
            hideProgressBar: true,
        });
        this.setState(
            this.defaultState
        );
    }

    render() {


        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <div className="manageClassroomFlexbox">
                        <ToastContainer
                            autoClose={2500}
                            newestOnTop
                        />
                        <h2>Manage {this.props.currentClassroom.classroom_name}</h2>
                        <Button variant="outlined" color="primary" onClick={() => { this.props.history.push(`/scores/${this.props.currentClassroom.id}`) }}>View Classroom</Button>
                        <form onSubmit={this.updateClassroomName}>
                            <TextField
                                id="classroomName"
                                label="Classroom Name"
                                type="text"
                                placeholder="Classroom Name"
                                value={this.state.classroom_name}
                                onChange={this.handleChangeFor('classroom_name')}
                                margin="normal"
                            >
                            </TextField>
                            <div className="manageClassroomFlexbox">
                                <Button size="small" className={this.props.classes.button} color="secondary" variant="contained" type="submit">
                                    Update Name
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="manageClassroomGrid">
                        <AddStudent />
                        <AddStandard />
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
    currentClassroom: state.classroom.currentClassroom
});

const connectedManageClassroom = connect(mapStateToProps)(ManageClassroom);
export default withStyles(styles)(connectedManageClassroom);