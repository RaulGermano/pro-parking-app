import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableHighlight,
	Image
} from 'react-native';
import ImageCarParked from '../../img/car-icon/car-free/car-parked.png';
import ParkingTime from '../components/ParkingTime';
import ParkingNamePendingParking from '../components/ParkingNamePendingParking';

const { width } = Dimensions.get('screen');

class CarItemList extends Component {
	render() {
		const { props } = this;

		return (
			<View style={styles.container}>
				<View style={styles.containerImage}>
					<Image style={styles.image} source={ImageCarParked} />
				</View>
				<View style={styles.containerCarDetails}>
					<Text numberOfLines={1} style={styles.textCarPlate}>
						{props.carPlate}
					</Text>

					<Text numberOfLines={1} style={styles.textCarName}>
						{props.carName}
					</Text>
				</View>
				<View>
					<ParkingTime time={props.time} />
					<ParkingNamePendingParking
						parkingName={props.parkingName}
					/>
				</View>
			</View>
		);
	}
}

export default CarItemList;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 1,
		marginHorizontal: 20,
		marginBottom: 10,
		borderColor: '#1113',
		borderRadius: 10,
		elevation: 3,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		backgroundColor: '#ffffff',
		width: width - 40,
		height: 60
	},
	containerImage: {
		width: 60
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		margin: 10
	},
	containerCarDetails: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#eaeaea',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		paddingLeft: 15,
		paddingRight: 50,
		paddingVertical: 10
	},
	textCarPlate: {
		fontWeight: '500',
		fontSize: 17
	},
	textCarName: {
		fontWeight: '300',
		fontSize: 11
	}
});
