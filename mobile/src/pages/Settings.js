import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import SettingsListItem from '../components/SettingsListItem';
import CreatedBy from '../components/CreatedBy';
import TitlePage from '../components/TitlePage';
import AppVersion from '../components/AppVersion';

class Search extends Component {
	goingToLogOut = () => {
		this.props.navigation.navigate('LogOut');
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<TitlePage titleText='Configurações' />

					<View style={{ marginHorizontal: 20 }}>
						<SettingsListItem
							icon='ios-card'
							settingsTitle='Formas de pagamento'
							color='#777'
							fontWeight='400'
							touchable={true}
							onPress={() => console.warn(123)}
						/>

						<SettingsListItem
							icon='ios-copy'
							settingsTitle='Termos de condições'
							color='#777'
							fontWeight='400'
							touchable={true}
							onPress={() => console.warn(123)}
						/>

						<SettingsListItem
							icon='ios-call'
							settingsTitle='Entrar em contato'
							color='#777'
							fontWeight='400'
							touchable={true}
							onPress={() => console.warn(123)}
						/>

						<SettingsListItem
							icon='md-information-circle'
							settingsTitle='Sobre o PRO Parking'
							color='#777'
							fontWeight='400'
							touchable={true}
							onPress={() => console.warn(123)}
						/>

						<SettingsListItem
							icon='ios-help-circle'
							settingsTitle='Relatar um problema'
							color='#777'
							fontWeight='400'
							touchable={true}
							onPress={() => console.warn(123)}
						/>

						<AppVersion
							icon='ios-apps'
							settingsTitle='Versão do aplicativo'
							version='0.0.10 - alpha'
							color='#777'
							fontWeight='400'
						/>

						<SettingsListItem
							icon='ios-pricetags'
							settingsTitle='Anuncie suas vagas'
							color='#1f88d9'
							fontWeight='500'
							touchable={true}
							onPress={() => console.warn(123)}
						/>

						<SettingsListItem
							icon='md-power'
							settingsTitle='Sair do aplicativo'
							color='#ff014c'
							fontWeight='500'
							touchable={true}
							onPress={this.goingToLogOut}
						/>
					</View>
				</ScrollView>
				<CreatedBy />
			</View>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	containerTitle: {
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 5
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
	}
});
