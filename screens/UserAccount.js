import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserAccount extends Component{
	static navigationOptions = {
		headerShown: false,
}
	//Logout async. Clears async storage when logout is pressed. Sends user back to LoginScreen
	logout = async() =>{
		await AsyncStorage.clear()
		this.props.navigation.navigate('LoginScreen')
	}

	render(){
		return(
			<View style={styles.container}>
			<Text style={styles.header}>My Account</Text>

			<View style={styles.buttonEdit}>
			<Text style={styles.text}>Edit your account details</Text>
			<Button
			title="Edit your Account"
			onPress={() => this.props.navigation.navigate('AccountEdit')}
			/>
			</View>

			<View style={styles.buttonAdd}>
			<Text style={styles.text3}>  Post a Chit</Text>
			<Button
			title="AddChits"
			onPress={() => this.props.navigation.navigate('AddChits')}
			/>
			</View>

			<View style={styles.buttonFollow}>
			<Text style={styles.text3}>Follow a User</Text>
			<Button
			title="Followers"
			onPress={() => this.props.navigation.navigate('Followers')}
			/>
			</View>

			<View style={styles.buttonUnfollow}>
			<Text style={styles.text2}>Unfollow a User</Text>
			<Button
			title="Unfollow"
			onPress={() => this.props.navigation.navigate('Unfollow')}
			/>
			</View>

			<View style={styles.buttonLogout}>
			<Text style={styles.text}>Logout of your account</Text>
			<Button
			title="Logout"
			onPress={() => this.logout()}/>
			</View>
			<View style={styles.buttonSearch}>
			<Text style={styles.text}>Search for user details</Text>
			<Button
			title="Search Query"
			onPress={() => this.props.navigation.navigate('SearchUser')}
			/>
			</View>
			<Image style={styles.imagereposition}
			source={require('./assets/Avatar.png')}
			/>

			</View>


		);
	}

}
export default UserAccount;

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#19985c',
	},
	header: {
		fontSize: 24,
		color: '#fff',
		paddingBottom: 10,
		marginBottom: 40,
		borderBottomColor: '#AFEEEE',
		borderBottomWidth: 1,
		fontFamily: "Hatten",
		textAlign: 'center'
	},
	buttonEdit: {
		position: 'absolute',
		top: 155,
		left: 110,
		width: 200,
		height:100
	},
	buttonAdd: {
		position: 'absolute',
		top: 220,
		left: 110,
		width: 200,
		height: 100
	},
	buttonFollow: {
		position: 'absolute',
		top: 290,
		left: 110,
		width: 200,
		height: 100,
	},
	buttonUnfollow: {
		position: 'absolute',
		top: 360,
		left: 110,
		width: 200,
		height: 100
	},
	buttonSearch: {
		position: 'absolute',
		top: 430,
		left: 110,
		width: 200,
		height: 100,
	},
	buttonLogout: {
		position: 'absolute',
		top: 500,
		left: 110,
		width: 200,
		height: 100,
	},
	text: {
		textAlign: 'center',
		fontSize: 15,
		color:'#fff',
		position: 'absolute',
		top: -25,
		left: 25,
	},
	text2: {
		textAlign: 'center',
		fontSize: 15,
		color:'#fff',
		position: 'absolute',
		top: -25,
		left: 40,
	},
	text3: {
		textAlign: 'center',
		fontSize: 15,
		color:'#fff',
		position: 'absolute',
		top: -25,
		left: 50,
	},
	imagereposition: {
		position: 'absolute',
		top:50,
		left:175,
		height:70,
		width:70
	}
})
