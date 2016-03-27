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
var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'betresults',
      viewTotals: false
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
  renderRoundRobin: function(){
    var lowS = this.props.route.betLowScore || 0;
    var lowT = this.props.route.betLowTotal || 0;
    var results;
    if (this.props.route.indexUsed === true){
      results  = RoundRobin([this.props.route.player1NetScore, this.props.route.player2NetScore, this.props.route.player3NetScore, this.props.route.player4NetScore], this.props.route.teams, lowS, lowT);
    } else {
      results  = RoundRobin([this.props.route.player1Score, this.props.route.player2Score, this.props.route.player3Score, this.props.route.player4Score], this.props.route.teams, lowS, lowT);
    }
    if (this.state.viewTotals === true){
      return (
        this.renderTotals(results)
      );
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
          <TouchableHighlight
            onPress={()=>this.setState({viewTotals: true})}>
            <Text style={styles.title7}>See Totals</Text>
          </TouchableHighlight>
          <View style = {{flex:4}}/>
        </View>

      );
    }
  },

  renderNines: function(){
    var results;
    if (this.props.route.indexUsed === true){
      results  = Nines(this.props.route.player1NetScore, this.props.route.player2NetScore, this.props.route.player3NetScore);
    } else {
      results  = Nines(this.props.route.player1Score, this.props.route.player2Score, this.props.route.player3Score);
    }
    if (this.state.viewTotals === true){
      return (
        this.renderTotals(results)
      );
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
          <TouchableHighlight
            onPress={()=>this.setState({viewTotals: true})}>
            <Text style={styles.title7}>See Totals</Text>
          </TouchableHighlight>
          <View style = {{flex:4}}/>
        </View>

      );
    }
  },
  renderTotals: function(resultsArray){
      var self = this;
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
            <Text style = {styles.title2}></Text>
            <Text style = {styles.title9}>{element}</Text>
          </View>
        );
      });
      console.log('results',results);
      return (
        <View style = {{flex:1}}>
          {results}
          <View style = {{flex:1}}/>
          <TouchableHighlight
            onPress={()=>this.setState({viewTotals: false})}>
            <Text style={styles.title7}>Results by Hole</Text>
          </TouchableHighlight>
          <View style = {{flex:1}}/>
        </View>
      );
  },

  renderContent: function(){

    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style  = {{flex:.10}}></View>
        <View style  = {{flex:.75, justifyContent:"center", opacity:0.8}}>
          <Text style = {styles.title1}>Bet Results through Hole {this.props.route.holeNumber}</Text>
        </View>
        <View style  = {{flex:3}}>
        {this[`render${this.props.route.gameSelected}`]()}
        </View>
        <View style  = {{flex:1}}></View>
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
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: "darkolivegreen",
    borderRadius: 5,
    padding: 10,
    borderColor: 'darkgreen',
    fontWeight: "500",
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
    justifyContent: 'center',
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
