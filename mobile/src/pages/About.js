import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class About extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Sobre nós',
		headerLeft: (
			<Icon
				style={{ color: '#000', marginLeft: 17.5 }}
				onPress={() => navigation.navigate('Welcome')}
				size={30}
				name={'ios-arrow-back'}
			/>
		)
	});

	render() {
		return (
			<View style={styles.container}>
				<Text> Sobre </Text>
			</View>
		);
	}
}

export default About;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
