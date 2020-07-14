import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image} from 'react-native';

class HomeScreen extends Component{
	static navigationOptions = {
 headerShown: false,
}
	render(){
		return(
			<View style={styles.container}>
			<Text style={styles.title}>Chitty Chitty</Text>
			<View style={styles.buttonContainer}>
			<Button
			title="Login"
			onPress={() => this.props.navigation.navigate('LoginScreen')}
			/>
			</View>
			<Image style={styles.imagereposition}
			source={require('./assets/Logo.png')}
			/>
			</View>
		);
	}

}
export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 2,
    backgroundColor: '#19985c'
	},
	title: {
		fontFamily: "Roboto",
		fontSize: 30,
		textAlign: "center",
		color: "#fff"
	},
	buttonContainer: {
    position: 'absolute',
    top: 500,
    left: 110,
		width: 200,
		height: 100
  },
	imagereposition: {
		position: 'absolute',
		top:20,
		left:-50,
		height:500,
		width:500
	}
})
