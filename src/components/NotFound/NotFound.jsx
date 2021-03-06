import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../Nav/Nav';

class Assignments extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <Nav />
                    <h1>404</h1>
                </div>
            );
        }
        else {
            content = (
                <div>
                    <h1>404</h1>
                    <p>Looks like you might be lost. <span><a href="/home">Login first?</a></span></p>
                </div>
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(Assignments);