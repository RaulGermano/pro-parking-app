import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import PrimaryButton from '../components/Button/Primary';
import SecondaryButton from '../components/Button/Secondary';
import CreatedBy from '../components/CreatedBy';
import PROParkinLogo from '../../img/logo/logo_1.png';

const { width } = Dimensions.get('screen');

export default class Welcome extends Component {
	componentWillDidMount() {
		this.verifyLog();
	}

	verifyLog = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userId');

			this.props.navigation.navigate(userToken ? 'Home' : '');
		} catch (error) {
			console.log('erro: ', error);
		}
	};

	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');
		return userToken;
	};

	goingToSignUpPage = () => {
		this.props.navigation.navigate('Signup');
	};

	goingToLogInPage = () => {
		this.props.navigation.navigate('Login');
	};

	goingToAboutPage = () => {
		this.props.navigation.navigate('About');
	};

	render() {
		return (
			<View style={styles.container}>
				<Animatable.View
					animation='fadeInDown'
					style={styles.containerLogo}
				>
					<Image source={PROParkinLogo} style={styles.logoImage} />
				</Animatable.View>

				<View style={styles.containerButtons}>
					<Animatable.View
						animation='fadeInLeft'
						duration={1000}
						style={styles.buttonConfig}
					>
						<PrimaryButton
							title='Quero me juntar'
							onPress={this.goingToSignUpPage}
						/>
					</Animatable.View>

					<Animatable.View
						animation='fadeInLeft'
						duration={1500}
						style={styles.buttonConfig}
					>
						<SecondaryButton
							title='Entrar'
							onPress={this.goingToLogInPage}
						/>
					</Animatable.View>

					<Animatable.View
						animation='fadeInLeft'
						duration={1750}
						style={styles.buttonConfig}
					>
						<SecondaryButton
							title='Sobre o PRO Parking'
							onPress={this.goingToAboutPage}
						/>
					</Animatable.View>
				</View>
				<CreatedBy />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	containerLogo: {
		flex: 1,
		justifyContent: 'center'
	},
	logoImage: {
		width: 200,
		height: 200
	},
	buttonConfig: {
		width: width - 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		marginHorizontal: 10
	},
	containerButtons: {
		justifyContent: 'flex-end',
		marginBottom: 30
	}
});
