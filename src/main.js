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
var Setup  = require('./components/setup/setup');
var Games = require('./components/games/games');
var Hole  = require('./components/score/hole');
var Setbets = require('./components/games/setbets');
var Reload  = require('./components/reload/reload');
var BetResults  = require('./components/score/betresults');

var ROUTES  = {
  signin: Signin,
  signup: Signup,
  reload: Reload,
  favorites: Favorites,
  profile: Profile,
  setup: Setup,
  games: Games,
  hole: Hole,
  setbets: Setbets,
  betresults:BetResults
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
  // need to change back to false  - for testing only
  if (this.state.currentGame === true){
    return (
      <Navigator
      style  = {styles.container}
      initialRoute = {{ name: 'signin' }}
      renderScene = {this.renderScene}
      configureScene = {()=>{return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  } else if (this.state.currentGame === false){
    return (
      <Navigator
      style  = {styles.container}
      initialRoute = {{ name: 'reload' }}
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
