import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cardlist from './Cardlist';
import Searchbox from './Searchbox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from './actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots, 
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return isPending ?
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