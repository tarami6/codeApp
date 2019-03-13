import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


const defaultInput = props => (
    <TextInput
        {...props}
        onSubmitEditing={props.submit? () => props.submit.focus(): null}
        ref={props.refs ? input => { props.refs = input; } : null}
        style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid :  null ]}
    />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5
    },

});

export default defaultInput;