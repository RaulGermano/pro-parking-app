import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class PrimaryButton extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableOpacity style={styles.container} onPress={props.onPress}>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					colors={['#3769cc', '#40aaf2']}
					style={styles.button}
				>
					<Text style={styles.textButton}>{props.title}</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}

export default PrimaryButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 10,
		height: 45
	},
	button: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		borderRadius: 10
	},
	textButton: {
		fontSize: 18,
		fontWeight: '600',
		color: '#fff'
	}
});
