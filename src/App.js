import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Classrooms from './components/Classrooms/Classrooms';
import Assignments from './components/Assignments/Assignments';
import GradeAssignment from './components/GradeAssignment/GradeAssignment';
import ManageClassroom from './components/ManageClassroom/ManageClassroom';
import ScoresTable from './components/ScoresTable/ScoresTable';
import NotFound from './components/NotFound/NotFound';

import './styles/main.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8EBE28'
    },
    secondary: {
      main: '#f44336',
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
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
            path="/classrooms"
            component={Classrooms}
          />
          <Route
            path="/assignments/:id"
            component={Assignments}
          />
          <Route
            path="/grade/:id"
            component={GradeAssignment}
          />
          <Route
            path="/manage_classroom/:id"
            component={ManageClassroom}
          />
          <Route
            path="/scores/:id"
            component={ScoresTable}
          />
          {/* OTHERWISE (no path!) */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
