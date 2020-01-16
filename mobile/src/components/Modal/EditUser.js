import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import SmallButton from '../../components/Button/AbsoluteSmall';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from "../../services/Api";
import Loader from "../../components/Modal/Loader";

const { width, height } = Dimensions.get('screen');

class EditUser extends Component {
	state = {
        userInformations: {
            name: '',
            email: '',
            cpf: '',
            telephone: {
                ddd: '',
                number: ''
            }
        },
		isModalVisible: false,
		plate: '',
		confirmPlate: '',
		name: ''
    };

    async isModalShow(){
        this.setState({
            modalLoaderVisible: true
        });

        const userToken = await AsyncStorage.getItem('userId');

        const userInformations=JSON.parse(userToken)

        const clientInformations=await Api.get(`/select-client-informations/?client_id=${userInformations._id}`)

        console.log('editar cliente: ', clientInformations.data[0]);

        this.setState({
            userInformations: clientInformations.data[0]
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

	handlePlate = plate => {
		this.setState({
			plate
		});
	};

	handleConfirmPlate = confirmPlate => {
		this.setState({
			confirmPlate
		});
	};

	handleName = name => {
		this.setState({
			name
		});
    };
    
    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');

        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }

        return splitStr.join(' '); 
    }

	render() {
		const { state, props } = this;

		return (
			<Modal
				isVisible={state.isModalVisible}
				onSwipeComplete={this.onSwipeComplete}
				backdropOpacity={0.75}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}
				animationInTiming={500}
				animationOutTiming={500}
				backdropTransitionInTiming={500}
				backdropTransitionOutTiming={500}
                swipeDirection={['down', 'up']}
                onModalShow={()=>this.isModalShow(props.userId)}
			>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<View style={styles.container}>
					<View style={styles.containerModal}>
						<View style={styles.containerTitle}>
							<Text style={styles.textTitle}>Editação de usuário</Text>
						</View>

						<View style={styles.containerMessage}>
                            <Text>Nome</Text>
							<TextInput
								placeholder='Civic Cinza'
								style={styles.TextInput}
								value={this.titleCase(state.userInformations.name)}
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={name=>console.log(name)}
							/>

							<View style={{ flexDirection: 'row', marginTop: 20 }}>
								<View style={styles.containerConfirmCarPlate}>
									<Text>DDD</Text>
									<TextInput
										placeholder='00'
										style={[
											styles.TextInput,
											styles.TextInputPlateAndConfirm
										]}
										value={state.userInformations.telephone.ddd.toString()}
										onSubmitEditing={() => {
											this.TextInputName.focus();
                                        }}
								        onChangeText={ddd=>console.log(ddd)}
									/>
								</View>

                                <View style={styles.containerCarPlate}>
									<Text>Telefone</Text>
									<TextInput
										placeholder='000000000'
										style={[
											styles.TextInput,
											styles.TextInputPlateAndConfirm
										]}
										value={state.userInformations.telephone.number}
										autoCorrect={false}
										returnKeyType='next'
										blurOnSubmit={false}
										onChangeText={number =>console.log(number)}
										onSubmitEditing={() => {
											this.TextInputConfirmPlate.focus();
										}}
									/>
								</View>
							</View>
						</View>

						<View style={styles.containerOptions}>
							<View style={styles.containerButtonCancel}>
								<TouchableOpacity onPress={this.toggleModal}>
									<Text style={styles.textCancel}>
										Cancelar
									</Text>
								</TouchableOpacity>
							</View>

							<View>
								<TouchableOpacity onPress={props.addCar}>
									<Text style={styles.textConfirm}>
										Cadastrar
									</Text>
								</TouchableOpacity>
							</View>
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

export default EditUser;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
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
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	textTitle: {
		fontSize: 20,
		color: '#777'
	},
	containerMessage: {
		marginVertical: 50
	},
	textMessage: {
		fontSize: 15,
		color: '#333'
	},
	containerOptions: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	TextInput: {
		height: 45,
		backgroundColor: '#eaeaea',
		width: '100%',
		borderRadius: 7,
		padding: 10
	},
	TextInputPlateAndConfirm: {
		marginBottom: 20
	},
	textConfirm: {
		color: '#3769cc'
	},
	textCancel: {
		color: '#333'
	},
	containerButtonCancel: {
		marginRight: 15
	},
	containerCarPlate: {
		flex: 2
	},
	containerConfirmCarPlate: {
        flex: 1,
        marginRight: 10
	}
});
