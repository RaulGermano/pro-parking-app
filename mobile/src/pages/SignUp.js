import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import PrimaryButton from '../components/Button/Primary';
import SecondaryButton from '../components/Button/Secondary';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

class Signup extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		login: '',
		password: '',
		email: ''
	};

	goingToLogInPage = () => {
		this.props.navigation.navigate('Login');
	};

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

	handleEMail = email => {
		this.setState({
			email
		});
	};

	tryCreateNewUser = () => {
		const {
			state: { login, password, email }
		} = this;

		console.warn(login, password, email);
	};

	backPage = () => {
		this.props.navigation.navigate('Login');
	};

	render() {
		const { state } = this;

		return (
			<Animatable.View
				style={styles.container}
				animation='fadeInUp'
				duration={300}
			>
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
						onChangeText={password => this.handlePassword(password)}
						secureTextEntry={true}
						autoCorrect={false}
						ref={input => {
							this.TextInputPassword = input;
						}}
					/>

					<Text>E-Mail</Text>
					<TextInput
						style={styles.TextInput}
						value={state.email}
						keyboardType='email-address'
						onChangeText={email => this.handleEMail(email)}
						ref={input => {
							this.TextInputEMail = input;
						}}
					/>
				</View>

				<View style={styles.options}>
					<SecondaryButton
						title='Possuo cadastro'
						onPress={this.goingToLogInPage}
					/>

					<View style={styles.containerSeparetor} />

					<PrimaryButton
						title='Cadastrar'
						onPress={this.tryCreateNewUser}
					/>
				</View>
			</Animatable.View>
		);
	}
}

export default Signup;

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
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20
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
