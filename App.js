/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View,ActivityIndicator, ToolbarAndroid, Image} from 'react-native';

class ItemList extends Component{
  render(){
   return(
     <View style={styles.item}>
       <View>
          <Image source={require('./img/rain.png')} style={styles.image} />
          <Text>{this.props.itemtitle}</Text>
       </View>
       <View>
          <Text>{this.props.itemdate}</Text>
          <Text>Temp: high {this.props.itemtemp}</Text>
       </View>
     </View>
   );
  }
}

class Header extends Component{
  render(){
    return(
      <View style={styles.titlecontent}>
        <Image source={this.props.himage} style={styles.imageheader} />
        <View>
          <Text>{this.props.htitle}</Text>
          <Text>{this.props.hdesc}</Text>
        </View>
      </View>
    );
  }
}

export default class FlatListSimple extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.query.results.channel,
        }, function(){
         
            
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }else{
      
      let pic = {
        uri : this.state.dataSource.image.url
      };

      return (

        <View style={styles.container}>
          <ToolbarAndroid
            title='Weather App'
            style={styles.toolbar}
            titleColor='white'
          />
        
        <Header himage={pic} htitle={this.state.dataSource.title} hdesc={this.state.dataSource.description}/>
        <FlatList
          data={this.state.dataSource.item.forecast}
          renderItem={
            ({item}) => <ItemList style={styles.item} itemtitle={item.text} itemdate={item.date} itemtemp={item.high}></ItemList>
          }
        />
          
        </View>
      );
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  titlecontent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 22,
    padding:16,
    height:100
  },
  item: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
    paddingLeft: 16,
    paddingRight:16,
    paddingTop:4,
    paddingBottom:4,
    height:90
    
  },
  toolbar:{
    height: 56,
		backgroundColor: '#4883da',
  },
  image:{
    height:50,
    width:50
  },

  imageheader:{
    width:100, 
    height:40, 
    resizeMode:'center',
    justifyContent: 'center'
  }
  
});
