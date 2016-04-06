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
var AddFavorites  = require('./components/profile/addfavorite');
var Profile  = require('./components/profile/profile');
var Setup  = require('./components/setup/setup');
var Games = require('./components/games/games');
var StartHole = require('./components/score/starthole');
var Hole  = require('./components/score/hole');
var Setbets = require('./components/games/setbets');
var Reload  = require('./components/reload/reload');
var BetResults  = require('./components/score/betresults');
var Scorecard = require('./components/score/scorecard');
var EndRound = require('./components/end/endround');

var ROUTES  = {
  signin: Signin,
  signup: Signup,
  reload: Reload,
  favorites: Favorites,
  addfavorites: AddFavorites,
  profile: Profile,
  setup: Setup,
  games: Games,
  starthole: StartHole,
  hole: Hole,
  setbets: Setbets,
  betresults:BetResults,
  scorecard: Scorecard,
  endround: EndRound
};

module.exports = React.createClass({
getInitialState: function(){
  return {
    currentGame: null
  };
},



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
    currentGame: null,
  };
},

renderScene: function(route, navigator){
  var Component  = ROUTES[route.name];
  return <Component route = {route} navigator = {navigator} />;
},

render: function(){
  console.log("state", this.state);
  // need to change back to false  - for testing only
  if (this.state.currentGame === false){
    return (
      <Navigator
      style  = {styles.container}
      initialRoute = {{ name: 'signin' }}
      renderScene = {this.renderScene}
      configureScene = {()=>{return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  }
  if (this.state.currentGame === "true"){
    return (
      <Navigator
      style  = {styles.container}
      initialRoute = {{ name: 'reload' }}
      renderScene = {this.renderScene}
      configureScene = {()=>{return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  }
  if (this.state.currentGame === null){
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
