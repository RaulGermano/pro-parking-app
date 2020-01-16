import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
class CompleteHeader extends Component {
	render() {
		const { props } = this;

		return (
			<View style={styles.container}>
				<Animatable.View
					animation='fadeIn'
					duration={300}
					style={styles.containerBackWithTitle}
				>
					<TouchableOpacity onPress={props.onBackPress}>
						<Icon
							style={styles.iconBack}
							size={30}
							name={'ios-arrow-back'}
						/>
					</TouchableOpacity>
                    <View>
                        <Text numberOfLines={1} style={styles.textTitle}>
                            {props.title}
                        </Text>
                        <Text numberOfLines={1} style={styles.textSubTitle}>
                            {props.subTitle}
                        </Text>
                    </View>
				</Animatable.View>

				<Animatable.View animation='fadeInRight' duration={400}>
					<View style={styles.containerOptions}>
						<TouchableOpacity onPress={props.onEditPress}>
							<Icon
								style={styles.iconEdit}
								size={30}
								name='md-create'
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={props.onExcludePress}>
							<Icon
								style={styles.iconExclude}
								size={30}
								name={'md-trash'}
							/>
						</TouchableOpacity>
					</View>
				</Animatable.View>
			</View>
		);
	}
}

export default CompleteHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20,
		justifyContent: 'space-between'
	},
	containerBackWithTitle: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	containerOptions: {
		flexDirection: 'row'
	},
	iconEdit: {
		color: '#000',
		marginLeft: 20
	},
	iconBack: {
		color: '#000',
		marginHorizontal: 20
	},
	iconExclude: {
		color: '#000',
		marginHorizontal: 20
	},
	textTitle: {
		fontSize: 25,
		color: '#111',
		fontWeight: '700'
    },
    textSubTitle:{
        fontSize: 15,
		color: '#777',
		fontWeight: '700'
    }
});
