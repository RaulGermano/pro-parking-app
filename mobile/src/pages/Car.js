import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CarItemList from '../components/CarItemList';
import PendingCarItemList from '../components/PendingCarItemList';
import ButtonAbsoluteRadio from '../components/Button/AbsoluteRadio';
import TitlePage from '../components/TitlePage';
import AddCar from '../components/Modal/AddCar';
import ConfirmationModal from '../components/Modal/Confirmation';

class Search extends Component {
	state = {
		car: [
			{ id: 0, plate: 'CDR-5685', name: 'DEL REY', status: true },
			{ id: 1, plate: 'ASD-4567', name: 'FOX', status: true },
			{
				id: 2,
				plate: 'VRF-6847',
				name: 'CARRO DO RAUL',
				status: false,
				moment: '12:45'
			},
			{ id: 3, plate: 'RED-8946', name: 'SAVEIRO', status: true },
			{ id: 4, plate: 'KOL-9843', name: 'UNO MILE', status: true },
			{
				id: 5,
				plate: 'VYT-9684',
				name: 'CROSS FOX',
				status: false,
				moment: '02:45'
			},
			{ id: 6, plate: 'OIF-2956', name: 'FOX', status: true },
			{ id: 7, plate: 'GVY-9485', name: 'GOL 2005', status: true },
			{ id: 8, plate: 'OPB-6518', name: 'CIVIC CINZA', status: true }
		]
	};

	componentDidMount() {
		this.verifyLog();
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
		const { id, plate, name } = item;

		this.props.navigation.navigate('CarInformation', {
			carInformation: {
				id: id,
				plate: plate,
				name: name
			}
		});
	};

	openConfirmationExcludeCarModal = carInformation => {
		const message = `Deseja realmente remover o veículo: ${carInformation.name}?`,
			id = carInformation.id;

		this.refs.modalCarConfirmExclude.handleIdItem(id);
		this.refs.modalCarConfirmExclude.toggleModal();
		this.refs.modalCarConfirmExclude.handleMessage(message);
	};

	render() {
		const { state, props } = this;

		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<SafeAreaView>
						<View style={styles.containerElement}>
							<TitlePage titleText='Carros cadastrados' />
							<PendingCarItemList
								carPlate='SDA-9102'
								carName='FOX'
								time='05:56'
								parkingName='Raul Estacionamentos'
							/>

							{state.car.map(item => {
								return (
									<CarItemList
										key={item.id}
										onPress={() =>
											this.goingToCarInformation(item)
										}
										carPlate={item.plate}
										carName={item.name}
										onPressSmallClose={() =>
											this.openConfirmationExcludeCarModal(
												item
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
