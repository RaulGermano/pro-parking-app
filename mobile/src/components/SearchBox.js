import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	Image,
	TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('screen');

class SearchBox extends Component {
	render() {
		const { props } = this;

		return (
			<TouchableHighlight
				underlayColor='#fff'
				onPress={() => props.onPress.navigate('Search')}
			>
				<View style={styles.container}>
					<View style={styles.containerImage}>
						<Animatable.Image
							animation='fadeIn'
							duration={1000}
							source={props.image}
							style={styles.imageBox}
						/>
					</View>

					<View style={styles.containerText}>
						<Text numberOfLines={1} style={styles.textBox}>
							{props.text}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default SearchBox;

const styles = StyleSheet.create({
	container: {
		borderWidth: StyleSheet.hairlineWidth,
		backgroundColor: '#fff',
		borderColor: '#1115',
		marginHorizontal: 20,
		height: 250,
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
	containerImage: {
		flex: 1
	},
	containerText: {
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10
	},
	imageBox: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	textBox: {
		fontSize: 17.5,
		color: '#333',
		fontWeight: '700',
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 12.5,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10
	}
});
