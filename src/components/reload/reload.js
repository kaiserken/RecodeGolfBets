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

 module.exports = React.createClass({

   componentDidMount: function(){
     this._setdata().done();
   },

   async _setdata() {
     try {
       var value  = await AsyncStorage.multiSet([
         ["selectedTab", 'currenthole'],
         ["player1Score", JSON.stringify([4,5,6])],
         ["player2Score", JSON.stringify([4,5,6])],
         ["player3Score", JSON.stringify([4,5,6])],
         ["player4Score", JSON.stringify([4,5,6])],
         ["player1NetScore",JSON.stringify([4,5,6])],
         ["player2NetScore",JSON.stringify([4,5,6])],
         ["player3NetScore",JSON.stringify([4,5,6])],
         ["player4NetScore",JSON.stringify([4,5,6])],
         ["holeNumber",JSON.stringify(3)],
       ]);
     } catch (error) {
       console.log("AsyncStorage Error " + error);
     }
   },

   async _loadInitialState() {
     try {
       var value  = await AsyncStorage.multiGet(
        ["selectedTab",
         "player1Score",
         "player2Score",
         "player3Score",
         "player4Score",
         "player1NetScore",
         "player2NetScore",
         "player3NetScore",
         "player4NetScore",
         "holeNumber"]
       );
      console.log('value multiget',value);
     } catch (error) {
       console.log("AsyncStorage Error " + error);
     }
   },

  render: function(){
    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.container}>
          <Text style = {styles.label}>You have a current Game </Text>
          <Text style  = {styles.label}>Would you like to continue it</Text>
          <Button text = {'Continue'} onPress={this.onPress}/>
          <Button text = {"I need an account..."} onPress={this.onSignupPress}/>
        </View>
      </Image>
    );
  },

  onSignupPress: function(){
    this.props.navigator.push({name:'signup'}); // pass additional props here
  },

  onPress: function(){
    this._loadInitialState().done();

  }
 });

 var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 45,
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 40,
    marginBottom:20

  },
  label: {
    color: 'white',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },

 });
