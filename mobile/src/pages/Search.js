import React, { Component, Fragment } from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchMap from '../components/SearchMap';
import DirectionsMap from '../components/DirectionsMap';
import { mapLightModeStyle, mapDarkModeStyle } from '../config/MapTheme';
import BadgeMap from '../components/BadgeMap';
import PixelSize from '../config/PixelSize';
import MarkerImage from '../../img/marker/marker.png';
import MarkerInformation from '../components/MarkerInformation';
import Loader from "../components/Modal/Loader";
import Api from "../services/Api";
import DetailsParkingSpace from '../components/Modal/DetailsParkingSpace';

class Search extends Component {
	state = {
        parkingId: 0,
		region: null,
		destination: null,
        modalLoaderVisible: false,
        modalParkingInformationsVisible: true,
		showMapOptions: false,
        followsUserLocation: false,
        parkingList:[],
        parkingSpacesesList:[],
		mapTheme: {
			theme: 'dark',
			config: mapDarkModeStyle
		}
    };
    
    componentWillMount(){
        this.setState({
            modalLoaderVisible: true
        });
    }

	async componentDidMount(){
        const parkings=await Api.get(`/select-parkings/?excluded=${false}`)

        this.setState({
            parkingList:parkings.data.result
        })

		date = new Date();

		if (date.getHours() != 1) {
			this.setState({
				mapTheme: {
					theme: 'ligth',
					config: mapLightModeStyle
				}
			});
		} else {
			this.setState({
				mapTheme: {
					theme: 'dark',
					config: mapDarkModeStyle
				}
			});
		}

		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				this.setState({
					region: {
						latitude,
						longitude,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134
					}
				});
			},
			() => {},
			{
				timeout: 1500,
				enableHighAccuracy: true,
				maximumAge: 2000
			}
        );
        
        this.setState({
            modalLoaderVisible: false
        });
    }

    selectParkingSpaces= async (id) => {
        this.setState({
            modalLoaderVisible: true
        });

        this.setState({
            parkingId: id
        })

        this.refs.parkingsInformations.toggleModal();

        this.setState({
            modalLoaderVisible: false
        });
    }

	userFocus = () => {
		this.setState({
			followsUserLocation: true
		});
	};

	goingToParkedList = () => {
		this.props.navigation.navigate('Parked');
	};

	handleLocationSelected = (data, { geometry }) => {
		const {
			location: { lat: latitude, lng: longitude }
		} = geometry;

		this.setState({
			destination: {
				latitude,
				longitude,
				title: data.structured_formatting.main_text
			}
		});
	};

	mapReady = () => {
		this.setState({
			showMapOptions: true
		});
	};

	render() {
		const { state } = this;
		const { destination } = state;

		return (
			<View style={styles.container}>

				<StatusBar hidden={true} />

                <Loader isModalVisible={state.modalLoaderVisible} cover={true} />

                <DetailsParkingSpace
                    ref={'parkingsInformations'}
                    parkingId={state.parkingId}
                    isModalVisible={state.modalParkingInformationsVisible}
                    cover={true}
                    navigation={this.props.navigation}
                />

				<MapView
					style={styles.container}
					region={state.region}
					showsCompass={false}
					showsUserLocation={true}
					showsMyLocationButton={false}
					showsBuildings={true}
					zoomTapEnabled={false}
					loadingEnabled={true}
					loadingIndicatorColor='#3769cc'
					followsUserLocation={state.followsUserLocation}
					moveOnMarkerPress={true}
					customMapStyle={state.mapTheme.config}
					onMapReady={this.mapReady}
					ref={el => (this.MapView = el)}
					loadingBackgroundColor={
						state.mapTheme.theme == 'dark' ? '#212121' : '#f5f5f5'
					}
				>
                    {
                        state.parkingList.map(item=>{
                            return (
                                <Marker
                                    key={item._id}
                                    onPress={()=>this.selectParkingSpaces(item._id)}
                                    anchor={{ x: 0, y: 0 }}
                                    coordinate={{
                                        latitude: item.address.coordinates.latitude,
                                        longitude: item.address.coordinates.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                    image={MarkerImage}
                                />
                            )
                        })
                    }

					{destination && (
						<Fragment>
							<DirectionsMap
								origin={state.region}
								destination={destination}
								onReady={result => {
									console.log(result);

									this.MapView.fitToCoordinates(
										result.coordinates,
										{
											top: PixelSize(50),
											right: PixelSize(50),
											bottom: PixelSize(50),
											left: PixelSize(50)
										}
									);
								}}
							/>
							<Marker
								onPress={console.log(destination.title)}
								anchor={{ x: 0, y: 0 }}
								coordinate={destination}
								image={MarkerImage}
							/>
						</Fragment>
					)}
				</MapView>

				{state.showMapOptions ? (
					<BadgeMap
						position={{ bottom: 15, right: 15 }}
						icon='md-book'
						color='#fff'
						textColor='#777'
						onPress={this.goingToParkedList}
						theme={this.state.mapTheme.theme}
					/>
				) : (
					<View />
				)}

				{state.showMapOptions ? (
					<BadgeMap
						position={{ bottom: 75, right: 15 }}
						icon='md-locate'
						color='#3769cc'
						textColor='#fff'
						onPress={this.userFocus}
						theme={this.state.mapTheme.theme}
					/>
				) : (
					<View />
				)}

				{state.showMapOptions ? (
					<SearchMap
						onLocationSelected={this.handleLocationSelected}
						onPressToBack={this.props.navigation}
						theme={this.state.mapTheme.theme}
					/>
				) : (
					<View />
				)}
			</View>
		);
	}
}

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	markerInformation: {
		backgroundColor: '#fff'
	}
});
