var React  = require('react-native');

 var {
   AsyncStorage,
   View,
   Text,
   StyleSheet,
   TextInput,
   Platform,
   Image
 } = React;

 var Button  = require('../common/button');
 var Post  = require('../common/post');

 module.exports = React.createClass({

  getInitialState: function(){
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  componentDidMount: function(){
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      var value  = await AsyncStorage.getItem("data");
      var user = JSON.parse(value);
      if (value){
        Post('loggedin', {email: user.email}).then((data)=>{
          console.log('data',data);
          if (data === undefined){
            this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
          } else {
            // route to course favs page  - or profile page
            this.props.navigator.immediatelyResetRouteStack([{name: 'favorites', data: data}]);
          }
        }).done();
      } else {
        this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
      }
    } catch (error) {
      console.log("AsyncStorage Error " + error);
    }
  },


  render: function(){
    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View>
          <Text style = {styles.title}>Golf Bets</Text>
        </View>

      </Image>
    );
  },


 });

 var styles = StyleSheet.create({

  title: {
    color: "white",
    fontSize: 45,
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 40,
    marginBottom:20

  },

  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },

 });
