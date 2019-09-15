import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import parkingSpace from './pages/ParkingSpace';
import Custumers from './pages/Custumers';
import Dashboard from './pages/Dashboard';
import Introdution from './pages/Introdution';
import About from './pages/About';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Vehicle from './pages/Vehicle';
import Parking from './pages/Parking';
import Help from './pages/Help';

function Routes() {
	return (
		<BrowserRouter>
			<Route path='/' exact component={Login} />
			<Route path='/main' component={Main} />
			<Route path='/parking-space' component={parkingSpace} />
			<Route path='/customers' component={Custumers} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/introdution' component={Introdution} />
			<Route path='/about' component={About} />
			<Route path='/profile' component={Profile} />
			<Route path='/users' component={Users} />
			<Route path='/vehicle' component={Vehicle} />
			<Route path='/parking' component={Parking} />
			<Route path='/help' component={Help} />
		</BrowserRouter>
	);
}

export default Routes;
