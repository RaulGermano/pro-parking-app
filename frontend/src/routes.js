import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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

import { isAuthenticated } from './services/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: '/', state: { from: props.location } }}
				/>
			)
		}
	/>
);

function Routes() {
	return (
		<BrowserRouter>
			<Route path='/' exact component={Login} />
			<PrivateRoute path='/main' component={Main} />
			<PrivateRoute path='/parking-space' component={parkingSpace} />
			<PrivateRoute path='/customers' component={Custumers} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
			<PrivateRoute path='/introdution' component={Introdution} />
			<PrivateRoute path='/about' component={About} />
			<PrivateRoute path='/profile' component={Profile} />
			<PrivateRoute path='/users' component={Users} />
			<PrivateRoute path='/vehicle' component={Vehicle} />
			<PrivateRoute path='/parking' component={Parking} />
			<PrivateRoute path='/help' component={Help} />
		</BrowserRouter>
	);
}

export default Routes;
