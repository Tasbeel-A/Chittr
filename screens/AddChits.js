import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, FlatList, StyleSheet, Image, PermissionAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

class AddChits extends Component{
	//Disables header
	static navigationOptions = {
		header: false
	}
	//Props constuctor
	constructor(props) {
		 super(props);
		 //Set empty and null states for variables
		 this.state = {
				ChitData: '',
				TOKEN: '',
				ID: '',
				timeStamp: 1,
				locationPermission: false,
				location: {
					latitude: 0.0,
					longitude: 0.0,
				},
		 };
	}

	//Gets token and ID for current user from Asyncstorage
	getToken = async () => {
		 try {
				let responseToken = await AsyncStorage.getItem('token'); //Gets token from asyncstorage
				let responseID = await AsyncStorage.getItem('id'); //Gets ID from asyncstorage
				let date = new Date().getTime(); //Sets data variable a new time object
				this.setState({ //Sets states for variables as result
					 TOKEN: responseToken,
					 ID: responseID,
					 timeStamp: date,
				});
		 } catch (error) {
				console.log("GET TOKEN ERROR : " + error); //Catches and logs error
		 }
	}


	//Request location permission
	findCoordinates = () => {
		if(!this.state.locationPermission){
			this.state.locationPermission = requestLocationPermission();
		}
		//Gets current position of device for location
		Geolocation.getCurrentPosition(
			(position) => {

				this.state.location = postion;
			},
			(error) => {
				Alert.alert(error.message)
			},
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000
			}
		);
	};

	SaveDraft = async() => {
		Alert.alert('Chit saved to draft');
		try{
			const jsondata = await AsyncStorage.setItem(draft, JSON.stringify(ChitData));
			return jsondata
		} catch (error){
			console.log(error.message);
		}
	}

	//Checks if data has been enterd into chit
	checktext = () => {
		const { ChitData } = this.state
		if (!ChitData.length) {
			Alert.alert("Error. Chit Data")
			return false
		} else {
			return true
		}
	}

	//Post Request for Chit
	POSTrequest() {
			if(this.checktext()){ //Validation check for chit
		 return fetch("http://10.0.2.2:3333/api/v0.0.5/chits", //Post is sent to this link
				{
					 method: 'POST', //Post method
					 headers: {
						   Accept: 'application/json',
							'Content-Type': 'application/json',
							'X-Authorization': this.state.TOKEN, //Authorize token
					 },
					 body: JSON.stringify({  //Body Json data creation
							timestamp: this.state.timeStamp, //All json data
							chit_content: this.state.ChitData,
							location:{
								latitude: this.state.location.latitude,
								longitude: this.state.location.longitude,
							}
					 })
				})
				.then((response) => response.json())
				.then((responseJson) => {
					 this.setState({
							logInResponse: responseJson, //Sends user details within json post
					 });
					 Alert.alert("Chit posted!" ); //Alert
				})
				.catch((error) => {
					 console.error(error); //Logs error if it fails
				});
			}
	}


//Mounts token component before render
	componentDidMount() {
		 this.getToken()

	}
	render() {
		 return (
				<View style ={styles.container}>
					 <Text style={styles.header}>            Start Chitting</Text>


					 <TextInput style={styles.textinput}
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							placeholder="Lets Chit Here"
							placeholderTextColor='#fff'
							onChangeText={text => this.setState({ ChitData: text })}
					 />

					 <View style = {styles.buttonContainer}>

					 <Button
					 title="Post Chit"
					 onPress={() => this.POSTrequest()}/>
					 </View>

					 <Image style={styles.imagereposition}
			source={require('./assets/Avatar.png')}
			/>

					 <View style = {styles.buttonContainer2}>
					 <Button
			 		title="Back"
			 		onPress={() => this.props.navigation.navigate('UserAccount')}
			 		/>
					</View>

					<View style = {styles.buttonContainer3}>
					<Button
				 title="Save to Draft"
				 onPress={() => this.SaveDraft()}/>
				 </View>

				</View>
		 );


	}
}
export default AddChits

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
    top: 400,
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
	buttonContainer3: {
    position: 'absolute',
    top: 450,
    left: 110,
		width: 200,
		height: 100
  },
	imagereposition: {
		position: 'absolute',
		top:50,
		left:165,
		height:70,
		width:70
	}

});
