import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../Nav/Nav';

class ManageClassroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classroom_name: '',
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                [propertyName]: event.target.value
            })
        }
    }

    render() {

        console.log(this.state.classroom_name);

        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Classroom Name"
                            value={this.state.classroom_name}
                            onChange={this.handleChangeFor('classroom_name')}
                        />
                    </form>
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
});

export default connect(mapStateToProps)(ManageClassroom);