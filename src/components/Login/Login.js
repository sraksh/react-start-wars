import React, { Component } from 'react'
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: ''
  };
  
  dismissError = () => {
    this.setState({ error: '' });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }
    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    this.setAuthState();
    return this.setState({ error: '' });
  }

  setAuthState = () => {
    let i;
    let data = {
      username: this.state.username,
      password: this.state.password
    };
    this.getData('https://swapi.co/api/people/?format=json').then((res)=> {
      for(i=0; i< res.results.length; i++) {
        if(data.username === res.results[i].name && data.password === res.results[i].birth_year) {
          localStorage.setItem('isUserAuthenticated', true);
          this.props.history.push('/planets');
          return;
        }
        else {
          localStorage.setItem('isUserAuthenticated', false);
          return;
        }
      }
    });
  }

  getData = (url) => {
    return fetch(url).then((response) => response.json());
  }

  handleUserChange = (evt)=> {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange = (evt) => {
    this.setState({
      password: evt.target.value,
    });
  }

  isAuthenticated=()=> {
    if(localStorage.getItem('isUserAuthenticated') === "true") {
      this.props.history.push('/planets');
     return true;
    }
  }

  componentWillMount() {
    this.isAuthenticated();
  }
  render() {
    return (
      <div>
      <div className="container login-form">
        <div className="row">
          <div className="form_bg">
            <form onSubmit={this.handleSubmit}>
              {
                this.state.error &&
                <h3 data-test="error" onClick={this.dismissError}>
                  <button onClick={this.dismissError}>✖</button>
                  {this.state.error}
                </h3>
              }
              <h2 className="text-center">Login Page</h2>
              <br/>
              <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleUserChange}
                    value={this.state.username}
                    id="username"
                    placeholder="Username"
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={this.handlePassChange}
                    value={this.state.password}
                    id="password"
                    placeholder="Password"
                  />
              </div>
              <br/>
              <div className="align-center">
                <input
                  type="submit"
                  className="btn btn-primary"
                  id="login" value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Login;
