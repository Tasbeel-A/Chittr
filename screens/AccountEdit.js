import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AccountEdit extends Component{
	static navigationOptions = {
 headerShown: false,
}
	//Constructor for props
	constructor(props){
		super(props);
		//Creates Variables, and sets state as empty
		this.state = {
			given_name: '',
			family_name: '',
			email: '',
			password: '',
			isLoading: true,
			ID: '',
			TOKEN: '',
			res: ''
		};
	}

	componentDidMount(){
		this.currentUser() //Gets data before render
	}
	//Validation for text inputs
	checktext = () => {
		const { given_name, family_name, email, password } = this.state //read only reference
		if (!given_name.length) { //Not statement checks length of input
			Alert.alert("Error. Empty First Name") //Displays error, if empty is posted
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
		else if (!password.lemgth) {
			Alert.alert("Error. Empty Password")
			return false
		}
		return true //Returns true to post data if all validation checks are met
	}
	//Current User function
	currentUser = async () => {
		try {
			let responseID = await AsyncStorage.getItem('id'); //Gets User ID item from asyncstorage
			let responseToken = await AsyncStorage.getItem('token'); //Gets Token from asyncstorage

			this.setState({
				ID: responseID,  //Sets ID variable to asynstorage response
				TOKEN: responseToken //Sets token variable to asyncstorage response
			});
			console.debug(this.state.ID); //Debug console test
			console.debug(this.state.TOKEN);
		}catch(e){

			console.log("Error" + e); //Catch error and logs the error
		}
	}
	//Patch Function
	patchRequest(){
		if(this.checktext()){
			try{
				fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.ID, //Link that patches based on the user ID
				{
					method: 'PATCH', //Method patch to update account
					headers: { //Defines header for in patch request
						'Content-Type': 'application/json',
						'X-Authorization': "" + this.state.TOKEN  //Token assigned to authorization in header
					},
					body: JSON.stringify({ //Adds Json string to body of patch request
						given_name: this.state.given_name, //Post new data which is added to form
						family_name: this.state.family_name,
						email: this.state.email,
						password: this.state.password
					})
				});
				this.props.navigation.navigate('UserAccount') //Navigates back to user account page
				Alert.alert("Account has been updated") //Displays Success message
			}catch(f) {
				console.log(f); //Catches error and logs to console
			}
		}
	}

		render() {
			return (
			<View style={styles.container}>
			<Text style={styles.header}> Edit Account </Text>
			<TextInput style={styles.textinput}
			placeholder="Enter new First Name"
			placeholderTextColor = '#fff'
			autoCapitalize = "none"
			onChangeText={text => this.setState({ given_name: text })}
			/>

			<TextInput style={styles.textinput}
			placeholder="Enter new Last Name"
			autoCapitalize = "none"
			placeholderTextColor = '#fff'
			onChangeText={text => this.setState({ family_name: text })}
			/>

			<TextInput style={styles.textinput}
			placeholder="Enter new Email address"
			autoCapitalize = "none"
			placeholderTextColor = '#fff'
			onChangeText={text => this.setState({ email: text })}
			/>

			<TextInput style={styles.textinput}
			placeholder="Enter new password"
			autoCapitalize = "none"
			placeholderTextColor = '#fff'
			onChangeText={text => this.setState({ password: text })}
			/>
			<View style={styles.buttonContainer}>
			<Button
			title="Save Details"
			onPress = {() => this.patchRequest()}
			/>
			</View>

			<View style={styles.buttonContainer2}>
			<Button
			title="Back"
			onPress = {() => this.props.navigation.navigate('UserAccount') + Alert.alert('Returned to User Profile')}

			/>
			</View>
			<Image style={styles.imagereposition}
					source={require('./assets/Avatar.png')}
					/>
			</View>
			);
		}
	}


export default AccountEdit

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
	},
	buttonContainer: {
    position: 'absolute',
    top: 500,
    left: 110,
		width: 200,
		height: 100
  },
	buttonContainer2: {
    position: 'absolute',
    top: 600,
    left: 110,
		width: 200,
		height: 100
  },
	imagereposition: {
		position: 'absolute',
		top:50,
		left:175,
		height:70,
		width:70
	}

});
