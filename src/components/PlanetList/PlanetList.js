import React, { Component } from 'react';
// import {Router, Route , browserHistory} from 'react-router';
import { Link } from 'react-router-dom';
import './PlanetList.css';
import SearchBar from '../SearchBar/SearchBar';
import PlanetListItem from '..//PlanetListItem/PlanetListItem';

class PlanetList extends Component {
  state = {
    planetList: [],
    filteredPlanetList: [],
    isLoaded: false
  };

  renderFilteredList = (filteredPlanetList) => {
    this.setState({
      planetList: filteredPlanetList
    })
  }

  logOutUser = () => {
    localStorage.removeItem('isUserAuthenticated');
    this.props.history.push('/login');
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading.....!!!!</div>;
    }
    else {
      var planetItems = this.state.planetList.map(planet => {
        return(
            <PlanetListItem
              planetName={planet}
              key={planet.url}
            />
         );
      });
      return (
        <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <p>Logged in</p>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link onClick={this.logOutUser} to="#">Logout</Link></li>
            </ul>
          </div>
        </nav>
          <div className="row">
            <div className="col-md-12">
              <h1>Planet Listing Page</h1>
            </div>
          </div>
          <SearchBar renderFilteredList={this.renderFilteredList} planetList={this.state.filteredPlanetList}></SearchBar>
          <div className="col-md-12">
          <h2>Planets</h2>
            <ul className="list-group">
              {planetItems}
            </ul>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    this.getData('https://swapi.co/api/planets/?format=json').then((res)=> {
    this.setState({
        planetList: res.results,
        filteredPlanetList: res.results,
        isLoaded: true
      });
    });
  }

  getData = (url) => {
    return fetch(url).then((response) => response.json());
  }
}

export default PlanetList;