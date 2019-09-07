import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	TouchableHighlight
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ParkedItem from '../components/ParkedItem';
import PendingParkerItem from '../components/PendingParkerItem';
import NonePendingParker from '../components/NonePendingParker';

class Search extends Component {
	componentDidMount() {
		this.verifyLog();
	}

	verifyLog = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userId');

			this.props.navigation.navigate(userToken ? '' : 'Welcome');
		} catch (error) {
			console.log('erro: ', error);
		}
	};

	goingToNewCar = () => {
		this.props.navigation.navigate('NewCar');
	};

	goingToCarInformation = () => {
		this.props.navigation.navigate('CarInformation');
	};

	render() {
		return (
			<SafeAreaView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.containerTitle}>
						<Text style={styles.textTitle}>Paradas pendentes</Text>
					</View>
					<View style={styles.containerCars}>
						{1 == 1 ? (
							<PendingParkerItem
								totalHours={6.2}
								totalPay={23.45}
								valuePerHour={3.78}
								parkingSpaceName='AS4582'
								parkerName='Raul`s Estacionamentos'
							/>
						) : (
							<NonePendingParker />
						)}
					</View>

					<View style={[styles.containerTitle, { marginTop: 45 }]}>
						<Text style={styles.textTitle}>
							Histórico de paradas
						</Text>
					</View>

					<View style={styles.containerCars}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>

							<TouchableHighlight
								underlayColor='transparent'
								onPress={this.goingToParkedDetails}
							>
								<ParkedItem
									totalHours={6.2}
									totalPay={23.45}
									valuePerHour={3.78}
									parkingSpaceName='AS4582'
									parkerName='Raul`s Estacionamentos'
								/>
							</TouchableHighlight>
						</ScrollView>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	containerElement: {
		marginTop: 20
	},
	containerTitle: {
		marginTop: 30,
		marginBottom: 15,
		marginLeft: 15
	},
	containerCars: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
	}
});
