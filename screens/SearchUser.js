import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet, FlatList, TextInput,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class SearchUser extends Component{
  constructor(props){
    super(props);
    //Sets variables
    this.state = {
      queryname: '',
      searchedDetails: [],
    }
  }
  //Check text for query search
  checktext = () => {
    const { queryname } = this.state
    //Checks length of query input to see if something has been wrote
    if (!queryname.length) {
      Alert.alert("Error. Enter Search Query")
      return false
    } else {
      //Returns true if condition met
      return true
    }
  }
  //Query request as get statement to search for username
  getQuery(){
    //Validation check before
    if(this.checktext()){
      //Search users with user name from text input
    return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user/?q='+this.state.queryname)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        //sets state of searched detail as the json reponse from query
        searchedDetails: responseJson,
      });
    })
  }
}


render(){
  return(
    <View style = {styles.container}>
    <Text style = {styles.header}>Search User</Text>
    <TextInput style = {styles.textinput}
    placeholder="Enter First Name "
    placeholderTextColor='#fff'
    onChangeText={text => this.setState({ queryname: text })}
    />
    <FlatList
    data={this.state.searchedDetails}
    keyExtractor={({ user_id },index) => user_id}
    renderItem={({ item }) => <View>
      <Text style={styles.FlatList}>{'Name :  ' + item.given_name + " " + item.family_name}</Text>
      <Text style={styles.FlatList}>{'Email :  ' + item.email }</Text>
    </View>} />

    <TouchableOpacity
    style = {styles.ButtonStyle}
    onPress={() => this.getQuery()}>
    <Text style = {styles.TextStyle}> Search User </Text>
    </TouchableOpacity>
    </View>
  )
}
}

export default SearchUser

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#19985c',
	},
	FlatList:{
    marginHorizontal: 10,
    height: 30,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    marginTop: 80,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 12,
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
	},
  textinput: {
		height: 50,
		marginBottom: -30,
		color: '#fff',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1
	},
  ButtonStyle: {
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom: 20,
    width: '50%',
    backgroundColor: '#00adfc',
    flex: 1,
    position: 'absolute',
    top:100,
    left:100,
     },
     TextStyle:{
       color:'#fff',
       textAlign:'center',
     },
	imagereposition: {
		position: 'absolute',
		top:50,
		left:165,
		height:70,
		width:70
	}
})
