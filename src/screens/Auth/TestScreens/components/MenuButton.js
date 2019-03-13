import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';

export default class MenuButton extends React.Component{
    render() {
        return(
            <TouchableHighlight onPress={()=>this.props.navigation.toggleDrawer()}>
                <View>
                    <Text>First Icon</Text>
                </View>
            </TouchableHighlight>

        )
    }
}
