import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';

import Nav from '../Nav/Nav';
import AddStudent from '../AddStudent/AddStudent';
import AddStandard from '../AddStandard/AddStandard';

class ManageClassroom extends Component {

    defaultState = {
        classroom_name: '',
        id: this.props.currentClassroom.id,
    }

    constructor(props) {
        super(props);
        this.state = this.defaultState
    }

    componentDidMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER,
            payload: this.props.currentClassroom.id
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
        console.log('classroom created:', this.state);
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.EDIT_CLASSROOM,
            payload: this.state
        });
        this.setState(
            this.defaultState
        )
    }

    render() {

        console.log('current classroom:', this.props);
        

        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    {JSON.stringify(this.props.currentClassroom)}
                    <form onSubmit={this.updateClassroomName}>
                        <input
                            type="text"
                            placeholder="Classroom Name"
                            value={this.state.classroom_name}
                            onChange={this.handleChangeFor('classroom_name')}
                        />
                        <button type="submit">
                            Save Name
                        </button>
                    </form>

                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
                <AddStudent />
                <AddStandard />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentClassroom: state.classroom.currentClassroom
});

export default connect(mapStateToProps)(ManageClassroom);