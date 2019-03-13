import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet, Dimensions, TextInput} from 'react-native';
import { I18nManager } from 'react-native';

//FUnc
import validate from '../../../utility/validation'

//Redux
import {connect} from "react-redux";
import {editUser,changeLanguage} from '../../../store/actions/action';

import ButtonWithBackground from "../../../components/UI/Button/ButtonWithBackground/ButtonWithBackground";


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


class Drawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controls: {
                firstName: {
                    value: '',
                    valid: true,
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
                    valid: true,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "First name must contain at  least 2 characters"
                    }
                },
                phone: {
                    value: '',
                    valid: true,
                    validationRules: {
                        phoneValidator: true
                    },
                    touched: false,
                    error: {
                        type: "Phone must be israel legit number"
                    }
                },
                fax: {
                    value: '',
                    valid: true,
                    validationRules: {
                        faxValidator: true
                    },
                    touched: false,
                    error: {
                        type: "Fax must be a number longer 7 "
                    }
                },
                work: {
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "Work name must contain at least 2 characters"
                    }
                },
                email: {
                    value: '',
                    valid: true,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false,
                    error: {
                        type: "Email must be legit email"
                    }
                },
                address: {
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "Address must contain at  least 2 characters"
                    }
                },
                city: {
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 2
                    },
                    touched: false,
                    error: {
                        type: "City must contain at  least 2 characters"
                    }
                },
                age: {
                    value: '',
                    valid: true,
                    validationRules: {
                        ageValidator: true
                    },
                    touched: true,
                    error: {
                        type: "Age must be Mitzva age grater then 12 and less then 120"
                    }
                },
            },
            language: '',

        }

    }

    componentDidMount() {
        this.extractPropsToState();
        I18nManager.forceRTL(false);
    }

    componentWillReceiveProps(nextProps){
        this.extractPropsToState(nextProps.user);
    }

    extractPropsToState(store = this.props.user) {

        const {firstName, lastName, phone, fax, work, email, address, city, age} = store
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    firstName: {
                        ...prevState.controls.firstName,
                        value: firstName
                    },
                    lastName: {
                        ...prevState.controls.lastName,
                        value: lastName
                    },
                    phone: {
                        ...prevState.controls.phone,
                        value: phone
                    },
                    fax: {
                        ...prevState.controls.fax,
                        value: fax
                    },
                    work: {
                        ...prevState.controls.work,
                        value: work
                    },
                    email: {
                        ...prevState.controls.email,
                        email: email
                    },
                    address: {
                        ...prevState.controls.address,
                        value: address
                    },
                    city: {
                        ...prevState.controls.city,
                        value: city
                    },
                    age: {
                        ...prevState.controls.age,
                        value: age
                    },
                },
                language: store.language
            }
        })
    }

    //Validation
    updateInputState = (key, value) => {
        let newValue = value.trim();


        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: newValue,
                        valid: validate(newValue, prevState.controls[key].validationRules) || ((key === 'firstName' || key === 'lastName' ) ?  false : newValue.length === 0) ,
                        touched: true
                    }
                }
            }
        })
    }

    onSubmitUser = () => {
        let arrValid = [];
        let obj = this.state.controls;
        let score = 0;
        let isValid = true;
        Object.keys(obj).forEach( (key) => {
            arrValid.push(key)
        })
        for(let i = 0; i < arrValid.length; i++){
            if(!this.state.controls[arrValid[i]].valid){
                isValid = false;
                this.focusOnInput(arrValid[i])
                break;
            }
        }
        if(isValid){
            //saveToStore
            this.saveUserToStore(this.state.controls)
            this.props.navigation.closeDrawer()
        }

    }

    saveUserToStore = (user) =>{
        let upDatedUser = {};
        Object.keys(user).forEach(key => {
            upDatedUser[key] = this.state.controls[key].value
        })
        this.props.upDateUser(upDatedUser);
    }

    //Focus on input
    focusOnInput= (val) =>{
        this[val].focus()
        this.setState({
            errors: []
        })
    }

    //ChangeLanguage
    changeLanguage = () =>{
        if(this.state.language === 'ENG'){
            this.setState({
                language: 'HEB'
            })
            this.props.changeStoreLanguage('HEB')
        } else {
            this.setState({
                language: 'ENG'
            })
            this.props.changeStoreLanguage('ENG')
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{width: '100%',}}>
                    <View style={styles.inputContainer}>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.firstName = input;
                                }}
                                onSubmitEditing={() => {
                                    this.lastName.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.firstName.value ? this.state.controls.firstName.value : "First Name"}
                                value={this.state.controls.firstName.value}
                                style={[styles.input01,
                                    !this.state.controls.firstName.valid && this.state.controls.firstName.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('firstName', val)}
                            />
                            {!this.state.controls.firstName.valid && this.state.controls.firstName.touched ?
                                <Text>{this.state.controls.firstName.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.lastName = input;
                                }}
                                onSubmitEditing={() => {
                                    this.phone.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.lastName.value ? this.state.controls.lastName.value : "Last Name"}
                                value={this.state.controls.lastName.value}
                                style={[styles.input01,
                                    !this.state.controls.lastName.valid && this.state.controls.lastName.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('lastName', val)}
                            />
                            {!this.state.controls.lastName.valid && this.state.controls.lastName.touched ?
                                <Text>{this.state.controls.lastName.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.phone = input;
                                }}
                                onSubmitEditing={() => {
                                    this.fax.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.phone.value ? this.state.controls.phone.value : "Phone"}
                                value={this.state.controls.phone.value}
                                style={[styles.input01,
                                    !this.state.controls.phone.valid && this.state.controls.phone.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('phone', val)}
                                keyboardType={'phone-pad'}
                            />
                            {!this.state.controls.phone.valid && this.state.controls.phone.touched ?
                                <Text>{this.state.controls.phone.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.fax = input;
                                }}
                                onSubmitEditing={() => {
                                    this.work.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.fax.value ? this.state.controls.fax.value : "Fax"}
                                value={this.state.controls.fax.value}
                                style={[styles.input01,
                                    !this.state.controls.fax.valid && this.state.controls.fax.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('fax', val)}
                                keyboardType={'phone-pad'}
                            />
                            {!this.state.controls.fax.valid && this.state.controls.fax.touched ?
                                <Text>{this.state.controls.fax.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.work = input;
                                }}
                                onSubmitEditing={() => {
                                    this.email.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.work.value ? this.state.controls.work.value : "Work"}
                                value={this.state.controls.work.value}
                                style={[styles.input01,
                                    !this.state.controls.work.valid && this.state.controls.work.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('work', val)}

                            />
                            {!this.state.controls.work.valid && this.state.controls.work.touched ?
                                <Text>{this.state.controls.work.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.email = input;
                                }}
                                onSubmitEditing={() => {
                                    this.address.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.email.value ? this.state.controls.email.value : "Email"}
                                value={this.state.controls.email.value}
                                style={[styles.input01,
                                    !this.state.controls.email.valid && this.state.controls.email.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('email', val)}

                            />
                            {!this.state.controls.email.valid && this.state.controls.work.touched ?
                                <Text>{this.state.controls.email.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.address = input;
                                }}
                                onSubmitEditing={() => {
                                    this.city.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.address.value ? this.state.controls.address.value : "Addres"}
                                value={this.state.controls.address.value}
                                style={[styles.input01,
                                    !this.state.controls.address.valid && this.state.controls.address.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('address', val)}
                            />
                            {!this.state.controls.address.valid && this.state.controls.address.touched ?
                                <Text>{this.state.controls.address.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.city = input;
                                }}
                                onSubmitEditing={() => {
                                    this.age.focus();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.city.value ? this.state.controls.city.value : "City"}
                                value={this.state.controls.city.value}
                                style={[styles.input01,
                                    !this.state.controls.city.valid && this.state.controls.city.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('city', val)}
                            />
                            {!this.state.controls.email.valid && this.state.controls.city.touched ?
                                <Text>{this.state.controls.city.error.type}</Text> : null
                            }
                        </View>
                        <View>
                            <TextInput
                                ref={(input) => {
                                    this.age = input;
                                }}
                                onSubmitEditing={() => {
                                    this.onSubmitUser();
                                }}
                                textAlign={this.state.language === 'HEB'? 'right' : 'left'}
                                placeholder={this.state.controls.age.value ? this.state.controls.age.value : "Age"}
                                value={this.state.controls.age.value}
                                style={[styles.input01,
                                    !this.state.controls.age.valid && this.state.controls.age.touched ? styles.invalid : null]}
                                onChangeText={(val) => this.updateInputState('age', val)}
                            />
                            {!this.state.controls.age.valid && this.state.controls.age.touched ?
                                <Text>{this.state.controls.age.error.type}</Text> : null
                            }
                        </View>
                        <View style={{width: '40%', alignSelf: 'center'}}>
                            <ButtonWithBackground
                                color={'#29aaf4'}
                                onPress={this.onSubmitUser}
                            >
                                Save
                            </ButtonWithBackground>
                        </View>
                        <View style={{flex: 1,  flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 15 }}>
                            <View style={{marginRight: 35}}>
                                <Text>Change language to</Text>
                            </View>
                            <ButtonWithBackground
                                color={'#29aaf4'}
                                onPress={this.changeLanguage}
                            >
                                {this.state.language === 'ENG' ? 'HEB' : 'ENG' }
                            </ButtonWithBackground>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        paddingTop: 30,
        width: "80%",
        alignSelf: 'center'
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
})

const mapStateToProps = state => {
    return {
        user: state.mainStore.user,
        language: state.mainStore.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        upDateUser: (user) => dispatch(editUser(user)),
        changeStoreLanguage: (language) => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Drawer);
