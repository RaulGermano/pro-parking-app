import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

class LastParked extends Component {
	render() {
		const { props } = this;
		return (
			<View style={styles.container}>
				<Text numberOfLines={1} style={[styles.textName, {textTransform: 'uppercase'}]}>
					{props.name}
				</Text>
				<View style={styles.containerLastParked}>
					<Text style={styles.textPayValue}>R$ {props.payValue.toFixed(2).replace('.', ',')}</Text>

					<Text style={styles.textHours}>{props.hours.toFixed(2).replace('.', ',')} horas</Text>
				</View>
			</View>
		);
	}
}

export default LastParked;

const styles = StyleSheet.create({
	container: {
		margin: 5,
		borderWidth: 1,
		borderColor: '#1115',
		borderRadius: 10,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		backgroundColor: '#fff',
		width: width / 4,
		height: width / 4
	},
	textName: {
		fontSize: 12,
		color: '#333',
		paddingHorizontal: 5,
		paddingVertical: 5
	},
	containerLastParked: {
		flex: 1,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		backgroundColor: '#eaeaea',
		justifyContent: 'center',
		alignItems: 'center'
	},

	textPayValue: {
		color: '#3769cc',
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center'
	},
	textHours: {
		fontSize: 15,
		color: '#333',
		fontWeight: '600',
		textAlign: 'center',
		paddingTop: 10
	}
});
