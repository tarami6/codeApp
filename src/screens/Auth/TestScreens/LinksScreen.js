import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage,StyleSheet, Button} from 'react-native';
import { createDrawerNavigator } from 'react-navigation';




export default class LinksScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>LinksScreen</Text>
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


