import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button} from '@material-ui/core';

import './login.css';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('/classrooms');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <div>
        <TextField
          error
          label="Username"
          id="username"
          className={this.props.classes.textField}
          helperText={this.props.login.message}
          margin="normal"
          placeholder="Username"
          onChange={this.handleInputChangeFor('username')}
        >
        </TextField>
        <TextField
          error
          label="Password"
          id="password"
          className={this.props.classes.textField}
          margin="normal"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInputChangeFor('password')}
          type="password"
        >
        </TextField>
        </div>
      );
    }
    return (
      <div>
      <TextField
        label="Username"
        id="username"
        className={this.props.classes.textField}
        helperText={this.props.login.message}
        margin="normal"
        placeholder="Username"
        onChange={this.handleInputChangeFor('username')}
      >
      </TextField>
      <TextField
        label="Password"
        id="password"
        className={this.props.classes.textField}
        margin="normal"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handleInputChangeFor('password')}
        type="password"
      >
      </TextField>
      </div>
    );
  }

  render() {
    return (
      <div className="loginFlexbox">
      <h1>Log In</h1>
        <form onSubmit={this.login}>

          {this.renderAlert()}
          <div className="loginFlexbox">
            <Button
              className={this.props.classes.button}
              type="submit"
              name="submit"
              value="Sign In"
              variant="contained"
              color="primary"
            >
            Sign In
            </Button>
            <br />
            <Link to="/register">New user? Click here to register.</Link>
          </div>
        </form>
      </div>
    );
  }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export default withStyles(styles)(connectedLoginPage)
