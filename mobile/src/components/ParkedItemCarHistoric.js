import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('screen');

class ParkedItemCarHistoric extends Component {
	render() {
		const { props } = this;

		return (
			<View>
				<View style={styles.container}>
					<View style={{ backgroundColor: '#1110' }}>
						<View style={{ padding: 15 }}>
							<View
								style={{
									borderLeftWidth: 1,
									borderLeftColor: '#ccc',
									marginLeft: 10
								}}
							>
								<View
									style={{
										marginBottom: 20,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Icon
										size={17.5}
										name={'play'}
										color='#3769cc'
										style={{
											marginLeft: -7.5,
											marginRight: 10,
											backgroundColor: '#fff'
										}}
									/>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											flex: 1
										}}
									>
										<View>
											<Text
												style={{
													fontSize: 15,
													fontWeight: '600'
												}}
											>
												Reserva iniciada
											</Text>
											<Text
												style={{
													fontSize: 13,
													fontWeight: '400',
													marginTop: 2
												}}
											>
												Raul estacionamentos
											</Text>
											<Text
												style={{
													fontSize: 11,
													fontWeight: '400',
													marginTop: 2
												}}
											>
												ASXXDR-21
											</Text>
										</View>
										<View>
											<Text
												style={{
													fontSize: 10,
													fontWeight: '400'
												}}
											>
												10/10/19 11:12
											</Text>
										</View>
									</View>
								</View>

								{/* <View
									style={{
										marginBottom: 20,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Icon
										size={17.5}
										name={'arrow-left'}
										color='#ff014c'
										style={{
											marginLeft: -7.5,
											marginRight: 10,
											backgroundColor: '#fff'
										}}
									/>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											flex: 1
										}}
									>
										<Text
											style={{
												fontSize: 15,
												fontWeight: '600'
											}}
										>
											Saída
										</Text>
										<Text
											style={{
												fontSize: 10,
												fontWeight: '400'
											}}
										>
											10/10/19 11:12
										</Text>
									</View>
								</View> */}

								{/* <View
									style={{
										marginBottom: 20,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Icon
										size={17.5}
										name={'arrow-right'}
										color='#777'
										style={{
											marginLeft: -7.5,
											marginRight: 10,
											backgroundColor: '#fff'
										}}
									/>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											flex: 1
										}}
									>
										<Text
											style={{
												fontSize: 15,
												fontWeight: '600'
											}}
										>
											Retorno
										</Text>
										<Text
											style={{
												fontSize: 10,
												fontWeight: '400'
											}}
										>
											10/10/19 11:56
										</Text>
									</View>
								</View> */}

								<View
									style={{
										marginBottom: 20,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Icon
										size={17.5}
										name={'stop'}
										color='#3769cc'
										style={{
											marginLeft: -7.5,
											marginRight: 10,
											backgroundColor: '#fff'
										}}
									/>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											flex: 1
										}}
									>
										<Text
											style={{
												fontSize: 15,
												fontWeight: '600'
											}}
										>
											Reserva finalizada
										</Text>
										<Text
											style={{
												fontSize: 10,
												fontWeight: '400'
											}}
										>
											10/10/19 12:39
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default ParkedItemCarHistoric;

const styles = StyleSheet.create({
	container: {
		borderWidth: StyleSheet.hairlineWidth,
		backgroundColor: '#fff',
		borderColor: '#1115',
		marginHorizontal: 20,
		marginBottom: 20,
		width: width - 40,
		borderRadius: 10,
		elevation: 3,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5
	}
});
