import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

class NonePedingParker extends Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={styles.containerRight}>
					<View style={styles.containerParker}>
						<Icon
							name='md-sad'
							size={25}
							color='#777'
							style={styles.iconStyles}
						/>
						<Text numberOfLines={1} style={styles.textParkerName}>
							Não há nenhuma parada pendente
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default NonePedingParker;

const styles = StyleSheet.create({
	containerRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textParkerName: {
		marginLeft: 10,
		fontSize: 15
	},
	containerParker: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconStyles: {
		width: 20
	},
	containerStyle: {
		flex: 1,
		height: 50,
		width: width - 30,

		backgroundColor: '#efefef',
		borderWidth: 0.5,
		borderRadius: 10,
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		borderColor: '#ccc',
		margin: 10,
		marginBottom: 5
	}
});
