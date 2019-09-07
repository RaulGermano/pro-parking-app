import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

class ParkingNamePendingParking extends Component {
	render() {
		const { props } = this;

		return (
			<Animatable.View style={styles.container}>
				<Text style={styles.textTime}>{props.parkingName}</Text>
			</Animatable.View>
		);
	}
}

export default ParkingNamePendingParking;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 5,
		right: 5,
		backgroundColor: '#cecdcd',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 100
	},
	textTime: {
		fontSize: 12.5,
		color: '#333'
	}
});
