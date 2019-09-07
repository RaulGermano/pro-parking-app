import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

class PrimaryTextInput extends Component {
	render() {
		const { props } = this;

		return (
			<View>
				<Text>{props.textInputLabel}</Text>
				<TextInput
					style={styles.container}
					value={props.TextInputValue}
					keyboardType={props.keyboardType}
					onChangeText={props.text}
					ref={props.ref}
					autoCorrect={props.autoCorrect || true}
					autoFocus={props.autoFocus || false}
					editable={props.editable || true}
					placeholder={props.placeholder || ''}
					placeholderTextColor='#333'
				/>
			</View>
		);
	}
}

export default PrimaryTextInput;

const styles = StyleSheet.create({
	container: {
		height: 45,
		backgroundColor: '#efefef',
		width: width - 40,
		borderRadius: 7,
		padding: 10,
		marginBottom: 20
	}
});
