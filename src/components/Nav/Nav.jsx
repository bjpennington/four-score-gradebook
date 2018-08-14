import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

class Nav extends Component {

  logout = (event) => {
    event.preventDefault();
    this.props.dispatch(triggerLogout());
  }

  render() {
    return (
      <div className="navbar">
        <div>
          <ul>
            <li>
              <NavLink to="/classrooms">
                My Classrooms
              </NavLink>
            </li>
            <li>
              <button onClick={this.logout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

};

export default connect()(Nav);
