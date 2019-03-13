import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Image, Text, TextInput, ScrollView, Dimensions} from 'react-native';
import {AsyncStorage} from 'react-native';

//Components
import ButtonWithBackground from '../../components/UI/Button/ButtonWithBackground/ButtonWithBackground';

// Func
import validate from '../../utility/validation'

// Img
import backGroundImage from '../../assets/img/reactBackGround.jpg'
import logo from '../../assets/img/logodark.png'

// redux
import {connect} from "react-redux";
import {editUser} from '../../store/actions/action'

//When switching between login and signUp we initialize the controls state
const initialState = {
    userName: {
        value: '',
        valid: false,
        validationRules: {
            minLength: 2
        },
        touched: false,
        error: {
            type: "UserName must contain at  least 2 characters"
        }
    },
    password: {
        value: '',
        valid: false,
        validationRules: {
            minLength: 2
        },
        touched: false,
        error: {
            type: "Password must contain at  least 2 characters"
        }
    },
    confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
            equalTo: "password"
        },
        touched: false,
        error: {
            type: "Confirm Password must match to password"
        }
    },
    firstName: {
        value: '',
        valid: false,
        validationRules: {
            minLength: 2
        },
        touched: false,
        error: {
            type: "First name must contain at  least 2 characters"
        }
    },
    lastName: {
        value: '',
        valid: false,
        validationRules: {
            minLength: 2
        },
        touched: false,
        error: {
            type: "Last name must contain at  least 2 characters"
        }
    }
}

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authMode: "login",
            controls: {
                userName: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "UserName must contain at  least 2 characters"
                    }
                },
                password: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "Password must contain at  least 2 characters"
                    }
                },
                confirmPassword: {
                    value: '',
                    valid: false,
                    validationRules: {
                        equalTo: "password"
                    },
                    touched: false,
                    error: {
                        type: "Confirm Password must match to password"
                    }
                },
                firstName: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "First name must contain at  least 2 characters"
                    }
                },
                lastName: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "Last name must contain at  least 2 characters"
                    }
                },
            },
            users: [],
            errors: [],
            visible: false,
            currentUser: {}
        }
        this.chekingErrorsInFrom = this.chekingErrorsInFrom.bind(this)
    }

    //Validation
    updateInputState = (key, value) => {
        let newValue = value;
        let connectedValue = {};
        //connecting confirm password
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: newValue
            }
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password'
                            ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: newValue.trim(),
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    }

    onSubmitUser = async () => {
        await this.chekingErrorsInFrom()
        let isValid = this.chekingErrorsArray()
        if (isValid) {
            const newUser = {
                userName: this.state.controls.userName.value,
                password: this.state.controls.password.value,
                firstName: this.state.controls.firstName.value,
                lastName: this.state.controls.lastName.value,
            }
            this.saveData(newUser)
        }
    }

    //Checking if thers errors
    chekingErrorsInFrom = () => {
        let errorsArr = [];
        let inputs = [];
        let obj = this.state.controls;
        // On login state
        if (this.state.authMode === "login") {
            if (!this.state.controls.userName.valid) {
                errorsArr.push(this.state.controls.userName.error.type)
                inputs.push('userName')
            }
            if (!this.state.controls.password.valid) {
                errorsArr.push(this.state.controls.password.error.type)
                inputs.push('password')
            }
        } // On signup state
        else if (this.state.authMode === "signup") {
            //looping on controls to see if there is invalid fields
            Object.keys(obj).forEach(function (key) {
                if (!obj[key].valid) {
                    errorsArr.push(obj[key].error.type)
                    inputs.push(key)
                }
            });
        }
        this.updateKeysErrors(inputs);
        this.updateErrors(errorsArr)
    };

    updateErrors = (errorsArr) => {
        this.setState({
            errors: [...errorsArr]
        })
    }

    //Set red border around inputs
    updateKeysErrors = (inputs) => {
        for (let i in inputs) {
            let col = inputs[i];
            this.setState(prevState => {
                return {
                    ...prevState,
                    controls: {
                        ...prevState.controls,
                        [col]: {
                            ...prevState.controls[col],
                            touched: true
                        }

                    }
                }

            })
        }
    }

    // checking if we can submit or not
    chekingErrorsArray = () => {
        if (this.state.errors.length === 0) {
            return true
        }
        return false
    }


    //Saving Data to asyncStorage
    saveData = async (user) => {
        const newUser = user;
        await this.setState(prevState => {
            const arrUser = [...prevState.users, newUser]
            return {
                users: arrUser
            }
        })
        AsyncStorage.setItem('user', JSON.stringify(this.state.users))
        this.switchAuthModeHandler()
    }

    //On login state login button checking validation if all valid we looking for user in users array
    loginHandler = async () => {
        let noUser = null;
        await this.chekingErrorsInFrom()
        let isValid = this.chekingErrorsArray()
        if (isValid) {
            const userArr = this.state.users
            const user = userArr.filter(user => {
                return user.userName === this.state.controls.userName.value && user.password === this.state.controls.password.value
            })
            if (user.length > 0) {
                let curUser = user[0]
                this.setState({
                    currentUser: curUser
                })
                this.props.navigation.navigate("Home")
                this.props.onLogin(curUser)
            } else {
                this.setState({
                    errors: ["Sorry user not exists Please sign up"]
                })
                 noUser = setTimeout(() => this.switchAuthModeHandler(), 1000);
            }
        }
    }

    // get users from AsyncStorage
    getUsers = async () => {
        let usersList = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(usersList)
        console.log("users", parsed)
        this.setState({
            users: parsed ? parsed : []
        })
    }

    // get users from AsyncStorage
    componentWillMount() {
        this.getUsers()
    }

    //Swipe between login and signUp
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                authMode: prevState.authMode === "login" ? "signup" : "login",
                controls: initialState,
                errors: []
            }
        })
    }

    // unmount timers
    componentWillUnmount() {
        this.clearIntervalFromLogin()
    }

    clearIntervalFromLogin = () =>{
        if (this.state.errors[0] === "Sorry user not exists Please sign up" ) {
            clearTimeout(noUser)
        }
    }

    render() {
        let signUp = null;
        // Showing signup fields if user or state changed to signup
        if (this.state.authMode === "signup") {
            signUp = (
                <View>
                    <View>
                        <TextInput
                            ref={(input) => {
                                this.confirmPassword = input;
                            }}
                            onSubmitEditing={() => {
                                this.firstName.focus();
                            }}
                            returnKeyType={"next"}
                            placeholder={"Confirm Password"}
                            style={[styles.input01,
                                !this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched ? styles.invalid : null]}
                            value={this.state.controls.confirmPassword.value}
                            onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                            secureTextEntry
                        />
                        {!this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched ?
                            <Text style={{color:'red'}}>{this.state.controls.confirmPassword.error.type}</Text> : null
                        }
                    </View>
                    <View>
                        <TextInput
                            ref={(input) => {
                                this.firstName = input;
                            }}
                            onSubmitEditing={() => {
                                this.lastName.focus();
                            }}
                            returnKeyType={"next"}
                            placeholder={"First Name"}
                            style={[styles.input01,
                                !this.state.controls.firstName.valid && this.state.controls.firstName.touched ? styles.invalid : null]}
                            value={this.state.controls.firstName.value}
                            onChangeText={(val) => this.updateInputState('firstName', val)}
                            autoCapitalize="words"
                        />
                        {!this.state.controls.firstName.valid && this.state.controls.firstName.touched ?
                            <Text style={{color:'red'}}>{this.state.controls.firstName.error.type}</Text> : null
                        }
                    </View>
                    <View>
                        <TextInput
                            ref={(input) => {
                                this.lastName = input;
                            }}
                            onSubmitEditing={() => {
                                this.onSubmitUser()
                            }}
                            placeholder={"Last Name"}
                            style={[styles.input01,
                                !this.state.controls.lastName.valid && this.state.controls.lastName.touched ? styles.invalid : null]}
                            value={this.state.controls.lastName.value}
                            onChangeText={(val) => this.updateInputState('lastName', val)}
                            valid={this.state.controls.lastName.valid}
                            touched={this.state.controls.lastName.touched}
                            autoCapitalize="words"
                        />
                        {!this.state.controls.lastName.valid && this.state.controls.lastName.touched ?
                            <Text style={{color:'red'}}>{this.state.controls.lastName.error.type}</Text> : null
                        }
                    </View>
                </View>
            )
        }
        return (
            <ImageBackground style={styles.backgroundImage} source={backGroundImage}>
                <ScrollView style={{flex: 1,}}>
                    <View style={[styles.container, this.state.authMode === 'login' ? {height: Dimensions.get('window').height * 0.7} : null]}>
                        <View style={styles.logoContainer}>
                            <Image source={logo}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <ButtonWithBackground color={'#29aaf4'} onPress={this.switchAuthModeHandler}>
                                Switch to {this.state.authMode === "login" ? "Sign Up" : " Login"}
                            </ButtonWithBackground>
                            <View>
                                <TextInput
                                    placeholder={"User Name"}
                                    style={[styles.input01,
                                        !this.state.controls.userName.valid && this.state.controls.userName.touched ? styles.invalid : null]}
                                    value={this.state.controls.userName.value}
                                    onChangeText={(val) => this.updateInputState('userName', val)}
                                    valid={this.state.controls.userName.valid}
                                    touched={this.state.controls.userName.touched}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => {
                                        this.password.focus();
                                    }}
                                    ref={(input) => {
                                        this.userName = input;
                                    }}
                                />
                                {!this.state.controls.userName.valid && this.state.controls.userName.touched ?
                                    <Text style={{color:'red'}}>{this.state.controls.userName.error.type}</Text> : null
                                }
                            </View>
                            <View>
                                <TextInput
                                    ref={(input) => {
                                        this.password = input;
                                    }}
                                    onSubmitEditing={this.state.authMode === 'login' ? () => this.loginHandler() : () => {
                                        this.confirmPassword.focus();
                                    }}
                                    returnKeyType={this.state.authMode === 'login' ?"done" : "next"}
                                    placeholder={"Password"}
                                    style={[styles.input01,
                                        !this.state.controls.password.valid && this.state.controls.password.touched ? styles.invalid : null]}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched}
                                    refs={"password"}
                                    secureTextEntry
                                />
                                {!this.state.controls.password.valid && this.state.controls.password.touched ?
                                    <Text style={{color:'red'}}>{this.state.controls.password.error.type}</Text> : null
                                }
                            </View>
                            {signUp}
                        </View>
                        <View style={styles.submitContainer}>
                            {this.state.authMode === 'signup' ?
                                <ButtonWithBackground
                                    color={'#29aaf4'}
                                    onPress={this.onSubmitUser}
                                >
                                    Submit
                                </ButtonWithBackground>
                                :
                                <ButtonWithBackground
                                    color={'#29aaf4'}
                                    onPress={this.loginHandler}
                                >
                                    Login
                                </ButtonWithBackground>
                            }
                        </View>

                    </View>
                    {this.state.errors.length > 0 ?
                        <View style={{width: '100%', alignItems: 'center', paddingBottom: 10}}>
                            <View style={{
                                width: '80%',
                                backgroundColor: 'grey',
                                paddingBottom: 10,
                                borderRadius: 5,
                                alignItems: 'center'
                            }}>
                                {this.state.errors.map((item, i) => (
                                    <Text key={i} style={{color: '#fff', fontSize: 18, padding: 5}}>{item} </Text>
                                ))}
                            </View>
                        </View> : null}
                </ScrollView>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        height: Dimensions.get("window").height * 0.9 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 0.5,
        justifyContent: 'center',
        marginTop: 30,
    },
    inputContainer: {
        width: "80%",
        flex: 3,
        justifyContent: 'center',
    },
    input01: {
        backgroundColor: '#fff',
        borderColor: '#bbb',
        width: "100%",
        borderWidth: 1,
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5
    },
    invalid: {
        borderColor: 'red',
        borderWidth: 1
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
    },
    submitContainer: {
        flex: 0.5
    },
    landscapePassWordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPassWordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapepassWordView: {
        width: '45%',
    },
    portraitWordView: {
        width: '100%',
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(editUser(authData))
    }
}

export default connect(null, mapDispatchToProps)(Auth);