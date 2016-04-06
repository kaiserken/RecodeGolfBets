var React  = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  Image,
} = React;

var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {

    return {
      selectedTab: 'endround',


    };
  },





  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style = {{flex: 6}}>

        </View>
      </Image>
    );
  },

  render: function(){
    var user  = this.props.route.data;
    console.log('hole state', this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Scorecard</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'endround'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>End Round</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
      return (
        <DrawerLayoutAndroid
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          {this.renderContent()}
        </DrawerLayoutAndroid>
      );
    }

    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="white">
        <TabBarIOS.Item
          title="Scorecard"
          selected={this.state.selectedTab === 'scorecard'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="End Round"
          selected={this.state.selectedTab === 'endround'}
          onPress={() => {
            this.setState({
              selectedTab: 'endround',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },



});

var styles = StyleSheet.create({

  title: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  },


  title2: {
    color:'yellowgreen',
    fontSize: 14,
    width:60,

  },
  title3: {
    color:'greenyellow',
    fontSize: 14,
    width:20,
    textAlign: 'center',
  },

  title4: {
    color:'white',
    fontWeight: "400",
    fontSize: 14,
    width:20,
    height:16,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: "darkolivegreen",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 3,
  },
  title5: {
    color:'white',
    fontSize: 14,
    width:60,
    height:16,
    marginTop: 1,
    marginBottom: 1,
  },
  title6: {
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title7: {
    color:'greenyellow',
    fontSize: 14,
    width:50,
    textAlign: 'center',
  },

  title8: {
    color:'white',
    fontWeight: "400",
    fontSize: 14,
    width:50,
    height:16,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: "darkolivegreen",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 3,
  },

  title9: {
    color:'white',
    fontSize: 14,
    width:60,

  },
  title10: {
    color:'white',
    fontSize: 14,
    width:20,
    textAlign: 'center',
  },
  title11: {
    color:'black',
    fontSize: 14,
    width:60,
    fontWeight: '500'

  },
  title12: {
    color:'black',
    fontSize: 14,
    width:20,
    textAlign: 'center',
    fontWeight: '500'
  },


  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: "transparent"
  },
  row2:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'darkolivegreen'
  },
  row3:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  row4:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    opacity:0.8
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    marginBottom:(Platform.OS === 'ios') ? 40 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },

});
