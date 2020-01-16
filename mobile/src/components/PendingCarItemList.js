import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableHighlight,
	Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImageCarParked from '../../img/car-icon/car-free/car-parked.png';
import ParkingTime from '../components/ParkingTime';
import ParkingNamePendingParking from '../components/ParkingNamePendingParking';
import Api from "../services/Api";
import moment from 'moment-timezone';

const { width } = Dimensions.get('screen');

class CarItemList extends Component {
    state={
        time: '',
        parkingName: ''
    }

    async componentDidMount (){
        const userToken = await AsyncStorage.getItem('userId');

        const userInformations=JSON.parse(userToken)

        const clientVehiclesAvailable = await Api.get(`/select-specific-reservation-by-vehicle-not-available/?client_id=${userInformations._id}&vehicle_id=${this.props.reserve.vehicle._id}`)

        const reserveInformations = clientVehiclesAvailable.data.result[0];
        
        const time = `${moment(reserveInformations.createdAt).format('DD/MM/YYYY')} às ${moment(reserveInformations.createdAt).format('HH:mm')}h`

        const parkingName = reserveInformations.parking.name.toUpperCase()

        this.setState({
            time, 
            parkingName
        })
    }

	render() {
        const { props, state } = this;

		return (
            <TouchableHighlight underlayColor='#fff' onPress={props.onPress}>
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
                        <ParkingTime time={state.time} />
                        <ParkingNamePendingParking
                            parkingName={state.parkingName}
                        />
                    </View>
                </View>
            </TouchableHighlight>
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
