import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
	MarkerInformationThemeLight,
	MarkerInformationThemeDark
} from '../config/MarkerInfomationTheme';

class MarkerInformation extends Component {
	render() {
		const { props } = this;

		return (
			<View
				style={
					(props.theme = 'ligth'
						? MarkerInformationThemeLight.container
						: MarkerInformationThemeDark.container)
				}
			>
				<Text
					style={
						(props.theme = 'ligth'
							? MarkerInformationThemeLight.textNameInformation
							: MarkerInformationThemeDark.textNameInformation)
					}
				>
					{props.localName}
				</Text>
			</View>
		);
	}
}

export default MarkerInformation;
