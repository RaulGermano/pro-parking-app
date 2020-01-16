import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	TouchableHighlight
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ParkedItem from '../components/ParkedItem';
import PendingParkerItem from '../components/PendingParkerItem';
import NonePendingParker from '../components/NonePendingParker';
import Loader from "../components/Modal/Loader";
import Api from "../services/Api";
class Search extends Component {
    state={
        modalLoaderVisible: false,
        finishedReservations: [],
        notFinishedReservations: []
    }

	componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	async componentDidMount() {
        this.verifyLog();

        const userToken = await AsyncStorage.getItem('userId');

        const userInformations=JSON.parse(userToken)

        const finishedReservations=await Api.get(`select-reservations-by-finished/?client_id=${userInformations._id}&finished=${true}`)

        const notFinishedReservations=await Api.get(`select-reservations-by-finished/?client_id=${userInformations._id}&finished=${false}`)

        console.log({
            finishedReservations,
            notFinishedReservations
        })

        this.setState({
            finishedReservations: finishedReservations.data.result
        })
    
        this.setState({
            notFinishedReservations: notFinishedReservations.data.result
        })

        this.setState({
            modalLoaderVisible: false
        });
	}

	verifyLog = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userId');

			this.props.navigation.navigate(userToken ? '' : 'Welcome');
		} catch (error) {
			console.log('erro: ', error);
		}
	};

	goingToNewCar = () => {
		this.props.navigation.navigate('NewCar');
	};

	goingToCarInformation = () => {
		this.props.navigation.navigate('CarInformation');
	};

	render() {
        const { state }=this
        
		return (
			<SafeAreaView>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.containerTitle}>
						<Text style={styles.textTitle}>Paradas pendentes</Text>
					</View>
					<View style={styles.containerCars}>
                        {
                            this.state.notFinishedReservations.map(item=>{
                                return (
                                    <PendingParkerItem
                                        key={item._id}
                                        valuePerHour={item.parking.space.value}
                                        parkingSpaceName={item.parking.space.name.toUpperCase()}
                                        vehicleName={item.client.name.toUpperCase()}
                                        parkerName={item.parking.name.toUpperCase()}
                                    />
                                )
                            })
                        }
					</View>

					<View style={[styles.containerTitle, { marginTop: 45 }]}>
						<Text style={styles.textTitle}>
							Histórico de paradas
						</Text>
					</View>

					<View style={styles.containerCars}>
						<ScrollView showsVerticalScrollIndicator={false}>
                            {
                                this.state.finishedReservations.map(item=>{
                                    return (
                                        <TouchableHighlight
                                            key={item._id}
                                            underlayColor='transparent'
                                            onPress={()=>console.log('123')}
                                        >
                                            <ParkedItem
                                                totalHours={item.hours}
                                                totalPay={item.value}
                                                valuePerHour={item.parking.space.value}
                                                parkingSpaceName={item.parking.space.name.toUpperCase()}
                                                parkerName={item.parking.name.toUpperCase()}
                                            />
                                        </TouchableHighlight>
                                    )
                                })
                            }
						</ScrollView>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	containerElement: {
		marginTop: 20
	},
	containerTitle: {
		marginTop: 30,
		marginBottom: 15,
		marginLeft: 15
	},
	containerCars: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
	}
});
