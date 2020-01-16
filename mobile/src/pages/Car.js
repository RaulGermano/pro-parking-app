import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CarItemList from '../components/CarItemList';
import PendingCarItemList from '../components/PendingCarItemList';
import ButtonAbsoluteRadio from '../components/Button/AbsoluteRadio';
import TitlePage from '../components/TitlePage';
import AddCar from '../components/Modal/AddCar';
import ConfirmationModal from '../components/Modal/Confirmation';
import Loader from "../components/Modal/Loader";
import Api from "../services/Api";

class Search extends Component {
	state = {
        vehicle: [],
        availableClientVehicles: [],
        notAvailableClientVehicles: [],
        userInformationsObject: {}
    };
    
    componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	async componentDidMount() {
        this.verifyLog();

        const userToken = await AsyncStorage.getItem('userId');

        const userInformations=JSON.parse(userToken)

        const clientVehiclesAvailable=await Api.get(`select-available-client-vehicles-list/?client_id=${userInformations._id}&available=${true}`)
        
        const clientVehiclesNotAvailable=await Api.get(`select-available-client-vehicles-list/?client_id=${userInformations._id}&available=${false}`)

        this.setState({
            userInformationsObject: userInformations
        })

        this.setState({
            availableClientVehicles: clientVehiclesAvailable.data.result
        })
    
        this.setState({
            notAvailableClientVehicles: clientVehiclesNotAvailable.data.result
        })

        this.setState({
            modalLoaderVisible: false
        });
	}

	openAddCarModal = () => {
		this.refs.addCar.toggleModal();
	};

	verifyLog = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userId');

			this.props.navigation.navigate(userToken ? '' : 'Welcome');
		} catch (error) {
			console.log('erro: ', error);
		}
	};

	goingToCarInformation = item => {
		const { _id, plate, name } = item;

		this.props.navigation.navigate('CarInformation', {
			carInformation: {
				id: _id,
				plate: plate,
				name: name
			}
		});
    };

	openConfirmationExcludeCarModal = carInformation => {
		const message = `Deseja realmente remover o veículo: "${carInformation.name}"?`,
			id = carInformation._id;

		this.refs.modalCarConfirmExclude.handleIdItem(id);
		this.refs.modalCarConfirmExclude.toggleModal();
		this.refs.modalCarConfirmExclude.handleMessage(message);
	};

	render() {
		const { state, props } = this;

		return (
			<View style={styles.container}>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<ScrollView showsVerticalScrollIndicator={false}>
					<SafeAreaView>
						<View style={styles.containerElement}>
							<TitlePage titleText='Carros cadastrados' />
                            {state.notAvailableClientVehicles.map(item => {
                                return (
                                    <PendingCarItemList
                                        key={item.vehicle._id}
                                        carPlate={`${item.vehicle.plate.slice(0, 3).toUpperCase()}-${item.vehicle.plate.slice(3)}`}
                                        carName={item.vehicle.name.toUpperCase()}
                                        reserve={item}
                                        onPress={() =>
											this.goingToCarInformation(item.vehicle)
										}
                                        onPressSmallClose={() =>
											this.openConfirmationExcludeCarModal(
												item.vehicle
											)
										}
                                    />
                                )
                            })}

                            {state.availableClientVehicles.map(item => {
								return (
									<CarItemList
										key={item.vehicle._id}
										carPlate={`${item.vehicle.plate.slice(0, 3).toUpperCase()}-${item.vehicle.plate.slice(3)}`}
										carName={item.vehicle.name.toUpperCase()}
										onPress={() =>
											this.goingToCarInformation(item.vehicle)
										}
										onPressSmallClose={() =>
											this.openConfirmationExcludeCarModal(
												item.vehicle
											)
										}
									/>
								);
							})}
						</View>
					</SafeAreaView>
				</ScrollView>

				<AddCar ref={'addCar'} />

				<ConfirmationModal ref={'modalCarConfirmExclude'} />

				<ButtonAbsoluteRadio
					backdropOpacity={0.5}
					onPress={this.openAddCarModal}
					position={{ bottom: 15, right: 20 }}
					iconSize={27.5}
					bgColor='#3769cc'
					textColor='#fff'
					icon='ios-add'
				/>
			</View>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	containerElement: {
		flex: 1,
		marginBottom: 30
	}
});
