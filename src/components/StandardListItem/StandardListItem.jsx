import React, { Component } from 'react';
import {connect} from 'react-redux';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';
import swal from 'sweetalert';

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
            <li>{this.props.standard.standard_name} <button onClick={this.deleteStandard}>X</button></li>
        )
    }
}

export default connect()(StandardListItem);