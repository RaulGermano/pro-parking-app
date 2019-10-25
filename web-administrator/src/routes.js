import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import ParkingCreate from './pages/ParkingCreate';
import ParkingCreated from './pages/ParkingCreated';
import Introdution from './pages/Introdution';
import Users from './pages/Users';
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
			<PrivateRoute
				path='/parking-contacts-to-create'
				component={ParkingCreate}
			/>
			<PrivateRoute path='/parking-created' component={ParkingCreated} />
			<PrivateRoute path='/users' component={Users} />
			<PrivateRoute path='/introdution' component={Introdution} />
			<PrivateRoute path='/help-desk' component={Help} />
		</BrowserRouter>
	);
}

export default Routes;
