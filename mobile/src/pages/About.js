import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={[styles.containerStyle, {flex: 1, backgroundColor: '#fff', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 15, width: width - 40, marginBottom: 20}]}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Icon
                                name='md-bookmark'
                                size={24}
                                color='#ff014c'
                                style={{marginRight: 10}}
                            />
                            <Text style={{fontSize: 17.5, color: '#333', fontWeight: '700', marginBottom: 10}}>
                                Atenção!
                            </Text>
                        </View>
                        <Text style={{fontSize: 15}}>Logo haverá uma atualização neste módulo, fique atento(a)!</Text>
                    </View>
                </View>
            </ScrollView>
		);
	}
}

export default About;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center'
    },
    containerStyle: {
        marginTop: 20,
		width: width - 30,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#1113',
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		marginHorizontal: 20
	}
});
