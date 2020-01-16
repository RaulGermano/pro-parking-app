import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PaymentMethodsItem from '../components/PaymentMethodsItem';
import UserImage from '../../img/user-image/image-1.png';
import TitlePage from '../components/TitlePage';
import UserInformationItemList from '../components/UserInformationItemList';
import ButtonAbsoluteRadio from '../components/Button/AbsoluteRadio';
import AddPaymentMethod from '../components/AddPaymentMethod';
import EditUser from '../components/Modal/EditUser';
import Api from "../services/Api";
import Loader from "../components/Modal/Loader";

class Search extends Component {
    state={
        modalLoaderVisible: false,
        userInformations: {
            name: '',
            email: '',
            cpf: '',
            telephone: {
                ddd: '',
                number: ''
            }
        }
    }

    async componentDidMount(){
        const userToken = await AsyncStorage.getItem('userId');

        const userInformations=JSON.parse(userToken)

        const clientInformations=await Api.get(`/select-client-informations/?client_id=${userInformations._id}`)

        console.log('cliente: ', clientInformations.data[0]);

        this.setState({
            userInformations: clientInformations.data[0]
        })

        this.setState({
            modalLoaderVisible: false
        });
    }

    componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	openEditUserModal = () => {
		this.refs.editUser.toggleModal();
    };

    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');

        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }

        return splitStr.join(' '); 
    }
    
	render() {
        const { state } = this

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

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
							onPress={this.openEditUserModal}
							iconSize={27.5}
							bgColor='#3769cc'
							textColor='#fff'
							icon='md-create'
						/>

						<UserInformationItemList
							title='Nome'
							information={this.titleCase(state.userInformations.name)}
						/>

						<UserInformationItemList
							title='Telefone'
							information={
                                `(${state.userInformations.telephone.ddd}) ${state.userInformations.telephone.number}`
                            }
						/>

						<UserInformationItemList
							title='E-Mail'
							information={state.userInformations.email}
						/>

						<UserInformationItemList
							title='CPF'
							information={
                                `${state.userInformations.cpf.substring(0, 3)}......-..`}
						/>
					</View>
				</View>

                <EditUser ref={'editUser'} userId={state.userInformations._id} />

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
