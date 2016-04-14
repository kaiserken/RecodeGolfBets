var React  = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  Image,
} = React;

var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {

    return {
      selectedTab: 'scorecard',


    };
  },
  holesFront: function(){
    var holesfront = [1,2,3,4,5,6,7,8,9].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title12}>{element}</Text>
      );
    });
    return (holesfront);

  },

  parFront: function(){
    var parfront  = this.props.route.course.coursepar.slice(0,9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title10}>{element}</Text>
      );
    });
    return (parfront);
  },

  parBack: function(){
    var parback  = this.props.route.course.coursepar.slice(9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title10}>{element}</Text>
      );
    });
    return (parback);
  },

  hcpFront: function(){
    var hcpfront  = this.props.route.course.coursehcp.slice(0,9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (hcpfront);
  },

  hcpBack: function(){
    var hcpback  = this.props.route.course.coursehcp.slice(9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (hcpback);
  },

  holesBack: function(){
    var holesback = [10,11,12,13,14,15,16,17,18].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title12}>{element}</Text>
      );
    });
    return (holesback);
  },

  holesTotal: function(){
    var titles = [];
    if (this.props.route.indexUsed === true){
      titles = ['Hdcp', 'Front', 'Back', 'Total'];
    } else {
      titles = ['Front', 'Back', 'Total'];
    }
    var holesback = titles.map(function(element, index){
      return (
        <Text key = {index} style = {styles.title7}>{element}</Text>
      );
    });
    return (holesback);
  },

  scoreResults: function(resultsArray){
    var playerResults = [];

    for (var i = 0; i<9; i++){
    playerResults.push(
      <View key  = {i} style = {styles.andoidfix}>
        <Text  style = {styles.title4}>{resultsArray[i]}</Text>
      </View>
    );
    }

    return (playerResults);
  },


  renderScores: function(){
    var scoresFront  = [];
    var scoresBack = [];
    var scoresTotal = [];
    for (var i = 1; i<=this.props.route.playerCount; i++){
      scoresFront.push(this.props.route[`player${i}Score`].slice(0,9));
      scoresTotal.push([]);
      var hcp = this.props.route[`scoreAdj${i}`].reduce(function(sum, element){
        return sum + element;
      }, 0);
      if (this.props.route.indexUsed === true){scoresTotal[i-1].push(hcp);}
      scoresTotal[i-1].push(this.props.route[`player${i}Score`].slice(0,9).reduce(function(sum, score){
        return sum + score;
      }, 0));
      while (scoresFront[i-1].length<9){scoresFront[i-1].push('');}
      scoresBack.push(this.props.route[`player${i}Score`].slice(9));
      scoresTotal[i-1].push(this.props.route[`player${i}Score`].slice(9).reduce(function(sum, score){
        return sum + score;
      }, 0));
      while (scoresBack[i-1].length<9){scoresBack[i-1].push('');}
      scoresTotal[i-1].push(this.props.route[`player${i}Score`].reduce(function(sum, score){
        return sum + score;
      }, 0));
    }
    return this.renderResults(scoresFront, scoresBack, scoresTotal);

  },
  renderResults: function(scoresFront, scoresBack, scoresTotal){

      var self = this;
      var front = scoresFront.map(function(element, index){
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>

            {self.scoreResults(element)}

          </View>
        );
      });
      var back = scoresBack.map(function(element, index){
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
            {self.scoreResults(element)}
          </View>
        );
      });
      var totals = scoresTotal.map(function(element, index){
        if (self.props.route.indexUsed === false){
          return(
            <View key = {index} style = {styles.row}>
              <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[0]}</Text>
              </View>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[1]}</Text>
              </View>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[2]}</Text>
              </View>
            </View>
          );
        } else {
          return(
            <View key = {index} style = {styles.row}>
              <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[0]}</Text>
              </View>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[1]}</Text>
              </View>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[2]}</Text>
              </View>
              <View style = {styles.androidfix2}>
                <Text style = {styles.title8}>{element[3]}</Text>
              </View>
            </View>
          );
        }
      });

      return (
        <View style = {{flex:3}}>
          <View style = {{flex:1}}/>
          <Text style = {styles.title6}>Front Nine</Text>
          <View style = {styles.row3}>
            <Text style = {styles.title11}>Hole</Text>
            {this.holesFront()}
          </View>
          <View style = {styles.row2}>
            <Text style = {styles.title9}>Par</Text>
            {this.parFront()}
          </View>
          <View style = {styles.row4}>
            <Text style = {styles.title2}>Hcp</Text>
            {this.hcpFront()}
          </View>
          <View style = {{flex:.1}}/>
          {front}
          <View style = {{flex:1}}/>
          <Text style = {styles.title6}>Back Nine</Text>
          <View style = {styles.row3}>
            <Text style = {styles.title11}>Hole</Text>
            {this.holesBack()}
          </View>
          <View style = {styles.row2}>
            <Text style = {styles.title9}>Par</Text>
            {this.parBack()}
          </View>
          <View style = {styles.row4}>
            <Text style = {styles.title2}>Hcp</Text>
            {this.hcpBack()}
          </View>
          <View style = {{flex:.1}}/>
          {back}
          <View style = {{flex:1}}/>
          <View style = {styles.row}>
            <Text style = {styles.title2}>Totals</Text>
            {this.holesTotal()}
          </View>
          {totals}
          <View style = {{flex:2}}/>
        </View>
      );

  },


  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style = {{flex: 6}}>
        {this.renderScores()}
        </View>
      </Image>
    );
  },

  render: function(){
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Current Hole</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.onBetResults()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Match/Bets</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.setState({selectedTab: 'scorecard'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Scorecard</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.onEndRound()}>
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
          title="End Round"
          icon = {require('../../assets/quit.png')}
          selected={this.state.selectedTab === 'endround'}
          onPress={() => {
            this.onEndRound();
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Match/Bets"
          icon = {require('../../assets/bets.png')}
          selected={this.state.selectedTab === 'betresults'}
          onPress={() => {
            this.onBetResults();
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Scorecard"
          icon = {require('../../assets/Pencil.png')}
          selected={this.state.selectedTab === 'scorecard'}
          onPress={() => {
            this.setState({
              selectedTab: 'scorecard',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Current Hole"
          icon = {require('../../assets/golf.png')}
          selected={this.state.selectedTab === 'currenthole'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
  onBetResults: function(){


    this.props.navigator.push({
      name: 'betresults',
      data: this.props.route.data,
      course:this.props.route.course,
      playerCount: this.props.route.playerCount,
      player1Name: this.props.route.player1Name,
      player2Name: this.props.route.player2Name,
      player3Name: this.props.route.player3Name,
      player4Name: this.props.route.player4Name,
      gameSelected: this.props.route.gameSelected,
      indexUsed: this.props.route.indexUsed,
      scoreAdj1: this.props.route.scoreAdj1,
      scoreAdj2: this.props.route.scoreAdj2,
      scoreAdj3: this.props.route.scoreAdj3,
      scoreAdj4: this.props.route.scoreAdj4,
      betFrontNassau: this.props.route.betFrontNassau,
      betBackNassau: this.props.route.betBackNassau,
      betTotalNassau: this.props.route.betTotalNassau,
      betLowScore: this.props.route.betLowScore,
      betLowTotal: this.props.route.betLowTotal,
      skinsBet: this.props.route.skinsBet,
      auto9: this.props.route.auto9,
      auto18: this.props.route.auto18,
      lowScore: this.props.route.lowScore,
      lowTotal: this.props.route.lowTotal,
      skinsCarry: this.props.route.skinsCarry,
      teamMember: this.props.route.teamMember,
      teams:this.props.route.teams,
      player1Score: this.props.route.betScoreP1,
      player2Score: this.props.route.betScoreP2,
      player3Score: this.props.route.betScoreP3,
      player4Score: this.props.route.betScoreP4,
      player1NetScore: this.props.route.betNetScoreP1,
      player2NetScore: this.props.route.betNetScoreP2,
      player3NetScore: this.props.route.betNetScoreP3,
      player4NetScore: this.props.route.betNetScoreP4,
      holeNumber: this.props.route.holeNumber-1,
      startHole: this.props.route.startHole
    });
  },
  onEndRound: function(){
    this.props.navigator.push({
      name: 'endround',
      data: this.props.route.data,
      course:this.props.route.course,
      playerCount: this.props.route.playerCount,
      player1Name: this.props.route.player1Name,
      player2Name: this.props.route.player2Name,
      player3Name: this.props.route.player3Name,
      player4Name: this.props.route.player4Name,
      player1Score: this.props.route.player1Score,
      player2Score: this.props.route.player2Score,
      player3Score: this.props.route.player3Score,
      player4Score:this.props.route.player4Score,
      player1NetScore: this.props.route.player1NetScore,
      player2NetScore: this.props.route.player2NetScore,
      player3NetScore: this.props.route.player3NetScore,
      player4NetScore: this.props.route.player4NetScore,
      gameSelected: this.props.route.gameSelected,
      indexUsed: this.props.route.indexUsed,
      betFrontNassau: this.props.route.betFrontNassau,
      betBackNassau: this.props.route.betBackNassau,
      betTotalNassau: this.props.route.betTotalNassau,
      betLowScore: this.props.route.betLowScore,
      betLowTotal: this.props.route.betLowTotal,
      skinsBet: this.props.route.skinsBet,
      auto9: this.props.route.auto9,
      auto18: this.props.route.auto18,
      lowScore: this.props.route.lowScore,
      lowTotal: this.props.route.lowTotal,
      skinsCarry: this.props.route.skinsCarry,
      teamMember: this.props.route.teamMember,
      teams:this.props.route.teams,
      holeNumber: this.props.route.holeNumber-1,
      betScoreP1: this.props.route.betScoreP1,
      betScoreP2: this.props.route.betScoreP2,
      betScoreP3: this.props.route.betScoreP3,
      betScoreP4: this.props.route.betScoreP4,
      betNetScoreP1: this.props.route.betNetScoreP1,
      betNetScoreP2: this.props.route.betNetScoreP2,
      betNetScoreP3: this.props.route.betNetScoreP3,
      betNetScoreP4: this.props.route.betNetScoreP4
    });
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
  andoidfix: {
    backgroundColor: "darkolivegreen",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 3,
    width:20,
    height:16,
    alignItems: "center",
    justifyContent: 'center'
  },
  title4: {
    color:'white',
    fontWeight: "400",
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
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
  androidfix2: {
    backgroundColor: "darkolivegreen",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 3,
    width:50,
    height:17,
    justifyContent:"center",
    alignItems:"center"
  },
  title8: {
    color:'white',
    fontWeight: "400",
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',

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
