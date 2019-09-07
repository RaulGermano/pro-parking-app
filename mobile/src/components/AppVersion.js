import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class AppVersion extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableOpacity disabled={true}>
				<View style={styles.container}>
					<View style={styles.containerIconText}>
						<Icon
							name={props.icon}
							size={24}
							color={props.color}
							style={styles.icon}
						/>
						<Text
							style={[
								styles.textSettingsTitle,
								{
									color: props.color,
									fontWeight: props.fontWeight
								}
							]}
						>
							{props.settingsTitle}
						</Text>
					</View>

					<View>
						<Text>{props.version}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default AppVersion;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 20
	},
	containerIconText: {
		flex: 1,
		flexDirection: 'row'
	},
	textSettingsTitle: {
		fontWeight: '300',
		fontSize: 15
	},
	icon: {
		marginRight: 15
	}
});
