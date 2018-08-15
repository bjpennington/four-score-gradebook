import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';

import Nav from '../Nav/Nav';
import ClassroomsListItem from '../ClassroomsListItem/ClassroomsListItem';

class Classrooms extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CLASSROOM_ACTIONS.FETCH_CLASSROOMS });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    handeCreateClassroom = () => {
        this.props.dispatch({
            type: CLASSROOM_ACTIONS.CREATE_CLASSROOM,
            payload: ''
        });
    }

    render() {
        console.log(this.props)

        let classroomMapArray = this.props.classrooms.map((classroom, index) => {
            return (
                <ClassroomsListItem classroom={classroom} key={index} />
            )
        });

        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <button onClick={this.handeCreateClassroom}>
                        Create New Classroom
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {classroomMapArray}
                        </tbody>
                    </table>
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
    classrooms: state.classroom.classrooms,
    currentClassroom: state.classroom.currentClassroom
});

export default connect(mapStateToProps)(Classrooms);
