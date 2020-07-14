import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/HomeScreen'
import AccountAccess from './screens/AccountAccess'
import ChitScreen from './screens/ChitScreen'
import LoginScreen from './screens/LoginScreen'
import UserHomeScreen from './screens/UserHomeScreen'

const AppTabNav = createBottomTabNavigator({
	Home:{
		screen: HomeScreen,
		navigationOptions: () => {
			return{
				headerShown: false,
			}
		}
	},
	Account:{
		screen: AccountAccess,
		navigationOptions: {
      headerShown: false,
    },
	},
	Chit:{
		screen: ChitScreen,
		navigationOptions: {
      headerShown: false,
    },
	}
});

const AppStackNav = createStackNavigator({
	AppTabNav: AppTabNav,
	LoginScreen:{
		screen: LoginScreen,
		navigationOptions: () => {
			return{
				headerShown: false,
			}
		}
	},
	UserLogin:{
		screen:UserHomeScreen,
		navigationOptions: () => {
      return {
        headerShown: false
      }
    }
	}

})

const AppContainer = createAppContainer(AppStackNav)


export default AppContainer;
