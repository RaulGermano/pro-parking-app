import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

class PendingParkedItem extends Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={styles.containerLeft}>
					<Icon name='md-time' size={45} color='#ff014c' />
				</View>
				<View style={styles.containerRight}>
					<View style={styles.containerValues}>
						<Icon
							name='ios-cash'
							size={24}
							color='#777'
							style={styles.iconStyles}
						/>
						<Text style={styles.textPrimary}>
							R${this.props.valuePerHour} por hora
						</Text>
					</View>

					<View style={styles.containerParker}>
						<Icon
							name='ios-pin'
							size={24}
							color='#777'
							style={styles.iconStyles}
						/>
                        <Text style={styles.textPrimary}>{this.props.vehicleName}</Text>
						<Text style={styles.textSeparator}>-</Text>
						<Text style={styles.textValuePerHour}>
							{this.props.parkerName}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default PendingParkedItem;

const styles = StyleSheet.create({
	containerRight: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	textParkerName: {
		marginLeft: 10,
		fontSize: 15
	},
	containerParker: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: 10,
		marginBottom: 10
	},
	iconStyles: {
		width: 20,
		textAlign: 'center'
	},
	textValuePerHour: {
		fontSize: 15
	},
	textSeparator: {
		marginHorizontal: 10,
		fontSize: 15
	},
	textPrimary: {
		fontWeight: '500',
		marginLeft: 10,
		fontSize: 15
	},
	containerValues: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: 10,
		marginVertical: 10
	},
	textHoursTitle: {
		fontSize: 12.5,
		color: '#333',
		fontWeight: '400'
	},
	textHours: {
		fontSize: 22.5,
		color: '#ff014c',
		fontWeight: '500'
	},
	containerLeft: {
		backgroundColor: '#fff',
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 0.5,
		width: 80,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10
	},
	containerStyle: {
		flex: 1,
		height: 80,
		width: width - 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
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
