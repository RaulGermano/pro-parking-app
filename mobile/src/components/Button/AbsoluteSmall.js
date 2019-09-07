import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SmallButton extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableOpacity
				style={[styles.container, props.position]}
				onPress={props.onPress}
			>
				<Icon color='#b7b7b7' size={props.iconSize} name={props.icon} />
			</TouchableOpacity>
		);
	}
}

export default SmallButton;

const styles = StyleSheet.create({
	container: {
		position: 'absolute'
	}
});
