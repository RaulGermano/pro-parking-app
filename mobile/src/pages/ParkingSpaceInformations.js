import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from "../services/Api";
import Loader from "../components/Modal/Loader";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Option from '../components/apagar'
import TitlePage from '../components/TitlePage';
import AsyncStorage from "@react-native-community/async-storage";

const {width}=Dimensions.get('screen')

class ParkingSpaceInformation extends Component {
	static navigationOptions = {
		header: null
    };

    state={
        selectedVehicle:{},
        vehicleNameToVehicleDescription:'',
        clientInformations: {},
        isModalVisible: false,
        buttonReserveDisabled:true,
        vehicleList: [
            {
                _id: 0,
                available: false,
                plate: 'AAA-0000'
            }
        ],
        parkingInformations:{
            name:'- -'
        },
        parkingSpaceInformation: {
            parkingSpace:{
                name: '- -',
                value: 0,
                description:{
                    accessibility: true,
                    covered: false,
                    services: false
                }
            }
        },
    }
    
    async componentDidMount(){
        this.setState({
            modalLoaderVisible: true
        });

        const informations=this.props.navigation.state.params.parkingSpace;

        const {id, parkingId} = informations;

        const parkingSpacesInformations=await Api.get(`select-specific-parking-space/?parking_id=${parkingId}&parkingSpace_id=${id}`)

        const parkingInformations=await Api.get(`select-specific-parkings/?parking_id=${parkingId}`)

        const userToken = await AsyncStorage.getItem('userId');

        const userInformations=JSON.parse(userToken)

        const clientVehicles=await Api.get(`select-client-vehicles/?client_id=${userInformations._id}`)

        const clientVehiclesList = clientVehicles.data.result.vehicle.map(
            item => {
                return {
                    id: item._id,
                    plate: `${item.plate.slice(0, 3).toUpperCase()}-${item.plate.slice(3)}`,
                    available: item.available
                };
            }
        );

        this.setState({
            clientInformations: userInformations
        })

        this.setState({
            vehicleList: clientVehiclesList
        })
 
        this.setState({
            parkingSpaceInformation: parkingSpacesInformations.data.result[0]
        })

        this.setState({
            parkingInformations: parkingInformations.data.result
        })

        this.setState({
            modalLoaderVisible: false
        });
    }

    vehicleSelected = async (vehicle) => {
        this.setState({
            modalLoaderVisible: true
        });

        const vehiclePlate=`${vehicle.replace('-', '').toLowerCase()}`

        const clientInformationsObject = await Api.get(`select-client-vehicles/?client_id=${this.state.clientInformations._id}`)

        const vehicleInformations=clientInformationsObject.data.result.vehicle.find(item=>{
            return item.plate==vehiclePlate
        })

        this.setState({
            selectedVehicle: vehicleInformations
        })

        this.setState({
            vehicleNameToVehicleDescription: vehicleInformations.name
        })

        this.setState({
            modalLoaderVisible: false
        });
    }

    tryMakeAReserve = async () => {
        const client=this.state.clientInformations;
        const clientVehicle=this.state.selectedVehicle;
        const parking=this.state.parkingInformations
        const parkingSpace=this.state.parkingSpaceInformation

        const teste=await Api.post(`create-reservation`, {
            client: {
                _id: client._id,
                name: client.name,
                email: client.email,
                telephone: {
                    ddd: client.telephone.ddd,
                    number: client.telephone.number
                },
                vehicle:{
                    _id: clientVehicle._id,
                    name: clientVehicle.name,
                    plate: clientVehicle.plate
                }
            },
            parking: {
                _id: parking._id,
                name: parking.name,
                telephone: {
                    ddd: parking.telephone.ddd,
                    number: parking.telephone.number
                },
                space: {
                    _id: parkingSpace.parkingSpace._id,
                    name: parkingSpace.parkingSpace.name,
                    value: parkingSpace.parkingSpace.value
                }
            }
        })

        this.props.navigation.navigate('Home');

        console.log( teste)
    }

    descriptionFilter=(value)=>{
        return !value?(
            <Icon
                style={styles.notHasDescription}
                size={30}
                name={'md-close'}
            />
        ):(
            <Icon
                style={styles.hasDescription}
                size={30}
                name={'md-checkmark'}
            />
        )
    }

	render() {
		const { state, props } = this;

		return (
            <>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />
			    
                <View style={styles.container}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 10 }}>
                        <View style={styles.containerTitle}>
                            <TouchableOpacity onPress={()=>props.navigation.navigate('Search')}>
                                <Icon
                                    style={styles.iconBack}
                                    size={30}
                                    name={'ios-arrow-back'}
                                />
                            </TouchableOpacity>

                            <View>
                                <Text numberOfLines={1} style={styles.textTitle}>
                                    {state.parkingInformations.name}
                                </Text>
                                <Text numberOfLines={1} style={styles.textSubTitle}>
                                    {state.parkingSpaceInformation.parkingSpace.name}
                                </Text>
                            </View>
                        </View>

                        <AirbnbRating
                            count={5}
                            defaultRating={4.5}
                            size={20}
                            isDisabled={true}
                            showRating={false}
                            selectedColor='#3769cc'
                            reviewColor	='#777'
                            starContainerStyle={{marginHorizontal: 20}}
                        />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{}}>
                            <View style={styles.containerDescription}>
                                <TitlePage titleText='Descrição da vaga' />

                                <View style={styles.descriptionListItem}>
                                    <Text>Cobertura</Text>
                                    {this.descriptionFilter(state.parkingSpaceInformation.parkingSpace.description.accessibility)}
                                </View>

                                <View style={styles.descriptionListItem}>
                                    <Text>Acessibilidade para cadeirantes</Text>
                                    {this.descriptionFilter(state.parkingSpaceInformation.parkingSpace.description.covered)}
                                </View>

                                <View style={[styles.descriptionListItem, {marginBottom: 20}]}>
                                    <Text>Serviços adicionais</Text>
                                    {this.descriptionFilter(state.parkingSpaceInformation.parkingSpace.description.services)}
                                </View>
                            </View>
                        </View>

                        <View style={styles.containerSelectVehicle}>
                            <TitlePage titleText='Selecione um veículo' />

                            <Option
                                options={this.state.vehicleList}
                                onChange={(option) => this.vehicleSelected(option)}
                            />

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                                <Text style={{ fontSize: 17.5 }}>{state.vehicleNameToVehicleDescription.length>0?state.vehicleNameToVehicleDescription:'Nenhum veículo foi selecionado'}</Text>
                            </View>
                        </View>

                        <Text></Text>
                    </ScrollView>

                    <View style={styles.buttonConfig}>
                        <TouchableOpacity
                            style={[styles.containerButton, state.vehicleNameToVehicleDescription.length>0?styles.buttonConfirmColorNotDesabled:styles.buttonConfirmColorDesabled]}
                            onPress={this.tryMakeAReserve}
                            disabled={state.vehicleNameToVehicleDescription.length>0?false:true}
                        >
                            <Text style={styles.textButton}>Reservar por R${state.parkingSpaceInformation.parkingSpace.value}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
		);
	}
}

export default ParkingSpaceInformation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5'
    },
    containerTitle: {
		flexDirection: 'row',
		alignItems: 'center'
	},
    containerBackWithTitle: {
		flexDirection: 'row',
		alignItems: 'center'
    },
    buttonConfig: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5
	},
    textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
    },
    textSubTitle: {
		fontSize: 15,
		color: '#777',
		fontWeight: '700'
    },
    iconBack: {
		color: '#000',
		marginHorizontal: 20
    },
    notHasDescription:{
        color: '#ff014c'
    },
    hasDescription:{
        color: '#3769cc'
    },
    descriptionListItem: {
        flex: 1, 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginHorizontal: 20,
        marginVertical: 10
    },
    containerButton: {
		flex: 1,
		height: 45,
		borderRadius: 10,
		alignItems: 'center',
		padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20
    },
    buttonConfirmColorNotDesabled:{
        backgroundColor: '#3769cc',
    },
    buttonConfirmColorDesabled:{
        backgroundColor: '#585858',
        color: '#c7c7c7'
    },
	textButton: {
		fontSize: 18,
		fontWeight: '600',
		color: '#fff'
    },
    containerDescription:{
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#1113',
		borderRadius: 10,
		elevation: 3,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
        shadowRadius: 5
    },
    containerSelectVehicle:{
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#1113',
		borderRadius: 10,
		elevation: 3,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
        shadowRadius: 5
    }
});
