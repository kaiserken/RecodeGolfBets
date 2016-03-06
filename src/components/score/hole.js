var React  = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  Switch,
  TouchableHighlight,
  Alert,
  Image
} = React;

var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'currenthole',
      player1Score: [],
      player2Score: [],
      player3Score: [],
      player4Score:[],
      score1:0,
      score2:0,
      score3:0,
      score4:0,
      netScore1: 0,
      netScore2: 0,
      netScore3: 0,
      netScore4: 0,

    };
  },

  onSubmit: function(){

  },

  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.row}>
          <Text style = {styles.label}>{this.props.route.data.name}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score1: --this.state.score1, netScore1: --this.state.netScore1})}>
            <Text style={styles.label}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score1}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score1: ++this.state.score1, netScore1: ++this.state.netScore1})}>
            <Text style={styles.label}>+</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>Net {this.state.netScore1}</Text>
        </View>
    </Image>
    );
  },

  render: function(){
    var user  = this.props.route.data;
    console.log(this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Games</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'currenthole'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Current Hole</Text>
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
          title="Profile"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Current Hole"
          selected={this.state.selectedTab === 'currenthole'}
          onPress={() => {
            this.setState({
              selectedTab: 'currenthole',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Games"
          selected={this.state.selectedTab === 'games'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },



});

var styles = StyleSheet.create({

  label: {
    color: 'white',
  },

  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1
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
