import React, { Component } from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { connect } from 'react-redux';
import ChipsArray from '../StandardChips/StandardChips';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';
import swal from 'sweetalert';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: 5,
    }
});

class AddAssignmentDialog extends Component {

    defaultState = {
        open: false,
        assignment_name: '',
    }

    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.dispatch({
            type: STANDARD_ACTIONS.UNSET_STANDARDS,
        });
        this.setState(this.defaultState);
    };

    handleAssignmentInputChange = (event) => {
        this.setState({
            assignment_name: event.target.value,
        });
    }

    addAssignment = () => {
        this.props.dispatch({
            type: ASSIGNMENT_ACTIONS.ADD_ASSIGNMENT,
            payload: {
                assignment_name: this.state.assignment_name,
                classroom_id: this.props.currentClassroom.id,
                assignment_standards: this.props.taggedStandards,
                class_students: this.props.classStudents,
            }
        });
        swal({
            title: "Assignment Created!",
            icon: "success",
            buttons: false,
            timer: 2000,
        });
        this.handleClose();

    }

    render() {
        return (
            <div>
                <Button className={this.props.classes.button} color="secondary" variant="contained" onClick={this.handleOpen}>Add Assignment</Button>
                <Dialog
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            // id="assignment_name"
                            label="Assignment Name"
                            type="text"
                            fullWidth
                            onChange={this.handleAssignmentInputChange}
                            value={this.state.assignment_name}
                        />
                        <DialogTitle>Select Assignment Standards:</DialogTitle>
                        <ChipsArray />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.addAssignment} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        standards: state.standard.standards.allStandards,
        currentClassroom: state.classroom.currentClassroom,
        taggedStandards: state.standard.standards.taggedStandards,
        classStudents: state.student.students,
    })
}

const connectedAddAssignmentDialog = connect(mapStateToProps)(AddAssignmentDialog);
export default withStyles(styles)(connectedAddAssignmentDialog);