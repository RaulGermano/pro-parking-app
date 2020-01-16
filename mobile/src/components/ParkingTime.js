import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

class ParkingTime extends Component {
	render() {
		const { props } = this;

		return (
			<Animatable.View style={styles.container}>
				<Text style={styles.textTime}>{props.time}</Text>
			</Animatable.View>
		);
	}
}

export default ParkingTime;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 5,
		right: 5,
		backgroundColor: '#ff014c',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 100
	},
	textTime: {
		fontSize: 12.5,
		color: '#fff'
	}
});
