import React, {Component} from 'react';
import {View, Animated, StyleSheet, Image, AsyncStorage} from 'react-native';

import logo from '../../assets/img/logodark.png'

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeAnim: new Animated.Value(1),
            users: []
        }
    }

    animationHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    navToAuth = () => {
        this.animationHandler();
        this.props.navigation.navigate('Auth', {users: this.state.users})
    }

    getUsers = async () => {
        let usersList = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(usersList)
        console.log("users", parsed)
        this.setState({
            users: parsed ? parsed : []
        })
    }


    componentDidMount() {
        const checkUser = setTimeout(() => this.navToAuth(), 2000);
    }

    componentWillUnmount() {
        clearTimeout(checkUser)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Animated.Image style={{
                        opacity: this.state.removeAnim,
                        transform: [{
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }]
                    }}

                                    source={logo}>
                    </Animated.Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Splash;