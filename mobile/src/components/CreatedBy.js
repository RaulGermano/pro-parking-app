import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

class CreatedBy extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text numberOfLines={1} style={styles.textTitle}>
					Desenvolvido e mantido pelo PRO Parking.
				</Text>
			</View>
		);
	}
}

export default CreatedBy;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textTitle: {
		fontSize: 12.5,
		color: '#aaa',
		fontWeight: '700'
	}
});
