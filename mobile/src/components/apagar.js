import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight,Text, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOption: 0,
        };
    }

    updateActiveOption = (activeOption) => {
        this.setState({
            activeOption,
        });
    };

    render() {
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={true}
            >
                <View
                    style={{
                        flex:1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginHorizontal: 10
                    }}
                >
                    {this.props.options.map((option, index) => (
                        <TouchableHighlight
                            underlayColor='#0000'
                            key={index}
                            disabled={option.available ? false : true}
                            style={styles.button}
                            onPress={() => {
                                this.props.onChange(option.plate);
                                this.updateActiveOption(option.plate);
                            }}
                        >
                            <Text style={[
                                styles.buttonText, 
                                {
                                    borderColor: this.state.activeOption === option.plate ? '#3769cc' : '#1113',
                                    color: this.state.activeOption === option.plate ? '#fff' : '#3769cc',
                                    fontWeight: this.state.activeOption === option.plate ? '800' : '300',
                                    backgroundColor: this.state.activeOption === option.plate ? '#3769cc' : '#f5f5f5'
                                },
                                option.available?{opacity: 1}:{opacity: .2, color: '#000'},
                            ]}>
                                {option.plate}
                            </Text>
                        </TouchableHighlight>
                    ))}
                </View>
            </ScrollView>
        );
    }
}

export default Option

const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        marginVertical: 20
    },
	buttonText: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        height: 40,
        fontSize: 15,
        width: width/4.3,
    },
    buttonTextNotDesabledColors:{
        borderColor: '#c7c7c7',
        color: '#c7c7c7',
        fontWeight: '300',
        backgroundColor: '#585858',
    }
})