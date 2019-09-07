import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

class CompleteHeader extends Component {
	render() {
		const { props } = this;

		return (
			<View style={styles.container}>
				<Animatable.View
					animation='fadeInLeft'
					duration={700}
					style={styles.containerBackWithTitle}
				>
					<TouchableOpacity onPress={props.onBackPress}>
						<Icon
							style={styles.icon}
							size={30}
							name={'ios-arrow-back'}
						/>
					</TouchableOpacity>
					<Text numberOfLines={1} style={styles.textTitle}>
						{props.title}
					</Text>
				</Animatable.View>

				<Animatable.View animation='fadeInRight' duration={700}>
					<TouchableOpacity onPress={props.onOptionPress}>
						<Icon
							style={styles.icon}
							size={30}
							name={props.option}
						/>
					</TouchableOpacity>
				</Animatable.View>
			</View>
		);
	}
}

export default CompleteHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20,
		justifyContent: 'space-between'
	},
	icon: {
		color: '#000',
		marginHorizontal: 20
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
	},
	containerBackWithTitle: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
