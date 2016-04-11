var React  = require('react-native');

var {
  AsyncStorage,
  Text,
  StyleSheet,
  View,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  Image,
} = React;

var Nines  = require('../betcalcs/nines');
var RoundRobin  = require('../betcalcs/roundrobin');
var Skins  = require('../betcalcs/skins');
var MatchPlay = require('../betcalcs/matchplay');
var Nassau = require('../betcalcs/nassau');
var NassauResults  = require('../betcalcs/nassauresults');
var Post = require('../common/post');
var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {

    return {
      selectedTab: 'endround',
      nassautotals: null,
      ninestotals: null,
      matchplaytotals: null,
      roundrobintotals: null,
      skinstotals: null,
      resultsadded: null
    };
  },

  componentDidMount: function(){


    if (this.props.route.gameSelected === "Nassau"){
      var results;
      var resultsFront;
      var resultsBack;
      var arr = [];
      var arrFront = [];
      var arrBack = [];
      var resultsTotal  = [];
      if (this.props.route.indexUsed === true){
        for (var i = 1; i<=this.props.route.playerCount; i++){
          arr.push(this.props.route[`betNetScoreP${i}`]);
          arrFront.push(this.props.route[`betNetScoreP${i}`].slice(0,9));
          arrBack.push(this.props.route[`betNetScoreP${i}`].slice(9));
        }
        results  = Nassau(arr, this.props.route.teams, this.props.route.auto18);
        resultsFront  = Nassau(arrFront, this.props.route.teams, this.props.route.auto9);
        resultsBack  = Nassau(arrBack, this.props.route.teams, this.props.route.auto9);
        resultsTotal.push(NassauResults(resultsFront, this.props.route.betFrontNassau), NassauResults(resultsBack, this.props.route.betBackNassau), NassauResults(results, this.props.route.betTotalNassau));
      } else {
        for (var i = 1; i<=this.props.route.playerCount; i++){
          arr.push(this.props.route[`betScoreP${i}`]);
          arrFront.push(this.props.route[`betScoreP${i}`].slice(0,9));
          arrBack.push(this.props.route[`betScoreP${i}`].slice(9));
        }
        results  = Nassau(arr, this.props.route.teams, this.props.route.auto18);
        resultsFront  = Nassau(arrFront, this.props.route.teams, this.props.route.auto9);
        resultsBack  = Nassau(arrBack, this.props.route.teams, this.props.route.auto9);
        resultsTotal.push(NassauResults(resultsFront, this.props.route.betFrontNassau), NassauResults(resultsBack, this.props.route.betBackNassau), NassauResults(results, this.props.route.betTotalNassau));
      }

      if (isNaN(resultsTotal[1])){resultsTotal[1]=0;}
      console.log('nassau totals', resultsTotal);
      var total  = resultsTotal[0]+resultsTotal[1]+resultsTotal[2];
      this.setState({nassautotals: total});
    }
    if (this.props.route.gameSelected === "Nines"){
      var results;
      if (this.props.route.indexUsed === true){
        results  = Nines(this.props.route.betNetScoreP1, this.props.route.betNetScoreP2, this.props.route.betNetScoreP3);
      } else {
        results  = Nines(this.props.route.betScoreP1, this.props.route.betScoreP2, this.props.route.betScoreP3);
      }
      var total  = results[0].reduce(function(sum, element){
        return sum + element;
      }, 0);
      this.setState({ninestotals: total});
    }

    if (this.props.route.gameSelected === "RoundRobin"){
      var lowS = this.props.route.betLowScore || 0;
      var lowT = this.props.route.betLowTotal || 0;
      var results;
      if (this.props.route.indexUsed === true){
        results  = RoundRobin([this.props.route.betNetScoreP1, this.props.route.betNetScoreP2, this.props.route.betNetScoreP3, this.props.route.betNetScoreP4], this.props.route.teams, lowS, lowT);
      } else {
        results  = RoundRobin([this.props.route.betScoreP1, this.props.route.betScoreP2, this.props.route.betScoreP3, this.props.route.betScoreP4,], this.props.route.teams, lowS, lowT);
      }
      var total  = results[0].reduce(function(sum, element){
        return sum + element;
      }, 0);
      this.setState({roundrobintotals: total});
    }

    if (this.props.route.gameSelected === "MatchPlay"){
      var results;
      var arr = [];
      if (this.props.route.indexUsed === true){
        for (var i = 1; i<=this.props.route.playerCount; i++){
          arr.push(this.props.route[`betNetScoreP${i}`]);
        }
        results  = MatchPlay(arr, this.props.route.teams);
      } else {
        for (var i = 1; i<=this.props.route.playerCount; i++){
          arr.push(this.props.route[`betScoreP${i}`]);
        }
        results  = MatchPlay(arr, this.props.route.teams);
      }
      var totals;

      if (parseInt(results[0][results[0].length-1]) > 0 ){
        totals = 1;
      } else if (parseInt(results[0][results[0].length-1]) < 0 ){
        totals = -1;
      } else {
        totals  = 0;
      }
      this.setState({matchplaytotals: totals});
    }

    if (this.props.route.gameSelected === "Skins"){
      var results;
      var arr = [];
      if (this.props.route.indexUsed === true){
        for (var i = 1; i<=this.props.route.playerCount; i++){
          arr.push(this.props.route[`betNetScoreP${i}`]);
        }
        results  = Skins(arr, this.props.route.skinsBet, this.props.route.skinsCarry);
      } else {
        for (var i = 1; i<=this.props.route.playerCount; i++){
          arr.push(this.props.route[`betScoreP${i}`]);
        }
        results  = Skins(arr, this.props.route.skinsBet, this.props.route.skinsCarry);
      }
      var total  = results[0].reduce(function(sum, element){
        return sum + element;
      }, 0);

      this.setState({skinstotals: total});
    }
  },

  saveResults: function(){

    var game  = this.props.route.gameSelected.toLowerCase();
    var dataObject = {};
    dataObject[`${game}totals`] = this.state[`${game}totals`];
    dataObject.email = this.props.route.data.email;
    dataObject.score = this.props.route.player1Score;


    Post(game, dataObject).then((data)=>{
      console.log('data', data);
      if (data === undefined){
        console.log("Error - Not Added");
      } else {
        // route to course favs page  - or profile page
        console.log("Successfully added!");
      }
    }).done();
    this._Remove();
    this.props.navigator.immediatelyResetRouteStack([{name: "signin"}]);
  },


  async _Remove() {
    try {
      var value  = await AsyncStorage.multiRemove(
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
        'reload',
        'currentGame'
      ]
      );
    } catch (error) {
      console.log("AsyncStorage Error " + error);
    }
  },




  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style = {{flex:1}}/>
        <View>
          <View style = {styles.titlecontainer2}>
            <Text style = {styles.title}>End of Round</Text>
            <Text style = {styles.title6}></Text>
            <Text style = {styles.title6}>ARE YOU SURE?</Text>
            <Text style = {styles.title6}></Text>
            <Text style = {styles.title6}>Once you end the round you will </Text>
            <Text style = {styles.title6}>not be able to view the results.</Text>
            <Text style = {styles.title6}></Text>
            <Text style = {styles.title6}>Go back to Scorecard if you need to </Text>
            <Text style = {styles.title6}>view results</Text>
            <Text style = {styles.title6}></Text>
          </View>
        </View>
        <View style = {{flex:1}}/>
        <View style = {{flex: 2, justifyContent: "center", alignItems: "center"}}>
        <Button text={'End Round'} onPress={()=>this.saveResults()}/>
        </View>
      </Image>
    );
  },

  render: function(){
    var user  = this.props.route.data;
    console.log('hole state', this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Scorecard</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.setState({selectedTab: 'endround'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>End Round</Text>
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
  android1: {
    backgroundColor: "darkolivegreen",
    borderTopWidth:10,
    borderColor: "beige",
    opacity: 0.8,
    height: 60,
    justifyContent: 'center'
  }

});
