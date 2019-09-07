import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

class UserInformationItemList extends Component {
	render() {
		const { props } = this;
		return (
			<View style={styles.container}>
				<Text style={styles.textInformationTitle}>{props.title}</Text>
				<Text style={styles.textInformation}>{props.information}</Text>
			</View>
		);
	}
}

export default UserInformationItemList;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 7.5,
		marginHorizontal: 20,
		borderBottomColor: '#777',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	textInformation: {
		fontSize: 20,
		fontWeight: '300',
		color: '#222'
	},
	textInformationTitle: {
		fontSize: 15,
		fontWeight: '300',
		color: '#888',
		marginBottom: 5
	}
});
