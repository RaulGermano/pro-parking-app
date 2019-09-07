import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import PaymentMethodsItem from '../components/PaymentMethodsItem';
import UserImage from '../../img/user-image/image-1.png';
import TitlePage from '../components/TitlePage';
import UserInformationItemList from '../components/UserInformationItemList';
import ButtonAbsoluteRadio from '../components/Button/AbsoluteRadio';
import AddPaymentMethod from '../components/AddPaymentMethod';

class Search extends Component {
	goingToEditProfile = () => {
		this.props.navigation.navigate('');
	};

	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.containerUserData}>
						<View style={styles.containerUserImage}>
							<Image
								source={UserImage}
								style={styles.imageUser}
							/>
						</View>

						<View style={styles.containerUserIdentification}>
							<Text
								numberOfLines={1}
								style={styles.textUserLogin}
							>
								raul.germano
							</Text>
							<Text
								numberOfLines={1}
								style={styles.textUserEmail}
							>
								raul.germano@icloud.com
							</Text>
						</View>
					</View>

					<View style={styles.containerInformationBlock}>
						<TitlePage titleText='Minhas informações' />
						<ButtonAbsoluteRadio
							position={{ top: 15, right: 20 }}
							onPress={() => console.log('Alterar informações')}
							iconSize={27.5}
							bgColor='#3769cc'
							textColor='#fff'
							icon='md-create'
						/>

						<UserInformationItemList
							title='Nome'
							information='Raul Vitor Chiozini Germano'
						/>

						<UserInformationItemList
							title='Telefone'
							information='(17) 99184-8128'
						/>

						<UserInformationItemList
							title='Sexo'
							information='Masculino'
						/>

						<UserInformationItemList
							title='Nascimento'
							information='27/01/1999 - 20 anos'
						/>
					</View>
				</View>

				{/* <View style={styles.containerCreditCardsBlock}>
					<TitlePage titleText='Formas de pagamento' />

					<PaymentMethodsItem
						onPress={() =>
							console.log('gerenciar cartão de crédito')
						}
						creditCardFlag={1}
						creditCardNumber={1256}
					/>

					<PaymentMethodsItem
						onPress={() =>
							console.log('gerenciar cartão de crédito')
						}
						creditCardFlag={2}
						creditCardNumber={1256}
					/>

					<PaymentMethodsItem
						onPress={() =>
							console.log('gerenciar cartão de crédito')
						}
						creditCardFlag={3}
						creditCardNumber={1256}
					/>

					<AddPaymentMethod
						onPress={() =>
							console.log('gerenciar cartão de crédito')
						}
					/>
				</View> */}
			</ScrollView>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	containerUserData: {
		flex: 1,
		backgroundColor: '#3769cc',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20
	},
	containerUserImage: {
		flex: 1,
		width: 100,
		height: 100,
		borderRadius: 100,
		borderWidth: 12,
		borderColor: '#234a98',
		elevation: 3
	},
	containerInformationBlock: {
		marginBottom: 20
	},
	containerCreditCardsBlock: {
		marginBottom: 20
	},
	imageUser: {
		width: null,
		height: null,
		flex: 1,
		resizeMode: 'cover',
		borderRadius: 100
	},
	containerUserIdentification: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	textUserLogin: {
		color: '#fff',
		fontSize: 25,
		fontWeight: '500',
		marginHorizontal: 20
	},
	textUserEmail: {
		color: '#fff',
		fontSize: 17,
		fontWeight: '300',
		marginHorizontal: 20
	}
});
