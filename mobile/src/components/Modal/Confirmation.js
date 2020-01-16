import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import SmallButton from '../../components/Button/AbsoluteSmall';

class ConfirmationModal extends Component {
	state = {
        idToExclude: null,
		isModalVisible: false,
		message: ''
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

	handleMessage = message => {
		this.setState({
			message
		});
	};

	handleIdItem = id => {
        this.setState({
            idToExclude: id
        })
    };
    
    teste(param){
        console.log(param)
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
			>
				<View style={styles.container}>
					<View style={styles.containerModal}>
						<View style={styles.containerTitle}>
							<Text style={styles.textTitle}>Confirmação</Text>
						</View>

						<View style={styles.containerMessage}>
							<Text style={styles.textMessage}>
								{state.message}
							</Text>
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
								<TouchableOpacity
									onPress={()=>this.teste(this.state.idToExclude)}
								>
									<Text style={styles.textConfirm}>
										Confirmar
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

export default ConfirmationModal;

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
		justifyContent: 'flex-start'
	},
	textTitle: {
		fontSize: 20,
		color: '#777'
	},
	containerMessage: {},
	textMessage: {
		marginVertical: 50,
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
		padding: 10,
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
