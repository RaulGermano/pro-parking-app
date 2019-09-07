import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SimpleHeader extends Component {
	render() {
		const { props } = this;

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={props.onPress}>
					<Icon
						style={styles.icon}
						size={30}
						name={'ios-arrow-back'}
					/>
				</TouchableOpacity>
				<Text numberOfLines={1} style={styles.textTitle}>
					{props.title}
				</Text>
			</View>
		);
	}
}

export default SimpleHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20
	},
	icon: {
		color: '#000',
		marginHorizontal: 20,
		justifyContent: 'center'
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
	}
});
