import React, { Component } from 'react';
import {connect} from 'react-redux';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';

class StandardListItem extends Component {

    deleteStandard = () => {
        this.props.dispatch({
            type: STANDARD_ACTIONS.DELETE_STANDARD,
            payload: this.props.standard.id
        })
    }

    render() {
        return (
            <li>{this.props.standard.standard_name} <button onClick={this.deleteStandard}>X</button></li>
        )
    }
}

export default connect()(StandardListItem);