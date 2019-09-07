import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BadgeMap extends Component {
	render() {
		const { props } = this;
		return (
			<TouchableOpacity
				style={[
					styles.container,
					props.position,
					props.theme == 'dark'
						? { backgroundColor: '#aaa' }
						: { backgroundColor: props.color }
				]}
				onPress={props.onPress}
			>
				<Icon
					size={27.5}
					color={props.theme == 'dark' ? '#333' : props.textColor}
					name={props.icon}
				/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		borderRadius: 100,
		width: 45,
		height: 45,
		elevation: 15,
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: {
			x: 0,
			y: 0
		}
	}
});
