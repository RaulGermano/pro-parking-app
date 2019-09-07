import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

class TitlePage extends Component {
	render() {
		return (
			<View style={styles.containerTitle}>
				<Text numberOfLines={1} style={styles.textTitle}>
					{this.props.titleText}
				</Text>
			</View>
		);
	}
}

export default TitlePage;

const styles = StyleSheet.create({
	containerTitle: {
		margin: 20
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
	}
});
