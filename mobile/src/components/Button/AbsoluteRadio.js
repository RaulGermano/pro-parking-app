import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ButtonAbsoluteRadio extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableOpacity
				style={[
					styles.container,
					props.position,
					{ backgroundColor: props.bgColor }
				]}
				onPress={props.onPress}
			>
				<Icon
					size={props.iconSize}
					color={props.textColor}
					name={props.icon}
				/>
			</TouchableOpacity>
		);
	}
}

export default ButtonAbsoluteRadio;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		borderRadius: 100,
		width: 45,
		height: 45,
		elevation: 10,
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: {
			x: 0,
			y: 0
		}
	}
});
