import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Followers extends Component{
  //Constructor for props
  constructor(props){
    super(props);
    //Sets state for variables
    this.state = {
      ID: "",
      TOKEN: "",

    };
  }
	//Gets token for current user from Asyncstorage
  getToken = async () => {
		 try {
				let responseToken = await AsyncStorage.getItem('token'); //Token from asyncstorage
				this.setState({
					 TOKEN: responseToken, //Sets token to repsonse token from async
				});
		 } catch (error) {
				console.log("GET TOKEN ERROR : " + error); //Catches errors
		 }
	}

  //Validation check for ID input text
  checktext = () => {
		const { ID } = this.state
		if (!ID.length) { //Checks length of ID, to stop null
			Alert.alert("Error. Please input an ID")
			return false
		} else {
			return true //If conditions are met returns true. Posts data
		}
	}


  Follow = () => {
    const ID = this.state.ID
    if(this.checktext()){ //Runs check text before post
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ID+'/follow', //Runs backend follow with ID from user
    {
      method: 'POST', //Method is post
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.TOKEN, //Authorization token is set
      },
    }) .then((response) => {
      Alert.alert('User followed') //Displays on response alert stating user is followed
    });
  }
}

    componentDidMount() {
  		 this.getToken()

  	}
    render(){
      return(
        <View style={styles.container}>
        <Text style={styles.header}>            Follow a User</Text>

        <TextInput style={styles.textinput}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        placeholder="Input User ID"
        placeholderTextColor='#fff'
        onChangeText={text => this.setState({ ID: text })}
        />

        <View style={styles.buttonContainer}>
        <Button
        title="Follow this User"
        onPress={() => this.Follow()}/>
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

        </View>
      )
    }

}
export default Followers
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
	imagereposition: {
		position: 'absolute',
		top:50,
		left:165,
		height:70,
		width:70
	}

});
