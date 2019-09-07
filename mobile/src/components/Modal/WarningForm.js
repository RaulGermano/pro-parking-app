import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('screen');

class WarningForm extends Component {
	state = {
		isModalVisible: false
	};

	toggleModal = () => {
		this.setState({
			isModalVisible: !this.state.isModalVisible
		});
	};

	render() {
		const { state } = this;

		return (
			<Modal
				isVisible={state.isModalVisible}
				backdropOpacity={0.75}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}
				animationInTiming={500}
				animationOutTiming={500}
				backdropTransitionInTiming={500}
				backdropTransitionOutTiming={500}
			>
				<View style={styles.container}>
					<View style={styles.containerModal}>
						<View style={styles.containerTitle}>
							<Text style={styles.textTitle}>Aviso</Text>
						</View>

						<View style={styles.containerMessage}>
							<Text style={styles.textMessage}>
								Certifique-se que todos os campos foram
								devidamente preenchidos.
							</Text>
						</View>

						<View style={styles.containerOptions}>
							<TouchableOpacity onPress={this.toggleModal}>
								<Text style={styles.textButtonOk}>OK</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

export default WarningForm;

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
		marginVertical: 50,
		flexDirection: 'row',
		alignItems: 'center'
	},
	textMessage: {
		fontSize: 15,
		color: '#333'
	},
	containerOptions: {
		alignItems: 'flex-end'
	},
	textButtonOk: {
		color: '#333'
	}
});
