import React from "react";
import {Dimensions, View, Text } from 'react-native'
import {createStackNavigator, createAppContainer,createDrawerNavigator} from "react-navigation";

//Screens
import Splash from '../Splash/Splash';
import Auth from '../Auth/Auth';
import AsyncTest from '../Auth/AsyncTest';
import Home from '../Home/Home';
import DetailPage from '../DetailPage/DetailPage';
import Drawer from '../../components/UI/Drawer/Drawer';


const WIDTH = Dimensions.get('window').width;




const DrawerConfig = {
    drawerWidth: WIDTH * 0.8,
    contentComponent: ({navigation})=> {
        return(<Drawer navigation={navigation}/>)
    }
}


const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home,
    }})

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                header:false,
            }
        },
    },
    DrawerConfig,
);

const AppNavigator = createStackNavigator({
        Splash: {
            screen: Splash,
            navigationOptions: {
                header: null,
            }
        },
        Auth: {
            screen: Auth,
            navigationOptions: {
                header: null,
            }
        },
        AsyncTest: {
            screen: AsyncTest,
            navigationOptions: {
                header: null,
            }
        },
        Home: {
            screen: DrawerNavigator,
            navigationOptions: {
                header:null,
            }
        },
        DetailPage: {
            screen: DetailPage,
        },
    },
    {
        initialRouteName: "Splash"
    },
    { headerMode: 'none'},

);




export default createAppContainer(AppNavigator);