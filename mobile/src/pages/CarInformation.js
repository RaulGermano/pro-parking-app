import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CarSelectedHeader from '../components/Header/CarSelected';
import ParkedItemCarHistoric from '../components/ParkedItemCarHistoric';
import EditCar from '../components/Modal/EditCar';
import ConfirmationModal from '../components/Modal/Confirmation';

class CarInformation extends Component {
	static navigationOptions = {
		header: null
	};

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
		const { props } = this;

		const carInformation = props.navigation.getParam('carInformation');

		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<CarSelectedHeader
						title={carInformation.name}
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
							<ParkedItemCarHistoric />
						</View>
						<View>
							<ParkedItemCarHistoric />
						</View>
						<View>
							<ParkedItemCarHistoric />
						</View>
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
	}
});
