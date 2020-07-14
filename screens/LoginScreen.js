import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component{
	static navigationOptions = {
 headerShown: false,
}
	//Contructor props
	constructor(props) {
		super(props);
		//Sets login and password and response
		this.state = {
			loginEmail: '',
			loginPass: '',
			res: ''
		};
	}
	//Token Response for ID and Token
	TokenResponse = async () => {  //user_token
		try{
			//Sets an ID
			await AsyncStorage.setItem('id', "" + this.state.res.id); //Sets response ID from async storage
			console.debug(this.state.res.id);
			await AsyncStorage.setItem('token', "" + this.state.res.token); //Sets item in asyncstorage as token
			console.debug(this.state.res.token);
		}catch (exception){
			console.log("AsyncStorage Error. Check Login token id reply",exception);
		}
	}
	//Checks Loginemail and Login Pass validation
	checktext = () => {
		if (this.state.loginEmail != ''){ //Checks for state being empty
			if (this.state.loginPass != ''){ //Checks for state pass being empty
				Alert.alert('Sucessful Login')
				return true
			}else{
				Alert.alert('Please enter your password'); //False and doesnt post. Alert error for correct response
				return false
			}
		} else{
			Alert.alert('Please enter your email'); //Returns false doesnt post
			return false
		}
	};


	logintoaccount(){
		if(this.checktext()){
			return fetch("http://10.0.2.2:3333/api/v0.0.5/login", //Post to backend
			{
				method: 'POST',
				headers:{'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.loginEmail, //Posts login email
					password: this.state.loginPass //Posts login pass as json
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					res:{
						"token": responseJson.token, //sets token response
						"id": responseJson.id
					}
				});
				this.props.navigation.navigate('UserAccount')
				this.TokenResponse(); //runs Token response
				console.log("Login reply: ",this.state.res);
			})
			.catch((e) => {
				Alert.alert("Incorrect login details") //Catches error
				console.error(e);
			});
		}
	}
	render(){
		return(
			<View style={styles.container}>
			<Text style={styles.header}>Login</Text>
			<TextInput style={styles.textinput}
			placeholder="Email adress"
			autoCapitalize="none"
			onChangeText={text => this.setState({ loginEmail: text })}
			/>
			<TextInput style={styles.textinput}
			placeholder="Password"
			autoCapitalize="none"
			secureTextEntry
			onChangeText={text => this.setState({ loginPass: text })}
			/>
			<Button
			title="Log in"
			onPress={() => this.logintoaccount()}
			/>
			</View>

		);
	}

}
export default LoginScreen;
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
})
