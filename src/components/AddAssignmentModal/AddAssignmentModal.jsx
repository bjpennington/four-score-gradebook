import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
            assignment_name: ''
          };
    }

  

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {classes}  = this.props;
    console.log(this.props)

    const standardsMapArray = this.props.standards.map((standard, index) => {
        return (
            <li key={index}>{standard.standard_name}</li>
        )
    });

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
            <input type="text"/>
            <ul>
                {standardsMapArray}
            </ul>
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