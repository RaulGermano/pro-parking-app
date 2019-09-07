import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Auth extends Component {
	constructor(props) {
		super(props);

		this.verifyLog();
	}

	verifyLog = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userId');

			this.props.navigation.navigate(userToken ? 'Home' : 'Welcome');
		} catch (error) {
			console.log('erro: ', error);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size={50} color='#1f88d9' />
			</View>
		);
	}
}

export default Auth;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
