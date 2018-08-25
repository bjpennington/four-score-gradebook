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
          <ul className="navlinks">
            <li id="navitem1">
              <NavLink to="/classrooms">
                  My Classrooms
              </NavLink>
            </li>
            <li id="navitem2">
              <NavLink to="/" onClick={this.logout}>
                Log Out
              </NavLink>
            </li>
          </ul>
      </div>
    )
  }

};

export default connect()(Nav);
