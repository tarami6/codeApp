import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage,StyleSheet, Button} from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import MenuButton from './components/MenuButton'



export default class HomeScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation}/>
                <Text>Home</Text>
            </View>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 30,
    }
});


