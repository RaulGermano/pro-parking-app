import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import SmallButton from '../../components/Button/AbsoluteSmall';
import Api from "../../services/Api";
import Loader from "../../components/Modal/Loader";
import Icon from 'react-native-vector-icons/Ionicons';

class DetailsParkingSpace extends Component {
    static defaultProps = {
        cover: false
    }

    state = {
        isModalVisible: false,
        modalLoaderVisible: false,
        title: '',
        parkingInformations: {
            parkingSpace:{}
        },
    };

   teste = async (id) => {
        this.setState({
            modalLoaderVisible: true
        });

        const parking=await Api.get(`select-specific-parkings/?parking_id=${id}`)

        console.log(parking)

        this.setState({
            parkingInformations: parking.data.result,
            title: parking.data.result.name
        })

        this.setState({
            modalLoaderVisible: false
        });
    }

	onSwipeComplete = () => {
		this.setState({
			isModalVisible: false
		});
	};

	toggleModal = () => {
		this.setState({
			isModalVisible: !this.state.isModalVisible
		});
    };

    goingParkingSpaceInformation = item => {
        const { _id } = item;

		this.props.navigation.navigate('ParkingSpaceInformations', {
			parkingSpace: {
                id: _id,
                parkingId: this.state.parkingInformations._id
			}
		});
	};

	render() {
        const { state, props } = this;

		return (
			<Modal
                isVisible={state.isModalVisible}
                onSwipeComplete={this.onSwipeComplete} 
                backdropOpacity={0.75}
				animationIn={'fadeIn'}
				animationOut={'fadeOut'}
				animationInTiming={500}
				animationOutTiming={500}
				backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                coverScreen={props.cover}
                onModalShow={()=>this.teste(props.parkingId)}
			>

                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<View style={styles.container}>
					<View style={styles.containerModal}>
						<View style={styles.containerTitle}>
							<Text style={styles.textTitle}>
								{state.title}
							</Text>
						</View>

						<View style={{ marginTop: 50 }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    state.parkingInformations.parkingSpace.length>0?(
                                        state.parkingInformations.parkingSpace.map(item=>{
                                            return(
                                                <TouchableOpacity
                                                    key={item._id}
                                                    disabled={item.available?false:true}
                                                    style={[styles.parkingSpaceItem, item.available?{opacity: 1}:{opacity: .2, color: '#000'}]}
                                                    onPress={() =>
                                                        this.goingParkingSpaceInformation(item)
                                                    }
                                                >
                                                    <View style={{flex: 1, flexDirection: 'row'}} >
                                                        <Text style={{fontWeight: '600', textTransform: 'uppercase'}}>{item.name}</Text>
                                                        <Text style={{marginLeft: 10}}>R${item.value.toFixed(2).replace('.', ',')}</Text>
                                                    </View>

                                                    <Icon
                                                        name='ios-arrow-forward'
                                                        size={24}
                                                        color='#777'
                                                        style={styles.icon}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })
                                    ):(
                                        <Text>Esse estacionamento não possui vagas cadastradas</Text>
                                    )
                                }
                            </ScrollView>
						</View>

						<SmallButton
							onPress={this.toggleModal}
							icon='ios-close-circle'
							iconSize={27.5}
							position={{ top: 20, right: 20 }}
						/>
					</View>
				</View>
			</Modal>
		);
	}
}

export default DetailsParkingSpace;

const styles = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	containerModal: {
		backgroundColor: '#fff',
		borderRadius: 10,
		height: null,
		padding: 20,
		justifyContent: 'space-between'
	},
	containerTitle: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	textTitle: {
		fontSize: 20,
		color: '#777',
        textTransform: 'uppercase'
	},
    containerParkingSpace: {
        backgroundColor:'#000',
		flex: 1
    },
    icon: {
		marginRight: 15
    },
    parkingSpaceItem:{
        flex: 1,
        backgroundColor: '#eaeaea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingLeft: 10,
        marginBottom: 10,
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
