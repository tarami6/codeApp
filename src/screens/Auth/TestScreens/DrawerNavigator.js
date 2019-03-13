import React from 'react';
import {Dimensions } from 'react-native'
import {createDrawerNavigator, createAppContainer} from 'react-navigation';

const WIDTH = Dimensions.get('window').width;

import HomeScreen from './HomeScreen';
import LinksScreen from './LinksScreen';
import SettingsScreen from './SettingsScreen';



const DrawerConfig = {
    drawerWidth: WIDTH * 0.8
}

const DrawerNavigator = createDrawerNavigator(
    {
        HomeScreen: {
            screen: HomeScreen
        },
        LinksScreen: {
            screen: LinksScreen
        },
        SettingsScreen: {
            screen: SettingsScreen
        },
    },
    DrawerConfig
);

export default createAppContainer(DrawerNavigator)