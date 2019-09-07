import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('screen');

class Loader extends Component {
	render() {
		const { state, props } = this;

		return (
			<Modal
				isVisible={props.isModalVisible}
				backdropOpacity={0.75}
				animationIn={'fadeIn'}
				animationOut={'fadeOut'}
				animationInTiming={500}
				animationOutTiming={500}
				backdropTransitionInTiming={500}
				backdropTransitionOutTiming={500}
			>
				<View>
					<View style={styles.container}>
						<View style={styles.containerModal}>
							<ActivityIndicator size={45} color='#1f88d9' />
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

export default Loader;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerModal: {
		backgroundColor: '#fff',
		width: 65,
		height: 65,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
