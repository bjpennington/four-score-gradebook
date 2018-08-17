import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ChipsArray from '../StandardChips/StandardChips';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});


class AddAssignmentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            assignment_name: '',
            assignment_standards: [],
        };
    }


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAssignmentInputChange = (event) => {
        this.setState({
            assignment_name: event.target.value,
        });
    }

    tagStandard = (event) => {
        this.setState({
            assignment_standards: [...this.state.assignment_standards, event.target.value]
        });
        console.log(event.target.style);
        console.log(event.target.classList);
    }

    render() {
        const { classes } = this.props;
        console.log(this.props)
        console.log(this.state.assignment_standards)
        console.log(this.state.assignment_name)

        return (
            <div>
                <Button onClick={this.handleOpen}>Add Assignment</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Assignment Name:
            </Typography>
                        <input type="text" onChange={this.handleAssignmentInputChange} value={this.state.assignment_name} />
                        <h3>Select Assignment Standards:</h3>
                        <ChipsArray />
                        <AddAssignmentModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

AddAssignmentModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return ({
        standards: state.standard.standards,
    })
}

// We need an intermediary variable for handling the recursive nesting.
const AddAssignmentModalConnected = connect(mapStateToProps)(AddAssignmentModal)

const AddAssignmentModalWrapped = withStyles(styles)(AddAssignmentModalConnected);

export default AddAssignmentModalWrapped;