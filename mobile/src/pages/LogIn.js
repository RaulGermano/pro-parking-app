import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	TouchableHighlight,
	Dimensions,
	ActivityIndicator,
	Alert
} from 'react-native';
import Api from '../services/Api';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import PrimaryButton from '../components/Button/Primary';
import SecondaryButton from '../components/Button/Secondary';
import Loader from '../components/Modal/Loader';
import WarningForm from '../components/Modal/WarningForm';

const { width } = Dimensions.get('window');

class Login extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		login: '',
		password: '',
		loaderVisible: false
	};

	componentWillMount() {
		this.setState({
			loaderVisible: true
		});
	}

	componentDidMount() {
		this.setState({
			loaderVisible: false
		});
	}

	handleLogin = login => {
		this.setState({
			login
		});
	};

	handlePassword = password => {
		this.setState({
			password
		});
	};

	updateLoader = load => {
		this.setState({
			loaderVisible: load
		});
	};

	openSignUp = () => {
		this.props.navigation.navigate('Signup');
	};

	hideWarningFormModal = () => {
		this.refs.testeTeste.toggleModal();
	};

	authenticationUser = async (login, password) => {
		const res = await Api.get(
			`/auth-client/?login=${login}&password=${password}`
		);

		if (res.data.response) {
			this.createLog();
			this.props.navigation.navigate('Home');
		} else {
			Alert.alert(res.data.message);
		}
	};

	tryAuthentication = () => {
		this.updateLoader(true);

		const {
			state: { login, password }
		} = this;

		if (!login.length || !password.length) {
			this.hideWarningFormModal();
			this.updateLoader(false);
		} else {
			this.authenticationUser(login, password);
		}
	};

	createLog = async () => {
		let userId = {
			name: 'Raul',
			genre: 'M'
		};

		await AsyncStorage.setItem('userId', JSON.stringify(userId));

		this.props.navigation.navigate('Home');
	};

	render() {
		const { state } = this;

		return (
			<Animatable.View
				style={styles.container}
				animation='fadeInUp'
				duration={300}
			>
				<Loader isModalVisible={state.loaderVisible} />
				<WarningForm ref={'testeTeste'} />

				<View>
					<Text>Login</Text>
					<TextInput
						style={styles.TextInput}
						value={state.login}
						onChangeText={login => this.handleLogin(login)}
						autoFocus={true}
						returnKeyType={'next'}
						onSubmitEditing={() => {
							this.TextInputPassword.focus();
						}}
					/>

					<Text>Senha</Text>
					<TextInput
						style={styles.TextInput}
						value={state.password}
						autoCorrect={false}
						onChangeText={password => this.handlePassword(password)}
						secureTextEntry={true}
						ref={input => {
							this.TextInputPassword = input;
						}}
					/>
				</View>

				<View style={styles.options}>
					<SecondaryButton
						title='Entrar'
						onPress={this.tryAuthentication}
					/>

					<View style={styles.containerSeparetor} />

					<PrimaryButton
						title='Novo usuário'
						onPress={this.openSignUp}
					/>
				</View>
			</Animatable.View>
		);
	}
}

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerSeparetor: {
		marginHorizontal: 10
	},
	options: {
		width: width - 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10
	},
	TextInput: {
		height: 45,
		backgroundColor: '#eaeaea',
		width: width - 40,
		borderRadius: 7,
		padding: 10,
		marginBottom: 20
	}
});
