import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CarSelectedHeader from '../components/Header/CarSelected';
import ParkedItemCarHistoric from '../components/ParkedItemCarHistoric';
import EditCar from '../components/Modal/EditCar';
import ConfirmationModal from '../components/Modal/Confirmation';
import Api from "../services/Api";
import Loader from "../components/Modal/Loader";
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

class CarInformation extends Component {
    state={
        modalLoaderVisible: false,
        vehicleHistoric: []
    }

	static navigationOptions = {
		header: null
    };
    
    async componentDidMount(){
        const userToken = await AsyncStorage.getItem('userId');

        const carInformation = this.props.navigation.getParam('carInformation');

        const userInformations=JSON.parse(userToken)

        const reservations=await Api.get(`/select-client-vehicle-reservations-by-plate-list/?client_id=${userInformations._id}&vehicle_id=${carInformation.id}`)

        this.setState({
            vehicleHistoric: reservations.data.result
        });

        this.setState({
            modalLoaderVisible: false
        });
    }

    componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	openDetailsCarModal = carInformation => {
		const name = carInformation.name;

		this.refs.modalCarEdit.toggleModal();
		this.refs.modalCarEdit.handleName(name);
	};

	openConfirmationExcludeCarModal = carInformation => {
		const message = `Deseja realmente remover o veículo: ${
			carInformation.name
		}?`;

		this.refs.modalCarConfirmExclude.toggleModal();
		this.refs.modalCarConfirmExclude.handleMessage(message);
	};

	render() {
		const { props, state } = this;

		const carInformation = props.navigation.getParam('carInformation');

		return (
			<View style={styles.container}>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<ScrollView showsVerticalScrollIndicator={false}>
					<CarSelectedHeader
						title={`${carInformation.plate.slice(0, 3).toUpperCase()}-${carInformation.plate.slice(3)}`}
						subTitle={carInformation.name}
						onBackPress={() => props.navigation.navigate('Car')}
						onEditPress={() =>
							this.openDetailsCarModal(carInformation)
						}
						onExcludePress={() =>
							this.openConfirmationExcludeCarModal(carInformation)
						}
					/>
					<View style={{ marginTop: 20 }}>
						<View>
                            <View style={[styles.containerStyle, {flex: 1, backgroundColor: '#fff', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 15, width: width - 40, marginBottom: 20}]}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Icon
                                        name='md-bookmark'
                                        size={24}
                                        color='#ff014c'
                                        style={{marginRight: 10}}
                                    />
                                    <Text style={{fontSize: 17.5, color: '#333', fontWeight: '700', marginBottom: 10}}>
                                        Atenção!
                                    </Text>
                                </View>
                                <Text style={{fontSize: 15}}>O histórico de reservas já disponível, aproveite!</Text>
                            </View>
						</View>

                        {
                            this.state.vehicleHistoric.filter(item=>!item.finished).map(item=>{
                                return (
                                    <ParkedItemCarHistoric 
                                        key={item._id}
                                        reservation={item}
                                    />
                                )
                            })
                        }

                        {
                            this.state.vehicleHistoric.filter(item=>item.finished).map(item=>{
                                return (
                                    <ParkedItemCarHistoric 
                                        key={item._id}
                                        reservation={item}
                                    />
                                )}
                            )
                        }

					</View>
				</ScrollView>

				<EditCar ref={'modalCarEdit'} carPlate={carInformation.plate} />

				<ConfirmationModal ref={'modalCarConfirmExclude'} />
			</View>
		);
	}
}

export default CarInformation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5'
    },
	containerStyle: {
		width: width - 30,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#1113',
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		marginHorizontal: 20
	}
});
