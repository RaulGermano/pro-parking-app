import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	TouchableHighlight,
	Image
} from 'react-native';
import ImageCarFree from '../../img/car-icon/car-free/car-free.png';
import SmallButton from '../components/Button/AbsoluteSmall';

const { width } = Dimensions.get('screen');

class CarItemList extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableHighlight underlayColor='#fff' onPress={props.onPress}>
				<View style={styles.container}>
					<View style={styles.containerImage}>
						<Image style={styles.image} source={ImageCarFree} />
					</View>
					<View style={styles.containerCarDetails}>
						<Text numberOfLines={1} style={styles.textCarPlate}>
							{props.carPlate}
						</Text>

						<Text numberOfLines={1} style={styles.textCarName}>
							{props.carName}
						</Text>
					</View>

					<SmallButton
						onPress={props.onPressSmallClose}
						icon='ios-close-circle'
						iconSize={25}
						position={{ top: 3, right: 5 }}
					/>
				</View>
			</TouchableHighlight>
		);
	}
}

export default CarItemList;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 1,
		marginHorizontal: 20,
		marginBottom: 10,
		borderColor: '#1113',
		borderRadius: 10,
		elevation: 3,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		backgroundColor: '#ffffff',
		width: width - 40,
		height: 60
	},
	containerImage: {
		width: 60
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		margin: 10
	},
	containerCarDetails: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#eaeaea',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		paddingLeft: 15,
		paddingRight: 50,
		paddingVertical: 10
	},
	textCarPlate: {
		fontWeight: '500',
        fontSize: 17,
        textTransform: 'uppercase'
	},
	textCarName: {
		fontWeight: '300',
        fontSize: 11,
        textTransform: 'uppercase'
	}
});
