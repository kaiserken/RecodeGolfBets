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
     this._setdata().done();
     this._loadInitialState().done();

   },

   async _setdata() {
     try {
       var value  = await AsyncStorage.multiSet([
         ["selectedTab", 'currenthole'],
         ["player1Score", JSON.stringify([4,3,4,4,3,4,4,3,4,4,3,4,4,5])],
         ["player2Score", JSON.stringify([2,2,7,2,5,7,2,5,7,2,5,7,4,5])],
         ["player3Score", JSON.stringify([5,3,4,5,3,4,5,3,4,5,3,2,3,5])],
         ["player4Score", JSON.stringify([3,6,3,3,6,3,3,6,3,3,6,3,6,4])],
         ["player1NetScore",JSON.stringify([3,6,3,3,6,3,3,6,3,3,6,3,4,5])],
         ["player2NetScore",JSON.stringify([5,7,4,5,4,4,5,3,4,5,3,4,5,4])],
         ["player3NetScore",JSON.stringify([2,5,7,2,2,7,2,5,7,2,2,2,2,4])],
         ["player4NetScore",JSON.stringify([4,8,4,4,3,4,4,3,4,4,3,4,5,3])],
         ["holeNumber",JSON.stringify(15)],
         ["name","hole"],
         ["data", JSON.stringify({"name": "Ken"})],
         ["course",JSON.stringify({
           "coursename": "Arroyo Trabuco Golf Club",
           "coursehcp": [13,1,9,3,5,15,17,11,7,18,12,2,6,14,10,16,4,8],
           "coursepar": [4,4,5,3,4,4,5,3,4,4,3,4,3,5,4,4,4,5]
         })
         ],
         ["playerCount",JSON.stringify(4)],
         ["player1Name", "Ken"],
         ["player2Name", "Tommy"],
         ["player3Name", "Ed"],
         ["player4Name", "Richard"],
         ["gameSelected", "Nassau"],
         ["indexUsed", JSON.stringify(true)],
         ["scoreAdj1", JSON.stringify([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],
         ["scoreAdj2", JSON.stringify([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],
         ["scoreAdj3", JSON.stringify([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],
         ["scoreAdj4", JSON.stringify([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],
         ["betFrontNassau", JSON.stringify(2)],
         ["betBackNassau", JSON.stringify(2)],
         ["betTotalNassau", JSON.stringify(2)],
         ["betLowScore", JSON.stringify(1)],
         ["betLowTotal", JSON.stringify(1)],
         ["skinsBet", JSON.stringify(null)],
         ["auto9", JSON.stringify(true)],
         ["auto18", JSON.stringify(true)],
         ["lowScore", JSON.stringify(false)],
         ["lowTotal", JSON.stringify(false)],
         ["skinsCarry", JSON.stringify(false)],
         ["teams", JSON.stringify([1,3,4,2,1,2,3,4,1,4,2,3])],
         ["reload", JSON.stringify(true)],
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
  onRouteChange: function(){
    console.log("value in press", this.state.x);
  },
  onPress: function(){
  console.log("value in press", this.state.x);
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
     "reload": JSON.parse(value[36][1])
   });

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
