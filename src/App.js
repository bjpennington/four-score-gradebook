import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import Classrooms from './components/Classrooms/Classrooms';
import Assignments from './components/Assignments/Assignments';
import GradeAssignment from './components/GradeAssignment/GradeAssignment';
import ManageClassroom from './components/ManageClassroom/ManageClassroom';
import ScoresTable from './components/ScoresTable/ScoresTable';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="FourScore" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/classrooms"
          component={Classrooms}
        />
        <Route
          path="/assignments"
          component={Assignments}
        />
        <Route
          path="/grade"
          component={GradeAssignment}
        />
        <Route
          path="/manage_classroom"
          component={ManageClassroom}
        />
        <Route
          path="/scores"
          component={ScoresTable}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
