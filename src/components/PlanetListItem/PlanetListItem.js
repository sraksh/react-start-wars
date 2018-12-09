import React, { Component } from 'react';
// import {Router, Route , browserHistory} from 'react-router';
import './PlanetListItem.css';
// import Login from './components/Login/Login';

class PlanetListItem extends Component {

  render() {
		return(
			<li onClick={this.onVideoClick} className="list-item-group">
				<div className="">
					<div className="">
						{this.props.planetName.name}
					</div>
					<div className="">
						<div className="">
							{this.props.planetName.population}
						</div>
					</div>
				</div>
			</li>
		);
	}
}

export default PlanetListItem;