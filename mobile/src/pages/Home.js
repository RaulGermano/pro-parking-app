import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	Dimensions,
	RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LastParked from '../components/LastParked';
import TitlePage from '../components/TitlePage';
import SearchBox from '../components/SearchBox';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('screen');

class Search extends Component {
	state = {
		refreshScreen: false
	};

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

	goingToDoubts = () => {
		this.props.navigation.navigate('Doubts');
	};

	render() {
		const { props, state } = this;

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<SafeAreaView>
					<View style={styles.container}>
						<TitlePage titleText='Últimas paradas' />

						<ScrollView
							showsVerticalScrollIndicator={false}
							refreshControl={
								<RefreshControl
									refreshing={state.refreshScreen}
									onRefresh={() =>
										console.log('Recarregar tela')
									}
								/>
							}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							<View style={styles.containerBlockParked}>
								<Animatable.View
									animation='fadeInLeft'
									duration={500}
								>
									<LastParked
										name='Outro Estacionamento'
										payValue={8.5}
										hours={5.6}
									/>
								</Animatable.View>

								<Animatable.View
									animation='fadeInLeft'
									duration={650}
								>
									<LastParked
										name='Outro Estacionamento'
										payValue={8.5}
										hours={5.6}
									/>
								</Animatable.View>

								<Animatable.View
									animation='fadeInLeft'
									duration={800}
								>
									<LastParked
										name='Outro Estacionamento'
										payValue={8.5}
										hours={5.6}
									/>
								</Animatable.View>

								<Animatable.View
									animation='fadeInLeft'
									duration={950}
								>
									<LastParked
										name='Outro Estacionamento'
										payValue={8.5}
										hours={5.6}
									/>
								</Animatable.View>
							</View>
						</ScrollView>

						<View style={styles.containerBlockMap}>
							<TitlePage titleText='Aventure-se' />

							<SearchBox
								image={require('../../img/search-card/image2.png')}
								text='Encontre sua melhor vaga'
								onPress={props.navigation}
							/>
						</View>
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	containerBlockParked: {
		backgroundColor: '#fff',
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: 15,
		marginBottom: 20
	},
	containerBlockMap: {
		flex: 1,
		marginBottom: 20
	},
	imageBanner: {
		flex: 1,
		height: null,
		width: null,
		resizeMode: 'cover',
		borderRadius: 10
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
