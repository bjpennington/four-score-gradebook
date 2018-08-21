import React, { Component } from 'react';
import { STANDARD_ACTIONS } from '../../redux/actions/standardActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StandardListItem from '../StandardListItem/StandardListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStandard extends Component {

    defaultState = {
        newStandard: '',
        classroom_id: this.props.match.params.id,
    }
    constructor(props) {
        super(props);
        this.state = this.defaultState
    }

    componentDidMount() {
        this.props.dispatch({
            type: STANDARD_ACTIONS.FETCH_STANDARD,
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

    addStandard = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: STANDARD_ACTIONS.ADD_STANDARD,
            payload: this.state
        });
        toast("Standard added!", {
            hideProgressBar: true,
        });
        this.setState(
            this.defaultState
        );
    }

    render() {

        let standardsMapArray = this.props.classroomStandards.map((standard, index) => {
            return (
                <StandardListItem key={index} standard={standard} />
            )
        })

        return (
            <div>
                <ToastContainer
                    autoClose={2500}
                    newestOnTop
                />
                <form onSubmit={this.addStandard}>
                    <input
                        type="text"
                        placeholder="Standard"
                        value={this.state.newStandard}
                        onChange={this.handleChangeFor('newStandard')}
                    />
                    <button type="submit">+</button>
                </form>

                <h4>Standards for {this.props.currentClassroom.classroom_name}:</h4>
                <ul>
                    {standardsMapArray}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        classroomStandards: state.standard.standards.allStandards,
        currentClassroom: state.classroom.currentClassroom,
    })
}

export default withRouter(connect(mapStateToProps)(AddStandard));                  