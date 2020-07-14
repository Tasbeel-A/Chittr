import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet } from 'react-native';
class AccountAccess extends Component{
	//Hides header
	static navigationOptions = {
		headerShown: false,
}
//Creates Variables, and sets state as empty
	constructor(props){
		super(props);
		this.state = {
			given_name: '',
			family_name: '',
			email: '',
			password: '',
		};
	}
	//Account Creation Class
	AccountCreation() {
		if(this.checktext()){ //Applies text check function
			return fetch("http://10.0.2.2:3333/api/v0.0.5/user", //Makes a fetch from this link with user
			{
				method: 'POST', //Post Method delcared
				headers: {
					'Content-Type': 'application/json' //Content type declared in header
				},
				body: JSON.stringify({    //Data inputted as JSON format in body
					given_name: this.state.given_name,  //Form data applied in body for post request
					family_name: this.state.family_name,
					email: this.state.email,
					password: this.state.password
				})
			})
			.then(() => {
				Alert.alert("New Account Added");  //Alert to show account was created
			})
			.catch((error) => {
				Alert.alert('Error. Details invalid'); //Catches error, logs to console
				console.error(error);
			});
		}
	}

	//Validation for text inputs
	checktext = () => {
		const { given_name, family_name, email, password } = this.state //read only reference
		if (!given_name.length) { //Not statement checks length of input
			Alert.alert("Error. Empty First name") //Displays error, if empty is posted
			return false //Returns false boolean. Doesn't post data
		}
		else if (!family_name.length) {
			Alert.alert("Error. Empty Last Name")
			return false
		}
		else if (!email.length) {
			Alert.alert("Error. Empty Email")
			return false
		}
		else if (!password.length) {
			Alert.alert("Error. Empty Password")
			return false
		}
		return true //Returns true if all validation conditions are met
	}
	render(){
		return(
		<View style={styles.container}>
		<Text style={styles.header}> Create a new account </Text>

		<TextInput style={styles.textinput}
		placeholder="Enter your first name"
		placeholderTextColor='#fff'
		autoCapitalize="none"
		onChangeText={text => this.setState({ given_name: text })}
		/>

		<TextInput style={styles.textinput}
		placeholder="Enter your last name"
		placeholderTextColor='#fff'
		onChangeText={text => this.setState({ family_name: text })}
		/>

		<TextInput style={styles.textinput}
		placeholder="Enter your email"
		placeholderTextColor='#fff'
		onChangeText={text => this.setState({ email: text })}
		/>

		<TextInput style={styles.textinput}
		placeholder="Enter your password"
		placeholderTextColor='#fff'
		secureTextEntry={true}
		onChangeText={text => this.setState({ password: text })}
		/>


		<Button
		title = "Create Account"
		onPress={() => this.AccountCreation()}
		/>
		</View>
		);
	}
}

export default AccountAccess;

//Stylesheet begins here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#19985c',
		paddingLeft: 60,
		paddingRight: 60
  },
	header: {
		fontSize: 24,
		color: '#fff',
		paddingBottom: 10,
		marginBottom: 40,
		borderBottomColor: '#AFEEEE',
		borderBottomWidth: 1,
		fontFamily: "Hatten",
	},
	textinput: {
		height: 40,
		marginBottom: 30,
		color: '#fff',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1
	}

});
