import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button} from '@material-ui/core';

import './register.css';

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

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <div>
        <TextField
          error
          label="Username"
          id="username"
          className={this.props.classes.textField}
          helperText={this.state.message}
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
        helperText={this.state.message}
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
      <div className="registerFlexbox">
          <h1>Register User</h1>
        <form onSubmit={this.registerUser}>
          {this.renderAlert()}
          <div className="registerFlexbox">
            <Button
              className={this.props.classes.button}
              type="submit"
              name="submit"
              value="Register"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            <Link to="/home">
            <Button
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterPage);

