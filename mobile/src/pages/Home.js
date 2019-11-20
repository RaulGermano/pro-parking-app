import React, { Component } from 'react';
import {
	StyleSheet,
    View,
    Text,
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
import Api from "../services/Api";
import Loader from "../components/Modal/Loader";
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

class Search extends Component {
	state = {
        activeReservations:{
            count: 0
        },
        isModalVisible: false,
        refreshScreen: false,
        lastReservationsList:[]
	};

	componentDidMount() {
        this.verifyLog();

        this.setState({
            modalLoaderVisible: false
        });
    }
    
    componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	verifyLog = async () => {
		try {
            const userToken = await AsyncStorage.getItem('userId');

            const userInformations=JSON.parse(userToken)

            const lastReservations=await Api.get(`/select-month-reservations/?client_id=${userInformations._id}`)

            const activeReservations=await Api.get(`/select-active-reservations/?client_id=${userInformations._id}`)

            this.setState({
                activeReservations: activeReservations.data
            })

            this.setState({
                lastReservationsList: lastReservations.data.result
            })

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
                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

				<SafeAreaView>
					<View style={styles.container}>
						<TitlePage titleText='Últimas paradas' />

						<ScrollView
							showsVerticalScrollIndicator={false}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={state.refreshScreen}
                                    onRefresh={() =>
                                        console.log('Recarregar tela')
                                    }
                                />
                            }
						>
							<View style={styles.containerBlockParked}>
                                {
                                    state.lastReservationsList.map(item=>{
                                        return (
                                            <Animatable.View
                                                key={item._id}
                                                animation='fadeInLeft'
                                                duration={500}
                                            >
                                                <LastParked
                                                    name={item.parking.name}
                                                    payValue={item.value}
                                                    status={item.value?1:0}
                                                    hours={item.hours}
                                                />
                                            </Animatable.View>
                                        )
                                    })
                                }
								
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

                        {
                            state.activeReservations.count>0?(
                                <View style={[styles.containerStyle, {flex: 1, backgroundColor: '#fff', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 15, width: width - 40, marginBottom: 20}]}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Icon
                                            name='md-bookmark'
                                            size={24}
                                            color='#3769cc'
                                            style={{marginRight: 10}}
                                        />
                                        <Text style={{fontSize: 17.5, color: '#333', fontWeight: '700', marginBottom: 10}}>
                                            Atenção!
                                        </Text>
                                    </View>
                                    <Text style={{fontSize: 20}}>Há reservas em andamento</Text>
                                </View>
                            ):(
                                <View />
                            )
                        }
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
