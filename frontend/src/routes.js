import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import ParkingLots from './pages/ParkingLots';
import Custumers from './pages/Custumers';
import Dashboard from './pages/Dashboard';
import GetStarted from './pages/GetStarted';
import About from './pages/About';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Vehicle from './pages/Vehicle';
import Parking from './pages/Parking';

function Routes() {
	return (
		<BrowserRouter>
			<Route path='/' exact component={Login} />
			<Route path='/main' component={Main} />
			<Route path='/parkingLots' component={ParkingLots} />
			<Route path='/customers' component={Custumers} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/getStarted' component={GetStarted} />
			<Route path='/about' component={About} />
			<Route path='/profile' component={Profile} />
			<Route path='/users' component={Users} />
			<Route path='/vehicle' component={Vehicle} />
			<Route path='/parking' component={Parking} />
		</BrowserRouter>
	);
}

export default Routes;
