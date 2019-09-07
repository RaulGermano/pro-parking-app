import React, { Component } from 'react';
import {
	Platform,
	Text,
	StyleSheet,
	View,
	TouchableOpacity
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';

class SearchMap extends Component {
	state = {
		searchFocused: false,
		backgroundColorSearchInput: null,
		borderColorSearchInput: null,
		elevationSearchInput: 0
	};

	componentDidMount() {
		if (this.props.theme == 'dark') {
			this.setState({
				backgroundColorSearchInput: '#aaa',
				borderColorSearchInput: '#777',
				elevationSearchInput: 0
			});
		} else {
			this.setState({
				backgroundColorSearchInput: '#fff',
				borderColorSearchInput: '#ccc',
				elevationSearchInput: 20
			});
		}
	}

	render() {
		const { props, state } = this;

		const { onLocationSelected, onPressToBack } = props;

		return (
			<GooglePlacesAutocomplete
				placeholder='Pesquise'
				placeholderTextColor='#333'
				minLength={2}
				currentLocationLabel='Local atual'
				returnKeyType={'search'}
				onPress={onLocationSelected}
				listViewDisplayed={state.searchFocused}
				fetchDetails={true}
				enablePoweredByContainer={false}
				query={{
					key: 'AIzaSyDqcTeikQQy45rsSbFGwxC1so1-M7X7Ax0',
					language: 'pt'
				}}
				textInputProps={{
					onFocus: () => {
						this.setState({ searchFocused: true });
					},
					onBlur: () => {
						this.setState({ searchFocused: false });
					},
					autoCapitalize: 'none',
					autoCorrect: false
				}}
				renderLeftButton={() => (
					<View>
						<TouchableOpacity
							onPress={() => onPressToBack.navigate('Home')}
							style={{
								height: 45,
								backgroundColor:
									state.backgroundColorSearchInput,
								textAlignVertical: 'center',
								textAlign: 'center',
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 0,
								borderTopLeftRadius: 10,
								borderTopRightRadius: 0
							}}
						>
							<Icon
								style={{
									flex: 1,
									color: '#333',
									textAlign: 'center',
									justifyContent: 'center',
									textAlignVertical: 'center',
									marginLeft: 15,
									paddingRight: 15,
									borderRightColor:
										state.borderColorSearchInput,
									borderRightWidth: 1
								}}
								size={30}
								name={'ios-arrow-back'}
							/>
						</TouchableOpacity>
					</View>
				)}
				styles={{
					container: {
						position: 'absolute',
						top: Platform.select({ ios: 60, android: 35 }),
						width: '100%'
					},
					textInputContainer: {
						flex: 1,
						backgroundColor: state.backgroundColorSearchInput,
						height: 45,
						marginHorizontal: 15,
						borderTopWidth: 0,
						borderBottomWidth: 0,
						borderRadius: 10,
						elevation: state.elevationSearchInput,
						shadowColor: '#000',
						shadowOpacity: 0.5,
						shadowOffset: {
							x: 0,
							y: 0
						},
						shadowRadius: 15
					},
					textInput: {
						backgroundColor: state.backgroundColorSearchInput,
						height: 45,
						margin: 0,
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 10,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 10,
						paddingTop: 0,
						paddingBottom: 0,
						paddingLeft: 15,
						paddingRight: 20,
						marginTop: 0,
						marginLeft: 0,
						marginRight: 0
					},
					listView: {
						marginHorizontal: 15,
						marginTop: 10,
						elevation: state.elevationSearchInput,
						shadowColor: '#000',
						shadowOpacity: 0.1,
						shadowOffset: {
							x: 0,
							y: 0
						},
						shadowRadius: 15,
						borderRadius: 10,
						borderWidth: 1,
						borderColor: '#ddd',
						backgroundColor: '#fff'
					},
					description: {
						fontSize: 14
					},
					row: {
						paddingHorizontal: 20,
						paddingVertical: 10,
						height: 45
					}
				}}
			/>
		);
	}
}

export default SearchMap;
