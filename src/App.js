import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cardlist from './Cardlist';
import Searchbox from './Searchbox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import './App.css';

import { setSearchField } from './actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: []
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({ robots: users }));
		
	}

	render() {
		const { robots } = this.state;
		const { searchField, onSearchChange } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return !robots.length ?
		<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<Searchbox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<Cardlist robots ={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
			);
		}
	

}
export default connect(mapStateToProps, mapDispatchToProps)(App);