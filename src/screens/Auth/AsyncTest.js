import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage,StyleSheet, Button} from 'react-native';
import { createDrawerNavigator } from 'react-navigation';



class AsyncTest extends Component {

    constructor(props){
        super(props)
        this.state = {
            users : [],
            counter: 0,
            currentUser: {},
            visible: false,
        }
    }


    saveData = async ()=>{
        let obj = {
            name: `John Doe ${this.state.counter}` ,
            email: 'tes@gmail.com',
            city: 'Haifa'
        }
         await this.setState(prevState => {
            const arrUser = [...prevState.users,obj]
            return {
                ...prevState,
                users: arrUser
            }
        })
        AsyncStorage.setItem('user', JSON.stringify(this.state.users))
    }

    showData= async () =>{
        try {
            let user = await   AsyncStorage.getItem('user');
        }
        catch (err) {
            alert(err);
        }
    }

    getUsers = async () =>{
        let usersList = await   AsyncStorage.getItem('user');
        let parsed = JSON.parse(usersList)
        this.setState({
            users: parsed ? parsed : []
        })
    }
    componentWillMount() {
        // this.getUsers()
    }

    deleteData = async () =>{
        try {
            let keys = await   AsyncStorage.getAllKeys();
            let user = await   AsyncStorage.multiRemove(keys);
            this.setState({
                users: []
            })
        }
        catch (err) {
            alert(err);
        }
    }
    findUser = (usersArr) => {
        const targetObject = usersArr.find(user => user.name === 'John Doe 1');
        this.setState(prevState => {
            return{
                ...prevState,
                currentUser: targetObject
            }
        })
    }



    render() {

        return (
            <View>
                <TouchableOpacity onPress={this.saveData}>
                    <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showData}>
                    <Text>Show</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deleteData}>
                    <Text>Del</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.findUser(this.state.users)}>
                    <Text>Find </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Text>Drawer </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default  AsyncTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});


