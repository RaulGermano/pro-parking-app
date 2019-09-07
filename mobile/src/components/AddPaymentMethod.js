import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Image,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mastercard from '../../img/credit-card/mastercard_0.png';
import Visa from '../../img/credit-card/visa_0.png';
import Paypal from '../../img/credit-card/paypal_0.png';

class PaymentMethodItem extends Component {
	selectImage = creditCardFlag => {
		if (creditCardFlag === 1) {
			return (
				<Image source={Mastercard} style={styles.imageCreditCardFlag} />
			);
		} else if (creditCardFlag === 2) {
			return <Image source={Visa} style={styles.imageCreditCardFlag} />;
		} else if (creditCardFlag === 3) {
			return <Image source={Paypal} style={styles.imageCreditCardFlag} />;
		}
	};

	render() {
		const { props } = this;

		return (
			<TouchableHighlight
				underlayColor='#fff'
				onPress={() => props.onPress}
			>
				<View style={styles.container}>
					<View style={styles.containerCreditCard}>
						<Text numberOfLines={1} style={styles.textCreditCard}>
							Novo Cartão de Crédito
						</Text>
					</View>
					<Icon
						name='ios-add-circle'
						size={24}
						color={props.color}
						style={styles.iconInformations}
					/>
				</View>
			</TouchableHighlight>
		);
	}
}

export default PaymentMethodItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#1113',
		borderRadius: 10,
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		backgroundColor: '#eaeaea',
		marginHorizontal: 20,
		padding: 7.5,
		marginTop: 10
	},
	textCreditCard: {
		marginLeft: 10,
		fontSize: 15
	},
	containerCreditCard: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	iconInformations: {
		marginRight: 5
	}
});
