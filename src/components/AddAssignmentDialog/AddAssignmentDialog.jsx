import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import ChipsArray from '../StandardChips/StandardChips';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';


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
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen}>Add Assignment</Button>
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
                        <h3>Select Assignment Standards:</h3>
                        <ChipsArray />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
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

export default connect(mapStateToProps)(AddAssignmentDialog);