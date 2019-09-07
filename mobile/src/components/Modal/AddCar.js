import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import SmallButton from '../../components/Button/AbsoluteSmall';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

class AddCar extends Component {
	state = {
		isModalVisible: false,
		plate: '',
		confirmPlate: '',
		name: ''
	};

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
			>
				<View style={styles.container}>
					<View style={styles.containerModal}>
						<View style={styles.containerTitle}>
							<Text style={styles.textTitle}>Novo carro</Text>
						</View>

						<View style={styles.containerMessage}>
							<View style={{ flexDirection: 'row' }}>
								<View style={styles.containerCarPlate}>
									<Text>Placa</Text>
									<TextInput
										placeholder='AAA - 0000'
										style={[
											styles.TextInput,
											styles.TextInputPlateAndConfirm
										]}
										value={state.plate}
										autoCorrect={false}
										returnKeyType='next'
										blurOnSubmit={false}
										onChangeText={plate =>
											this.handlePlate(plate)
										}
										onSubmitEditing={() => {
											this.TextInputConfirmPlate.focus();
										}}
									/>
								</View>
								<View style={styles.containerConfirmCarPlate}>
									<Text>Confirme a placa</Text>
									<TextInput
										placeholder='AAA - 0000'
										style={[
											styles.TextInput,
											styles.TextInputPlateAndConfirm
										]}
										value={state.confirmPlate}
										autoCorrect={false}
										returnKeyType='next'
										blurOnSubmit={false}
										onChangeText={confirmPlate =>
											this.handleConfirmPlate(
												confirmPlate
											)
										}
										ref={input => {
											this.TextInputConfirmPlate = input;
										}}
										onSubmitEditing={() => {
											this.TextInputName.focus();
										}}
									/>
								</View>
							</View>

							<Text>Apelido/Modelo</Text>
							<TextInput
								placeholder='Civic Cinza'
								style={styles.TextInput}
								value={state.name}
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={name => this.handleName(name)}
								ref={input => {
									this.TextInputName = input;
								}}
							/>
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

export default AddCar;

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
		flex: 1,
		marginRight: 10
	},
	containerConfirmCarPlate: {
		flex: 1
	}
});
