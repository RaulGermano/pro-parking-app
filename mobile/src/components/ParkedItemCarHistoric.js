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
import moment from 'moment-timezone';

const { width } = Dimensions.get('screen');

class ParkedItemCarHistoric extends Component {
    verifyReservation=(reserve)=>{
        if (reserve.period) {
            if (reserve.period.check_out) {
                return (
                    <Text style={styles.textCreatedAt}>
                        {
                            `${moment(reserve.period.check_out).format(
                                'DD/MM/YYYY'
                            )} às ${moment(reserve.period.check_out).format('HH:mm')}h`
                        }
                    </Text>
                )
            }
        }
    }

    reservationResult=(reserve)=>{
        if (reserve) {
            if (reserve.finished) {
                return (
                    <>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '300'}}>Valor da reserva: </Text>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>
                                R${reserve.value.toFixed(2).replace('.', ',')}
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                            <Text style={{fontSize: 15, fontWeight: '300'}}>Tempo de reserva: </Text>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>
                                {reserve.hours.toFixed(2).replace('.', ':')}h
                            </Text>
                        </View>
                    </>
                )
            }
        }
    }

	render() {
		const { props } = this;

		return (
			<View>
				<View style={styles.container}>
					<View style={{ backgroundColor: '#1110' }}>
						<View style={{ padding: 15 }}>
							<View style={styles.containerBlock}>
								<View style={styles.containerHistoricBlock}>
									<Icon
										size={17.5}
										name={'play'}
										color='#3769cc'
										style={styles.icon}
									/>

									<View style={styles.containerReservationStatedAt}>
										<View>
											<Text style={styles.titleHistoric}>Reserva iniciada</Text>
											<Text style={styles.parking}>{props.reservation.parking.name.toUpperCase()}</Text>
											<Text style={styles.parkingSpace}>{props.reservation.parking.space.name.toUpperCase()}</Text>
										</View>

										<View>
                                            <Text style={styles.textCreatedAt}>
                                                {
                                                    `${moment(props.reservation.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )} às ${moment(props.reservation.createdAt).format('HH:mm')}h`
                                                }
                                            </Text>
										</View>
									</View>
								</View>

                                <View style={[styles.containerHistoricBlock, {marginVertical: 30}]}>
									<Icon
										size={17.5}
										name={'circle'}
										color={!props.reservation.period?'#ccc':'#3769cc'}
										style={styles.icon}
									/>

									<View style={styles.containerReservationStatedAt}>
                                        <Text style={[styles.titleHistoric, props.reservation.period?{opacity: 1}:{opacity: .4}]}>Check-in</Text>
                                        <Text style={styles.textCreatedAt}>
                                            {
                                                !props.reservation.period
                                                    ?<Text />
                                                    :`${moment(props.reservation.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )} às ${moment(props.reservation.createdAt).format('HH:mm')}h`
                                            }
                                        </Text>
									</View>
								</View>

								<View style={[styles.containerHistoricBlock, {marginBottom: 20}]}>
									<Icon
										size={17.5}
										name={'stop'}
										color={!props.reservation.period?'#ccc':'#3769cc'}
										style={styles.icon}
									/>

									<View style={styles.containerReservationStatedAt}>
                                        <Text style={[styles.titleHistoric, props.reservation.period?{opacity: 1}:{opacity: .4}]}>Reserva finalizada</Text>

                                        {this.verifyReservation(props.reservation)}
									</View>
								</View>
							</View>
                                {this.reservationResult(props.reservation)}
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
    },
    containerHistoricBlock: {
        // marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: -7.5,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    containerReservationStatedAt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    textCreatedAt: {
        fontSize: 10,
        fontWeight: '400'
    },
    containerBlock: {
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        marginLeft: 10
    },
    parkingSpace: {
        fontSize: 11,
        fontWeight: '400',
        marginTop: 2
    },
    titleHistoric: {
        fontSize: 15,
        fontWeight: '600'
    },
    parking: {
        fontSize: 13,
        fontWeight: '400',
        marginTop: 2
    }
});
