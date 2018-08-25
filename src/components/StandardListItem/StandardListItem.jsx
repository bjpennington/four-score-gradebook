import React, { Component } from 'react';
import {connect} from 'react-redux';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';
import swal from 'sweetalert';
import {withStyles} from '@material-ui/core/styles';
import {Chip} from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class StandardListItem extends Component {

    deleteStandard = () => {
        swal({
            title: `Delete "${this.props.standard.standard_name}"?`,
            text: `Are you sure you want to delete "${this.props.standard.standard_name}"? All scores associated with this standard will also be deleted. This cannot be undone.`,
            icon: "warning",
            dangerMode: true,
            buttons: [true, "Delete"],
        })
            .then(confirmed => {
                if (confirmed) {
                    this.props.dispatch({
                        type: STANDARD_ACTIONS.DELETE_STANDARD,
                        payload: this.props.standard.id
                    });
                }
            });
    }

    render() {
        return (
            <Chip color="primary" label={this.props.standard.standard_name} onDelete={this.deleteStandard} className={this.props.classes.chip}></Chip>
        )
    }
}

const connectedStandardListItem = connect()(StandardListItem);
export default withStyles(styles)(connectedStandardListItem);