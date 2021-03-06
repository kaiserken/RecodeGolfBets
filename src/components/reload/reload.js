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
   getInitialState: function(){
     return{
       x:[]
     };
   },

   componentDidMount: function(){
     this._loadInitialState().done();

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
         "holeNumber",
         "name",
         "data",
         "course",
         "playerCount",
         "player1Name",
         "player2Name",
         "player3Name",
         "player4Name",
         "gameSelected",
         "indexUsed",
         "scoreAdj1",
         "scoreAdj2",
         "scoreAdj3",
         "scoreAdj4",
         "betFrontNassau",
         "betBackNassau",
         "betTotalNassau",
         "betLowScore",
         "betLowTotal",
         "skinsBet",
         "auto9",
         "auto18",
         "lowScore",
         "lowTotal",
         "skinsCarry",
         "teams",
         'startHole',
         'reload'
       ]
       );if (value !== null){

         this.setState({x: value});
      }
     } catch (error) {
       console.log("AsyncStorage Error " + error);
     }
   },

  render: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>Current Game in Progress</Text>
        </View>
        <View style = {{flex:1}}/>
        <View>
          <View style = {styles.titlecontainer2}>
            <Text style = {styles.title}>You have a current Game!</Text>
            <Text style = {styles.title6}></Text>
            <Text style = {styles.title6}>Press continue which will take </Text>
            <Text style = {styles.title6}>you to your game.</Text>
            <Text style = {styles.title6}></Text>
            <Text style = {styles.title6}></Text>
            <Text style = {styles.title6}>You can end your round</Text>
            <Text style = {styles.title6}>from the scorecard</Text>
            <Text style = {styles.title6}></Text>
          </View>
        </View>
        <View style = {{flex:1}}/>
        <View style = {{flex: 2, justifyContent: "center", alignItems: "center"}}>
          <Button text = {'Continue'} onPress={this.onPress}/>
        </View>
      </Image>
    );
  },

  onSignupPress: function(){
    this.props.navigator.push({name:'signup'}); // pass additional props here
  },
  
  onPress: function(){

  var value  = this.state.x;
    this.props.navigator.push({name:'hole',
    "selectedTab": value[0][1],
     "player1Score": JSON.parse(value[1][1]),
     "player2Score": JSON.parse(value[2][1]),
     "player3Score": JSON.parse(value[3][1]),
     "player4Score": JSON.parse(value[4][1]),
     "player1NetScore": JSON.parse(value[5][1]),
     "player2NetScore": JSON.parse(value[6][1]),
     "player3NetScore": JSON.parse(value[7][1]),
     "player4NetScore": JSON.parse(value[8][1]),
     "holeNumber": JSON.parse(value[9][1]),
     "name": value[10][1],
     "data": JSON.parse(value[11][1]),
    "course": JSON.parse(value[12][1]),
     "playerCount": JSON.parse(value[13][1]),
     "player1Name": value[14][1],
     "player2Name": value[15][1],
     "player3Name": value[16][1],
     "player4Name": value[17][1],
     "gameSelected": value[18][1],
     "indexUsed": JSON.parse(value[19][1]),
     "scoreAdj1": JSON.parse(value[20][1]),
     "scoreAdj2": JSON.parse(value[21][1]),
     "scoreAdj3": JSON.parse(value[22][1]),
     "scoreAdj4": JSON.parse(value[23][1]),
     "betFrontNassau": JSON.parse(value[24][1]),
     "betBackNassau": JSON.parse(value[25][1]),
     "betTotalNassau": JSON.parse(value[26][1]),
     "betLowScore": JSON.parse(value[27][1]),
     "betLowTotal": JSON.parse(value[28][1]),
     "skinsBet": JSON.parse(value[29][1]),
     "auto9": JSON.parse(value[30][1]),
     "auto18": JSON.parse(value[31][1]),
     "lowScore": JSON.parse(value[32][1]),
     "lowTotal": JSON.parse(value[33][1]),
     "skinsCarry": JSON.parse(value[34][1]),
     "teams": JSON.parse(value[35][1]),
     "startHole":JSON.parse(value[36][1]),
     "reload": JSON.parse(value[37][1])
   });

  }
 });

 var styles = StyleSheet.create({
   title: {
     color: 'white',
     fontSize: 22,
     alignSelf: 'center'
   },

   title6: {
     color: 'white',
     fontSize: 14,
     justifyContent: 'center',
     alignSelf: 'center',
   },

   titlecontainer: {
     backgroundColor: "black",
     opacity: 0.7,
     flex: 1,
     alignItems: 'center',
     justifyContent: 'space-around',
   },
   titlecontainer2: {
     backgroundColor: "darkolivegreen",
     opacity: 0.8,
     flex: .3,
     alignSelf:'center',
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 5,
     padding: 5,
     width:300,
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
