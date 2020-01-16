import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import PrimaryButton from '../components/Button/Primary';
import SecondaryButton from '../components/Button/Secondary';
import * as Animatable from 'react-native-animatable';
import Loader from "../components/Modal/Loader";

const { width } = Dimensions.get('window');

class Signup extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
        isModalVisible: false,
		login: '',
        password: '',
        password: '',
        confirmPassword: '',
        telephoneDdd: '',
        telephoneNumber: '',
		email: ''
	};

	goingToLogInPage = () => {
		this.props.navigation.navigate('Login');
	};

	handleLogin = login => {
		this.setState({
			login
		});
	};

	handlePassword = password => {
		this.setState({
			password
		});
	};

	handleEMail = email => {
		this.setState({
			email
		});
	};

	tryCreateNewUser = () => {
		const {
			state: { login, password, email }
		} = this;

		console.warn(login, password, email);
	};

	backPage = () => {
		this.props.navigation.navigate('Login');
    };
    
    componentDidMount(){
        this.setState({
            modalLoaderVisible: false
        });
    }

    componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	render() {
        const { state } = this;

		return (
			<Animatable.View
				style={styles.container}
				animation='fadeInUp'
				duration={300}
			>
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<View>
					<Text>Login</Text>
					<TextInput
						style={styles.TextInput}
						value={state.login}
						onChangeText={login => this.handleLogin(login)}
						onSubmitEditing={() => {
							this.TextInputPassword.focus();
						}}
					/>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={styles.containerConfirmCarPlate}>
                            <Text>Senha</Text>
                            <TextInput
                                style={styles.TextInputDouble}
                                value={state.email}
                                secureTextEntry={true}
                                onChangeText={email => this.handleEMail(email)}
                            />
                        </View>

                        <View style={styles.containerPassword}>
                            <Text>Confirmar senha</Text>
                            <TextInput
                                style={styles.TextInputDouble}
                                value={state.email}
                                secureTextEntry={true}
                                onChangeText={email => this.handleEMail(email)}
                            />
                        </View>
                    </View>

					<Text>E-Mail</Text>
					<TextInput
						style={styles.TextInput}
						value={state.email}
						keyboardType='email-address'
						onChangeText={email => this.handleEMail(email)}
					/>

                    <View style={{ flexDirection: 'row',  marginTop: 20 }}>
                        <View style={styles.containerConfirmCarPlate}>
                            <Text>DDD</Text>
                            <TextInput
                                style={styles.TextInputDouble}
                                value={state.email}
                                onChangeText={email => this.handleEMail(email)}
                            />
                        </View>

                        <View style={styles.containerTelephone}>
                            <Text>Telefone</Text>
                            <TextInput
                                style={styles.TextInputDouble}
                                value={state.email}
                                onChangeText={email => this.handleEMail(email)}
                            />
                        </View>
                    </View>
				</View>

				<View style={styles.options}>
					<SecondaryButton
						title='Possuo cadastro'
						onPress={this.goingToLogInPage}
					/>

					<View style={styles.containerSeparetor} />

					<PrimaryButton
						title='Cadastrar'
						onPress={this.tryCreateNewUser}
					/>
				</View>
			</Animatable.View>
		);
	}
}

export default Signup;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerSeparetor: {
		marginHorizontal: 10
	},
	options: {
		flexDirection: 'row',
		justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30
	},
	TextInput: {
		height: 45,
		backgroundColor: '#eaeaea',
		width: width - 40,
		borderRadius: 7,
		padding: 10,
		marginBottom: 20
    },
    TextInputDouble: {
        height: 45,
		backgroundColor: '#eaeaea',
		width: '100%',
		borderRadius: 7,
        padding: 10,
        marginBottom: 20
    },
    containerTelephone: {
		flex: 2
    },
    containerPassword: {
		flex: 1
	},
	containerConfirmCarPlate: {
        flex: 1,
        marginRight: 10
    },
    TextInputPlateAndConfirm: {
		marginBottom: 20
	},
});
