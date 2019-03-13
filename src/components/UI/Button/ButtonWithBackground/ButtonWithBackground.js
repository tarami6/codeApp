import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const buttonWithBackground = props => {

    const content = (
            <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
                <Text style={[{textAlign: 'center'},props.disabled ? styles.disabledText : null]}>{props.children}</Text>
            </View>
    )

    if(props.disabled){
        return content
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
                <Text style={[{textAlign: 'center'},props.disabled ? styles.disabledText : null]}>{props.children}</Text>
            </View>
        </TouchableOpacity>

    )


}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa',
    },
    disabledText:{
        color: '#aaa',
        textAlign: 'center'
    }
})

export default buttonWithBackground;