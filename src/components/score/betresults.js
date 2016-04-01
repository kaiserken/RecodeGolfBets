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

var Nines  = require('../betcalcs/nines');
var RoundRobin  = require('../betcalcs/roundrobin');
var Skins  = require('../betcalcs/skins');
var MatchPlay = require('../betcalcs/matchplay');
var Nassau = require('../betcalcs/nassau');
var NassauResults  = require('../betcalcs/nassauresults');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'betresults',
      viewTotals: false,
      image: (this.props.route.gameSelected === 'Nassau') ? require('../../assets/golf.jpeg') :       require('../../assets/golfball.jpeg'),
      betView: "18 Hole Bets"
    };
  },

  holesFront: function(){
    var holesfront = [1,2,3,4,5,6,7,8,9].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (holesfront);

  },

  holesBack: function(){
    var holesback = [10,11,12,13,14,15,16,17,18].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (holesback);
  },

  betResults: function(resultsArray){
    if (resultsArray.length<9){
      while(resultsArray.length<9){
        resultsArray.push('');
      }
    }
    var playerResults = resultsArray.map(function(element, index){
      return (
        <Text key = {index} style = {styles.title4}>{element}</Text>
      );
    });
    return (playerResults);
  },

  renderNassau: function(){
    var results;
    var resultsFront;
    var resultsBack;
    var arr = [];
    var arrFront = [];
    var arrBack = [];
    var resultsTotal  = [];
    if (this.props.route.indexUsed === true){
      for (var i = 1; i<=this.props.route.playerCount; i++){
        arr.push(this.props.route[`player${i}NetScore`]);
        arrFront.push(this.props.route[`player${i}NetScore`].slice(0,9));
        arrBack.push(this.props.route[`player${i}NetScore`].slice(9));
      }
      results  = Nassau(arr, this.props.route.teams, this.props.route.auto18);
      resultsFront  = Nassau(arrFront, this.props.route.teams, this.props.route.auto9);
      resultsBack  = Nassau(arrBack, this.props.route.teams, this.props.route.auto9);
      resultsTotal.push(NassauResults(resultsFront, this.props.route.betFrontNassau), NassauResults(resultsBack, this.props.route.betBackNassau), NassauResults(results, this.props.route.betTotalNassau));
        console.log('results front', resultsFront);
    } else {
      for (var i = 1; i<=this.props.route.playerCount; i++){
        arr.push(this.props.route[`player${i}Score`]);
        arrFront.push(this.props.route[`player${i}Score`].slice(0,9));
        arrBack.push(this.props.route[`player${i}Score`].slice(9));
      }
      results  = Nassau(arr, this.props.route.teams,this.props.route.auto18);
      resultsFront  = Nassau(arrFront, this.props.route.teams, this.props.route.auto9);
      resultsBack  = Nassau(arrBack, this.props.route.teams, this.props.route.auto9);
    }
    return this.renderNassauResults(results, resultsFront, resultsBack, resultsTotal);
  },

  renderMatchPlay: function(){
    var results;
    var arr = [];
    if (this.props.route.indexUsed === true){
      for (var i = 1; i<=this.props.route.playerCount; i++){
        arr.push(this.props.route[`player${i}NetScore`]);
      }
      results  = MatchPlay(arr, this.props.route.teams);
    } else {
      for (var i = 1; i<=this.props.route.playerCount; i++){
        arr.push(this.props.route[`player${i}Score`]);
      }
      results  = MatchPlay(arr, this.props.route.teams);
    }
    return this.renderMatchPlayResults(results);
  },

  renderSkins: function(){
    var results;
    var arr = [];
    if (this.props.route.indexUsed === true){
      for (var i = 1; i<=this.props.route.playerCount; i++){
        arr.push(this.props.route[`player${i}NetScore`]);
      }
      results  = Skins(arr, this.props.route.skinsBet, this.props.route.skinsCarry);
    } else {
      for (var i = 1; i<=this.props.route.playerCount; i++){
        arr.push(this.props.route[`player${i}Score`]);
      }
      results  = Skins(arr, this.props.route.skinsBet, this.props.route.skinsCarry);
    }
    return this.renderResults(results);
  },

  renderRoundRobin: function(){
    var lowS = this.props.route.betLowScore || 0;
    var lowT = this.props.route.betLowTotal || 0;
    var results;
    if (this.props.route.indexUsed === true){
      results  = RoundRobin([this.props.route.player1NetScore, this.props.route.player2NetScore, this.props.route.player3NetScore, this.props.route.player4NetScore], this.props.route.teams, lowS, lowT);
    } else {
      results  = RoundRobin([this.props.route.player1Score, this.props.route.player2Score, this.props.route.player3Score, this.props.route.player4Score], this.props.route.teams, lowS, lowT);
    }
    return this.renderResults(results);
  },

  renderNines: function(){
    var results;
    if (this.props.route.indexUsed === true){
      results  = Nines(this.props.route.player1NetScore, this.props.route.player2NetScore, this.props.route.player3NetScore);
    } else {
      results  = Nines(this.props.route.player1Score, this.props.route.player2Score, this.props.route.player3Score);
    }
    return this.renderResults(results);
  },

  renderResults: function(results){
    if (this.state.viewTotals === true){
      return this.renderTotals(results);
    } else{
      var self = this;
      var front = results.map(function(element, index){
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
            {self.betResults(element.slice(0,9))}
          </View>
        );
      });
      var back = results.map(function(element, index){
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
            {self.betResults(element.slice(9))}
          </View>
        );
      });
      return (
        <View style = {{flex:3}}>
          <Text style = {styles.title6}>Front Nine</Text>
          <View style = {styles.row}>
            <Text style = {styles.title2}>Hole #</Text>
            {this.holesFront()}
          </View>
          {front}
          <View style = {{flex:1}}/>
          <Text style = {styles.title6}>Back Nine</Text>
          <View style = {styles.row}>
            <Text style = {styles.title2}>Hole #</Text>
            {this.holesBack()}
          </View>
          {back}
          <View style = {{flex:1}}/>
          <View style = {styles.container}>
            <Button text={'Current Totals'} onPress={()=>this.setState({viewTotals: true})}/>
          </View>
          <View style = {{flex:4}}/>
        </View>
      );
    }
  },
  renderNassauResults: function(results, resultsFront, resultsBack, resultsTotal){
    var name1;
    var name2;
    var nameheading1;
    if (this.state.betView=== "Front 9 Bets"){results = resultsFront;}

    if (this.state.betView=== "Back 9 Bets"){results = resultsBack;}
    console.log('Nassau', resultsTotal)
    if (this.props.route.playerCount===2){
      name1 = this.props.route.player1Name;
      name2 = this.props.route.player2Name;
      nameheading1 = this.props.route.player1Name + ' vs. ' + this.props.route.player2Name;
    }
    if (this.props.route.playerCount===4){
      name1 = this.props.route[`player${this.props.route.teams[0]}Name`].slice(0,1)+' & '+ this.props.route[`player${this.props.route.teams[1]}Name`].slice(0,1);
      name2 = this.props.route[`player${this.props.route.teams[2]}Name`].slice(0,1)+' & '+ this.props.route[`player${this.props.route.teams[3]}Name`].slice(0,1);
      nameheading1 = this.props.route[`player${this.props.route.teams[0]}Name`]+' & '+ this.props.route[`player${this.props.route.teams[1]}Name`] + " vs. " + this.props.route[`player${this.props.route.teams[2]}Name`]+' & '+ this.props.route[`player${this.props.route.teams[3]}Name`];
    }
    var self = this;
    if (this.state.viewTotals === true){
      return this.renderTotals(resultsTotal, nameheading1);
    }else{
      if (this.state.betView ==='18 Hole Bets'|| this.state.betView ==='Front 9 Bets'){
        var front = results.map(function(element, index){
          if (index ===0){
            return(
              <View key = {index}style = {styles.row}>
                <Text style = {styles.title5}>{name1}</Text>
                {self.betResults(element.slice(0,9))}
              </View>
            );
          }
          return(
            <View key = {index}style = {styles.row}>
              <Text style = {styles.title5}>Press {index}</Text>
              {self.betResults(element.slice(0,9))}
            </View>
          );
        });
        var frontHeading =
          <View>
            <Text style = {styles.title6}></Text>
            <View style = {styles.row}>
              <Text style = {styles.title2}>Hole #</Text>
              {this.holesFront()}
            </View>
          </View>;
      }
      if (this.state.betView ==='18 Hole Bets'){
        var back = results.map(function(element, index){
          if (index ===0){
            return(
              <View key = {index} style = {styles.row}>
                <Text style = {styles.title5}>{name1}</Text>
                {self.betResults(element.slice(9))}
              </View>
            );
          }
          return(
            <View key = {index} style = {styles.row}>
              <Text style = {styles.title5}>Press {index}</Text>
              {self.betResults(element.slice(9))}
            </View>
          );
        });
        var backHeading =
          <View>
            <Text style = {styles.title6}></Text>
            <View style = {styles.row}>
              <Text style = {styles.title2}>Hole #</Text>
              {this.holesBack()}
            </View>
          </View>;
      }
      if (this.state.betView ==='Back 9 Bets'){
        var back = results.map(function(element, index){
          if (index ===0){
            return(
              <View key = {index} style = {styles.row}>
                <Text style = {styles.title5}>{name1}</Text>
                {self.betResults(element.slice(0,9))}
              </View>
            );
          }
          return(
            <View key = {index} style = {styles.row}>
              <Text style = {styles.title5}>Press {index}</Text>
              {self.betResults(element.slice(0,9))}
            </View>
          );
        });
        var backHeading =
          <View>
            <Text style = {styles.title6}></Text>
            <View style = {styles.row}>
              <Text style = {styles.title2}>Hole #</Text>
              {this.holesBack()}
            </View>
          </View>;
      }
      return (
        <View style = {{flex:4}}>
          <View></View>
          <View style  = {{justifyContent:"center", alignItems: "center", borderRadius:5}}>
            <Text style = {styles.title1}>{nameheading1}</Text>
          </View>
          <View style  = {{flex:.25}}></View>
          <Text style = {styles.title11}>{this.state.betView}</Text>
          <View style  = {{flex:.5}}></View>

          {frontHeading}
          {front}

          {backHeading}
          {back}
          <View style = {{flex:4}}/>
          <View style = {styles.row}>
            <Button text={'Front 9 Bets'} onPress={()=>this.setState({betView: 'Front 9 Bets'})}/>
            <Button text={'18 hole Bets'} onPress={()=>this.setState({betView: '18 Hole Bets'})}/>
            <Button text={'Back 9 Bets'} onPress={()=>this.setState({betView: 'Back 9 Bets'})}/>
          </View>
          <View style = {{flex:1}}/>
          <View style = {styles.container}>
            <Button text={'Current Totals'} onPress={()=>this.setState({viewTotals: true})}/>
          </View>
        </View>
      );
    }
  },
  renderMatchPlayResults: function(results){
    var name1;
    var name2;
    var nameheading1;
    if (this.props.route.playerCount===2){
      name1 = this.props.route.player1Name;
      name2 = this.props.route.player2Name;
      nameheading1 = this.props.route.player1Name + ' vs. ' + this.props.route.player2Name;
    }
    if (this.props.route.playerCount===4){
      name1 = this.props.route[`player${this.props.route.teams[0]}Name`].slice(0,1)+' & '+ this.props.route[`player${this.props.route.teams[1]}Name`].slice(0,1);
      name2 = this.props.route[`player${this.props.route.teams[2]}Name`].slice(0,1)+' & '+ this.props.route[`player${this.props.route.teams[3]}Name`].slice(0,1);
      nameheading1 = this.props.route[`player${this.props.route.teams[0]}Name`]+' & '+ this.props.route[`player${this.props.route.teams[1]}Name`] + " vs. " + this.props.route[`player${this.props.route.teams[2]}Name`]+' & '+ this.props.route[`player${this.props.route.teams[3]}Name`];
    }
    var self = this;
    var front = results.map(function(element, index){
      return(
        <View key = {index}style = {styles.row}>
          <Text style = {styles.title5}>{name1}</Text>
          {self.betResults(element.slice(0,9))}
        </View>
      );
    });
    var back = results.map(function(element, index){
      return(
        <View key = {index} style = {styles.row}>
          <Text style = {styles.title5}>{name1}</Text>
          {self.betResults(element.slice(9))}
        </View>
      );
    });
    return (
      <View style = {{flex:3}}>
        <View style  = {{flex:.75, justifyContent:"center", alignItems: "center", borderRadius:5}}>
          <Text style = {styles.title1}>{nameheading1}</Text>
        </View>
        <Text style = {styles.title6}></Text>
        <Text style = {styles.title6}>Front Nine</Text>
        <View style = {styles.row}>
          <Text style = {styles.title2}>Hole #</Text>
          {this.holesFront()}
        </View>
        {front}
        <View style = {{flex:1}}/>
        <Text style = {styles.title6}>Back Nine</Text>
        <View style = {styles.row}>
          <Text style = {styles.title2}>Hole #</Text>
          {this.holesBack()}
        </View>
        {back}
        <View style = {{flex:5}}/>
      </View>
    );
  },

  renderTotals: function(resultsArray, nameheading1){
      var self = this;

      if (this.props.route.gameSelected === 'Nassau'){
        var totals = resultsArray[0]+resultsArray[1]+resultsArray[2];
        return(
          <View style = {{flex:1}}>
            <View style  = {{flex:.75, justifyContent:"center", alignItems: "center", borderRadius:5}}>
              <Text style = {styles.title1}>{nameheading1}</Text>
            </View>
            <View style  = {{flex:.75, justifyContent:"center"}}>
              <Text style = {styles.title13}>Current State of Points Won/Lost</Text>
            </View>
            <View style = {styles.row2}>
              <Text style = {styles.title12}>Front 9 Bets</Text>
              <Text style = {styles.title9}>{resultsArray[0]}</Text>
            </View>
            <View style = {styles.row2}>
              <Text style = {styles.title12}>Back 9 Bets</Text>
              <Text style = {styles.title9}>{resultsArray[1]}</Text>
            </View>
            <View style = {styles.row2}>
              <Text style = {styles.title12}>18 hole Bets</Text>
              <Text style = {styles.title9}>{resultsArray[2]}</Text>
            </View>
            <View style = {styles.row2}>
              <Text style = {styles.title12}>Totals</Text>
              <Text style = {styles.title9}>{totals}</Text>
            </View>
            <View style = {{flex:1}}/>
            <View style = {styles.container}>
              <Button text={'Results by Hole'} onPress={()=>this.setState({viewTotals: false})}/>
            </View>
            <View style = {{flex:1}}/>
          </View>
        );
      }
      var totals  = resultsArray.map(function(element){
        return (
          element.reduce(function(sum, points){
          return sum + points;
          },0)
        );
      });
      console.log('totals', totals);
      var results = totals.map(function(element, index){
        return(
          <View key = {index} style = {styles.row2}>
            <Text style = {styles.title8}>{self.props.route[`player${index+1}Name`]}</Text>
            <Text style = {styles.title9}>{element}</Text>
          </View>
        );
      });
      console.log('results',results);
      return (
        <View style = {{flex:1}}>
          {results}
          <View style = {{flex:1}}/>
          <View style = {styles.container}>
            <Button text={'Results by Hole'} onPress={()=>this.setState({viewTotals: false})}/>
          </View>
          <View style = {{flex:1}}/>
        </View>
      );
  },

  renderContent: function(){
    return (
      <Image source={this.state.image} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style  = {{flex:.10}}></View>
        <View style  = {{flex:.75, justifyContent:"center", alignItems: "center", borderRadius:5}}>
          <Text style = {styles.title1}>Results for {this.props.route.gameSelected} through Hole {this.props.route.holeNumber}</Text>
        </View>
        <View style  = {{flex: (this.props.route.gameSelected === 'Nassau') ? 7 : 5}}>
        {this[`render${this.props.route.gameSelected}`]()}
        </View>
        <View style  = {{flex: (this.props.route.gameSelected === 'Nassau') ? .5 : 1}}></View>
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
    alignSelf: 'center'
  },
  title1: {
    color: 'white',
    fontSize: 15,
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: "darkolivegreen",
    borderRadius: 5,
    padding: 10,
    borderColor: 'darkgreen',
    fontWeight: "500",
    opacity: 0.8
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
    color:'white',
    fontSize: 17,
    textAlign: 'center',
    alignSelf: "center",
    justifyContent:"center",
    backgroundColor: "darkolivegreen",
    borderRadius: 5,
    padding: 5,
    fontWeight: "500",
    width: 150,
    borderColor: 'white',
    borderWidth: 1
  },
  title8: {
    color:'white',
    fontSize: 17,
    width:90,
  },
  title9: {
    color:'white',
    fontSize: 17,
  },
  title10: {
    color:'white',
    fontSize: 14,
    width:90,
    height:16,
    marginTop: 1,
    marginBottom: 1,
    marginLeft:1
  },
  title11: {
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: "darkolivegreen",
    borderRadius: 5,
    padding: 2,
    borderColor: 'darkgreen',
    fontWeight: "500",
    opacity: 0.8
  },
  title12: {
    color:'white',
    fontSize: 17,
    width:100,
  },
  title13: {
    color:'yellowgreen',
    fontSize: 14,
    alignSelf:"center"
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
    backgroundColor: "black",
    opacity: 0.7,
    flex: .6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container1: {
    flex: .25,
    alignItems: 'center',
    justifyContent: 'center',
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
  row2:{
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
