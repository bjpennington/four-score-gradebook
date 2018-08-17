import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CLASSROOM_ACTIONS } from '../../redux/actions/classroomActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ASSIGNMENT_ACTIONS } from '../../redux/actions/assignmentActions';

import Nav from '../Nav/Nav';

class GradeAssignment extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: ASSIGNMENT_ACTIONS.FETCH_CURRENT_ASSIGNMENT,
            payload: this.props.match.params.id
        })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    render() {
        let content = null;
        console.log(this.props)

        if (this.props.user.userName) {
            content = (
                <div>
                    {JSON.stringify(this.props.assignment)}
                    {JSON.stringify(this.props.assignment.assignment_name)}
                    <h3>
                        {this.props.assignment.assignment_name}
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Standard</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>BJ Pennington</td>
                                <td>Recognize Design Flaws <br/>Use Appropriate Safety <br/>Measure and Calculate Speed</td>
                                <td>1 2 3 4 <br/> 1 2 3 4 <br/> 1 2 3 4</td>
                            </tr>
                            <tr>
                                <td>Peter Johnson</td>
                                <td>Recognize Design Flaws <br/>Use Appropriate Safety <br/>Measure and Calculate Speed</td>
                                <td>1 2 3 4 <br/> 1 2 3 4 <br/> 1 2 3 4</td>
                            </tr>
                            <tr>
                                <td>Tyler Sehr</td>
                                <td>Recognize Design Flaws <br/>Use Appropriate Safety <br/>Measure and Calculate Speed</td>
                                <td>1 2 3 4 <br/> 1 2 3 4 <br/> 1 2 3 4</td>
                            </tr>
                            <tr>
                                <td>De'Anthony Miller</td>
                                <td>Recognize Design Flaws <br/>Use Appropriate Safety <br/>Measure and Calculate Speed</td>
                                <td>1 2 3 4 <br/> 1 2 3 4 <br/> 1 2 3 4</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => {this.props.history.push(`/assignments/${this.props.assignment.classroom_id}`)}}>Cancel</button>
                    <button>Submit</button>
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
    assignment: state.assignment.currentAssignment,
});

export default withRouter(connect(mapStateToProps)(GradeAssignment));