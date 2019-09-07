import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LogOut extends Component {
	constructor(props) {
		super(props);

		this.deleteLog();
	}

	deleteLog = async () => {
		await AsyncStorage.removeItem('userId');

		this.props.navigation.navigate('Welcome');
	};

	render() {
		return (
			<View>
				<Text>Sair</Text>
			</View>
		);
	}
}

export default LogOut;

const styles = StyleSheet.create({});
