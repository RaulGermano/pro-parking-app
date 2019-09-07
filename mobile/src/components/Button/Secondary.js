import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class SecondaryButton extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableOpacity style={styles.container} onPress={props.onPress}>
				<Text style={styles.textButton}>{props.title}</Text>
			</TouchableOpacity>
		);
	}
}

export default SecondaryButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 45,
		borderRadius: 10,
		backgroundColor: '#dadada',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10
	},
	textButton: {
		fontSize: 18,
		fontWeight: '600',
		color: '#666'
	}
});
