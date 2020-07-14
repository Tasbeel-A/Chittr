import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import UserAccount from './UserAccount'
import LoginScreen from './LoginScreen'
import AccountEdit from './AccountEdit'
import AddChits from './AddChits'
import ChitScreen from './ChitScreen'
import Followers from './Followers'
import Unfollow from './Unfollow'
import FollowersFollowing from './FollowersFollowing'
import SearchUser from './SearchUser'

//Creates buttom navigation

const UserTab = createBottomTabNavigator(
	{
		UserAccount:{
			screen: UserAccount,
		},
		Follower:{
			screen: FollowersFollowing,
		},
		ChitScreen:{
			screen: ChitScreen,
		} // add, for more pages
	})

	//Creates stack navigation
const UserStackNav = createStackNavigator({
	UserTab: UserTab,

	AccountEdit: {
		screen: AccountEdit,
		navigationOptions: () => {
			return{
				headerShown: false,
			}
		}
	},
	AddChits: {
		screen: AddChits,
		navigationOptions: () => {
			return{
				headerShown: false,
			}
		}
	},
	Followers: {
		screen:Followers,
		navigationOptions: () => {
			return{
				headerShown: false,
			}
		}
	},
	Unfollow:{
		screen:Unfollow,
		navigationOptions: () => {
			return{
				headerShown: false,
			}
		}
	},
	SearchUser:{
		screen:SearchUser
	}
})

const AppContainer2 = createAppContainer(UserStackNav)
export default AppContainer2
