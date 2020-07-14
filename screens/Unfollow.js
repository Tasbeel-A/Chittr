import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet, Image, PermissionAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Unfollow extends Component{
  constructor(props){
    super(props);
    //Creates state variable
    this.state = {
      ID: "",
      TOKEN: "",

    };
  }
  //Get token for verification
  getToken = async () => {
     try {
        let responseToken = await AsyncStorage.getItem('token');
        //Sets token as token reponse from async storage
        this.setState({
           TOKEN: responseToken,
        });
     } catch (error) {
       // Error catch
        console.log("Error" + error);
     }
  }

  //Check ID length
  checktext = () => {
		const { ID } = this.state
		if (!ID.length) { //Checks if something has been inputted
			Alert.alert("Error. Enter ID")
			return false
		} else {
      //Returns true if conditions met
			return true
		}
	}

  unfollow(){
    if(this.checktext()){
    try{
      //Sends fetch to backend
      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ this.state.ID + '/follow',
      {
        method: 'DELETE', //Method is to delete follower
        headers:{
          'X-Authorization': this.state.TOKEN //Authorizes token
        },
      });
    Alert.alert("User" +this.state.ID+ "unfollowed") //Alerts that ID has been unfollowed
  }
  catch(error){
    console.log(error); //Logs error
  }
}
}
  //Mounts token
  componentDidMount(){
    this.getToken()
  }



  render(){
    return(
      <View style={styles.container}>
      <Text style ={styles.header}>          Unfollow a User</Text>

      <TextInput style={styles.textinput}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      placeholder="Input User ID"
      placeholderTextColor='#fff'
      onChangeText={text => this.setState({ ID: text })}
      />

      <View style={styles.buttonContainer}>
      <Button
      title="Unfollow User"
      onPress={() => this.unfollow()}/>
      </View>

      <View style = {styles.buttonContainer2}>
      <Button
     title="Back"
     onPress={() => this.props.navigation.navigate('UserAccount')}
     />
     </View>
     <Image style={styles.imagereposition}
source={require('./assets/Avatar.png')}
/>
      </View>
    )
  }
}
export default Unfollow

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
