var React = require('react-native');

var {
  StyleSheet,
  Navigator,
  AsyncStorage,
  View,
  Text,
} = React;

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Favorites  = require('./components/profile/favorites');
var Profile  = require('./components/profile/profile');

var ROUTES  = {
  signin: Signin,
  signup: Signup,
  favorites: Favorites,
  profile: Profile,
};

module.exports = React.createClass({

componentDidMount: function(){
  this._loadInitialState().done();
},

async _loadInitialState() {
  try {
    var value  = await AsyncStorage.getItem("currentGame");
    if (value !== null){
      this.setState({currentGame: value});
    } else {
      this.setState({currentGame: false});
    }
  } catch (error) {
    console.log("AsyncStorage Error " + error);
  }
},

getInitialState: function(){
  return {
    currentGame: "",
  };
},

renderScene: function(route, navigator){
  var Component  = ROUTES[route.name];
  return <Component route = {route} navigator = {navigator} />;
},

render: function(){
  console.log("state", this.state);

  if (this.state.currentGame === false){
    return (
      <Navigator
      style  = {styles.container}
      initialRoute = {{ name: 'signin' }}
      renderScene = {this.renderScene}
      configureScene = {()=>{return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  } else if (this.state.currentGame === true){
    return (
      <Navigator
      style  = {styles.container}
      initialRoute = {{ name: 'signin' }}
      renderScene = {this.renderScene}
      configureScene = {()=>{return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  } else {
    return (
      <View style  = {styles.container}>
        <Text>Loading!!!!</Text>
      </View>
  );
  }
},

});

var styles  = StyleSheet.create({
  container: {
    flex: 1,
  },
});
