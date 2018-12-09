import React, { Component } from 'react';
// import {Router, Route , browserHistory} from 'react-router';
import './Unauthorized.css';
// import Login from './components/Login/Login';

class Unauthorized extends Component {

  render() {
		return(
				<div className="">
					You are not authorized to access this page!!!
				</div>
		);
	}
}

export default Unauthorized;