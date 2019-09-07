import React from 'react';
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator,
	createBottomTabNavigator,
	createSwitchNavigator
} from 'react-navigation';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Login from './pages/LogIn';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Doubts from './pages/Doubts';
import Auth from './pages/Authentication';
import LogOut from './pages/LogOut';
import Parked from './pages/Parked';
import Car from './pages/Car';
import CarInformation from './pages/CarInformation';
import MarkerInformations from './pages/MarkerInformations';
import Icon from 'react-native-vector-icons/FontAwesome5';

const configBottomTabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: 'Início',
				tabBarIcon: ({ tintColor }) => (
					<Icon color={tintColor} size={25} name={'home'} solid />
				)
			}
		},
		Car: {
			screen: Car,
			navigationOptions: {
				tabBarLabel: 'Carros',
				tabBarIcon: ({ tintColor }) => (
					<Icon color={tintColor} size={25} name={'car'} />
				)
			}
		},
		Parked: {
			screen: Parked,
			navigationOptions: {
				tabBarLabel: 'Paradas',
				tabBarIcon: ({ tintColor }) => (
					<Icon color={tintColor} size={25} name={'book-open'} />
				)
			}
		},
		Profile: {
			screen: Profile,
			navigationOptions: {
				tabBarLabel: 'Perfil',
				tabBarIcon: ({ tintColor }) => (
					<Icon color={tintColor} size={25} name={'user'} solid />
				)
			}
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				tabBarLabel: 'Configurações',
				tabBarIcon: ({ tintColor }) => (
					<Icon color={tintColor} size={25} name={'cog'} solid />
				)
			}
		}
	},
	{
		initialRouteName: 'Home',
		tabBarOptions: {
			activeTintColor: '#3769cc',
			inactiveTintColor: '#777',
			showLabel: false,
			showIcon: true,
			style: {
				height: 50,
				backgroundColor: '#fff',
				borderBottomWidth: 0,
				elevation: 10,
				shadowOffset: {
					width: 5,
					height: 3
				},
				shadowColor: '#111',
				shadowOpacity: 0.5,
				elevation: 5
			}
		}
	}
);

// configCarInformationStackNavigator.navigationOptions = ({ navigation }) => {
// 	console.log(navigation);
// };

// const configNewCarStackNavigator = createStackNavigator({
// 	NewCar: {
// 		screen: NewCar
// 	}
// });

const configSearchSwitchNavigator = createSwitchNavigator({
	Search: {
		screen: Search,
		header: null
	},
	MarkerInformations: {
		screen: MarkerInformations
	}
});

const configDoubtsStackNavigator = createStackNavigator({
	Doubts: {
		screen: Doubts
	}
});

const configAboutStackNavigator = createStackNavigator({
	About: {
		screen: About,
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'Sobre nós'
		})
	}
});

const configLoginStackNavigator = createStackNavigator({
	Login: {
		screen: Login
	}
});

const configSignupStackNavigator = createStackNavigator(
	{
		Signup: {
			screen: Signup
		}
	},
	{
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#fff'
			},
			headerTintColor: '#000',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		}
	}
);

const configCarInformationStackNavigator = createStackNavigator({
	CarInformation: {
		screen: CarInformation
	}
});

const configCreateSwitchNavigator = createSwitchNavigator(
	{
		InformacoesCarro: {
			screen: configCarInformationStackNavigator
		},

		CarInformation,

		AuthLoading: Auth,

		Welcome: {
			screen: Welcome
		},

		Search: {
			screen: configSearchSwitchNavigator
		},

		About: {
			screen: configAboutStackNavigator
		},

		Login: {
			screen: configLoginStackNavigator
		},

		Signup: {
			screen: configSignupStackNavigator
		},

		Teste: {
			screen: configBottomTabNavigator
		},
		Doubts: {
			screen: configDoubtsStackNavigator
		},
		LogOut: {
			screen: LogOut
		}
	},
	{
		// initialRouteName: 'Welcome'
		initialRouteName: 'AuthLoading'
	}
);

const Routes = createAppContainer(configCreateSwitchNavigator);

export default Routes;
