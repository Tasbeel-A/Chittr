import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class MyFollowers extends Component {
  static navigationOptions = {
    headerShown: false,
}
  constructor(props){
    super(props);
    // Sets stat for variables as empty
    this.state = {
      ID: '',
      TOKEN: '',
      FollowerData: [],
      FollowingData: [],
      isFetching:true
    };
  }
  //Gets token and id data from AsyncStorage
  getToken = async () => {
     try {
       let responseID = await AsyncStorage.getItem('id'); //Gets ID item
       let responseToken = await AsyncStorage.getItem('token'); //Gets token item
        this.setState({
           TOKEN: responseToken, //Sets response to token variable
           ID: responseID //Sets repsonse to ID varaible
        });
        this.myFollowing() //Following function decleration for mount purpose
        this.myFollowers() //Follower function
        console.log(this.state.ID);
     } catch (error) {
        console.log("TOKEN NOT FOUND: " + error); //Catches error
     }
  }

  //Shows who the current user is following
  myFollowing() {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+ this.state.ID + "/following", //Gets user ID and following backend link
    {
      method: 'GET' //Method is Get
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isFetching: false, //
        FollowingData: responseJson, //Json Data is set to followdata list
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  //Shows who is following current user
  myFollowers() {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+ this.state.ID + "/followers", //Get request sent to backend by id
    {
      method: 'GET' //Method get
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isFetching: false, //Sets fetching to false
        FollowerData: responseJson, //Sets List to response JSON data
      });
    })
    .catch((error) => {
      console.log(error); //Console logs catched errors
    });
  }

  componentDidMount(){
    this.getToken() //Mounts token
  }



  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.header}>View my Following</Text>
      <FlatList
      refreshing={this.state.isFetching}
      onRefresh={this.getToken}
      data={this.state.FollowingData}
      keyExtractor={({ user_id },index) => user_id}
      renderItem={({ item }) => <View>
        <Text style={styles.FlatList}>{'Name :  ' + item.given_name + " " + item.family_name}</Text>
        <Text style={styles.FlatList}>{'Email :  ' + item.email }</Text>
      </View>} />

      <Text  style={styles.header}>View my Followers</Text>
      <FlatList
      refreshing={this.state.isFetching}
      onRefresh={this.getToken}
      data={this.state.FollowerData}
      keyExtractor={({ user_id },index) => user_id}
      renderItem={({ item }) => <View>
        <Text style={styles.FlatList}>{'Name :  ' + item.given_name + " " + item.family_name}</Text>
        <Text style={styles.FlatList}>{'Email :  ' + item.email }</Text>
      </View>} />
      </View>
    )

  }
}
export default MyFollowers
const styles = StyleSheet.create({
	container: {
		flex: 2,
    backgroundColor: '#19985c'
	},
	FlatList:{
		marginHorizontal: 10,
    height: 50,
		color: 'white',
    backgroundColor: 'black',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 12
	},
	header: {
		fontSize: 24,
		color: '#fff',
		textAlign: 'center',
		paddingBottom: 10,
		marginBottom: 5,
		borderBottomColor: '#AFEEEE',
		borderBottomWidth: 1,
		fontFamily: "Hatten",
	}
})
