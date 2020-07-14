import React,{ Component } from 'react';
import { FlatList, ActivityIndicator, Text, View,StyleSheet } from 'react-native';

class ChitScreen extends Component{
	//Disabled header
	static navigationOption = {
		header: null
	};
	//Constructor for props
	constructor(props){
	super(props);
	//Variables
	this.state={
		isFetching:false,
		chitListData:[] //Empty List Data
		}
	}
	//Mounts chidata
	componentDidMount(){
		this.getChitData();
	}
	//Refreshes page, runs chitdata get statement
	onRefresh(){
		this.setState({ isFetching: true }, function() { this.getChitData() });
	}
	//Get request chit data
	getChitData(){
		//Fetches chits data from link
		return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				isFetching:false,
				chitListData: responseJson, //Sets chitlistdata to json repsonse data from chit data
			});

		})
		.catch((error)=>{
			console.log(error); //Logs error
		});
	}

	render(){
		return(
		<View style={styles.container}>
		<Text style={styles.header}> Chits </Text>
		<FlatList styles={styles.container}
		onRefresh={() => this.onRefresh()}
		refreshing={this.state.isFetching}
		data={this.state.chitListData}
		renderItem={({ item })=> <Text style={styles.FlatList}>{item.chit_content}</Text>}
		keyExtractor={({ chit_id },index) => chit_id}
		/>
		</View>
		);
	}
}
export default ChitScreen

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
