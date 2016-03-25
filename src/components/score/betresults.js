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
      selectedTab: 'betresults',
    };
  },
  renderNines: function(){
    return (
      <View style = {styles.row}>
        <Text style = {styles.name}>{this.props.route.player2Name}</Text>
        <Text style = {styles.name}>{this.props.route.player2Name}</Text>
      </View>
    );
  },


  renderContent: function(){
    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
          <Text style = {styles.title1}>Bet Results through Hole {this.props.route.holeNumber}</Text>
        </View>
        <View style  = {{flex:1}}>
        {this[`render${this.props.route.gameSelected}`]()}
        </View>
      </Image>
    );
  },





  render: function(){
    console.log('hole state', this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Current Hole</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'betresults'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Bets</Text>
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
          title="Current Hole"
          selected={this.state.selectedTab === 'currenthole'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="bets"
          selected={this.state.selectedTab === 'betresults'}
          onPress={() => {
            this.setState({
              selectedTab: 'betresults',
            });
          }}>
          {this.renderContent()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },



});

var styles = StyleSheet.create({

  title: {
    color: 'white',
    fontSize: 22,
  },
  title1: {
    color: 'white',
    fontSize: 15,
  },
  title2: {
    color: 'white',
    fontSize: 17,
    marginLeft:5,
    marginRight:5,
  },
  title3: {
    color:'greenyellow',
    fontSize: 10,
    marginLeft:5,
    marginRight:5,
  },
  name: {
    fontSize: 20,
    color: 'white',
    width: 75,
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
  plusMinus: {
    fontWeight: "800",
    fontSize: 45,
    color:'greenyellow',
  },
  titlecontainer: {
    flex: .75,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  rowheader:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

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
