import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import ImageCarFree from '../../img/car-icon/car-free/car-free.png';
import ImageCarParked from '../../img/car-icon/car-free/car-parked.png';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('screen');

class MostUsedCar extends Component {
	render() {
		const { props } = this;

		return (
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={['#ae841a', '#daa520']}
				style={styles.container}
			>
				<View style={styles.containerImage}>
					<Image
						style={styles.image}
						source={props.carStatus ? ImageCarFree : ImageCarParked}
					/>
				</View>
				<View style={styles.containerCarDetails}>
					<Text numberOfLines={1} style={styles.textCarPlate}>
						{props.carPlate}
					</Text>

					<Text numberOfLines={1} style={styles.textCarName}>
						{props.carName}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

export default MostUsedCar;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 1,
		marginHorizontal: 20,
		marginBottom: 15,
		borderColor: '#111',
		borderRadius: 10,
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		backgroundColor: '#ccc',
		width: width - 40,
		height: 80
	},
	containerImage: {
		width: 80
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'center',
		margin: 15,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	containerCarDetails: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		paddingLeft: 15,
		paddingRight: 50,
		paddingVertical: 10
	},
	textCarPlate: {
		fontWeight: '500',
		fontSize: 20
	},
	textCarName: {
		fontWeight: '300',
		fontSize: 15
	}
});
