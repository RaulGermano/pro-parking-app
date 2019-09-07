import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

class BlockMediumStatus extends Component {
	render() {
		return (
			<View>
				<View style={styles.containerStyle}>
					<Text
						numberOfLines={1}
						style={[
							styles.titleBlock,
							{ borderBottomColor: this.props.borderColor }
						]}
					>
						{this.props.titulo}
					</Text>
					<View
						style={[
							styles.containerBlock,
							{
								backgroundColor: this.props.bgColor,
								borderColor: this.props.borderColor
							}
						]}
					>
						<Text
							style={[
								styles.textValueBlock,
								{ color: this.props.color }
							]}
						>
							{this.props.value}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default BlockMediumStatus;

const styles = StyleSheet.create({
	titleBlock: {
		borderBottomWidth: 0.5,
		fontSize: 12.5,
		fontWeight: '400',
		textAlign: 'center',
		padding: 5
	},
	containerStyle: {
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#111',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		backgroundColor: '#ffffff',
		borderWidth: 0.5,
		borderColor: '#ccc',
		width: width / 4 - 15,
		height: width / 4 - 16,
		borderRadius: 10,
		margin: 10
	},
	textValueBlock: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center'
	},
	containerBlock: {
		flex: 1,
		borderWidth: 0.5,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		backgroundColor: '#efefef',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
