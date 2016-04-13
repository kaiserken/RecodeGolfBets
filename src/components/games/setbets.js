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
  Image,
  TextInput
} = React;

var Button = require('../common/button');
var PlayerIndex = require('./playerindex');
var Strokes  = require('../common/strokes');
var Random  = require('../common/random');
var ScoreAdjust = require('../common/scoreadjust');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'setbets',
      indexUsed: false,
      player1Hcp: null,
      player2Hcp: null,
      player3Hcp: null,
      player4Hcp: null,
      scoreAdj1: [],
      scoreAdj2: [],
      scoreAdj3: [],
      scoreAdj4: [],
      betFrontNassau: null,
      betBackNassau: null,
      betTotalNassau: null,
      betLowScore: null,
      betLowTotal: null,
      skinsBet: null,
      auto9: false,
      auto18: false,
      lowScore: false,
      lowTotal: false,
      skinsCarry: false,
      teamMember: null,
      teams:[],
      hcpValid: true,
      hcpAlert: 1
    };
  },
  renderIndexUsed: function(){
    if (this.state.indexUsed === true){
      return (
        <View>
          {this.renderPlayerIndex()}
        </View>
      );
    }
  },
  componentDidMount: function(){
    if (this.props.route.gameSelected === "RoundRobin"){
      this.setState({teams: Random()});
    }
  },
  renderPlayerIndex: function(){

    var players = [];
    for (var i = 1; i <= this.props.route.playerCount; i++){
      if (i===1){
        players.push(<PlayerIndex key = {i} text = {this.props.route.player1Name} value = {this.state.player1Hcp} onChangeText = {(text)=> this.setState({player1Hcp: text})}/>);
      }
      if (i===2){
        players.push(<PlayerIndex key = {i} text = {this.props.route.player2Name} value = {this.state.player2Hcp} onChangeText = {(text)=> this.setState({player2Hcp: text})}/>);
      }
      if (i===3){
        players.push(<PlayerIndex key = {i} text = {this.props.route.player3Name} value = {this.state.player3Hcp} onChangeText = {(text)=> this.setState({player3Hcp: text})}/>);
      }
      if (i===4){
        players.push(<PlayerIndex key = {i} text = {this.props.route.player4Name} value = {this.state.player4Hcp} onChangeText = {(text)=> this.setState({player4Hcp: text})}/>);
      }
    }

    return (
      <View>
      {players}
      </View>
    );
  },

  renderBets: function(){
    var game = this.props.route.gameSelected;
    if (game === "Nassau"){
      return(
        <View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Front/Back Nine Bet (pts)</Text>
            <TextInput
              style  = {styles.input}
              placeholder = "Pts"
              keyboardType = 'numbers-and-punctuation'
              value  = {this.state.betFrontNassau}
              onChangeText = {(text)=>this.setState({betFrontNassau: text, betBackNassau: text})}
              />
          </View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Auto press 9 hole bets</Text>
            <Switch
            onValueChange={(value) => this.setState({auto9: value})}
            value={this.state.auto9} />
          </View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>18 hole Bet (pts)</Text>
            <TextInput
              style  = {styles.input}
              placeholder = "Pts"
              keyboardType = 'numbers-and-punctuation'
              value  = {this.state.betTotalNassau}
              onChangeText = {(text)=>this.setState({betTotalNassau: text})}
              />
          </View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Auto press 18 hole bets</Text>
            <Switch
            onValueChange={(value) => this.setState({auto18: value})}
            value={this.state.auto18} />
          </View>
        </View>
      );
    }
    if (game === "RoundRobin"){
      return(
        <View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Use Low Score Bet</Text>
            <Switch
            onValueChange={(value) => this.setState({lowScore: value})}
            value={this.state.lowScore} />
          </View>
          {this.renderLowScoreBet()}
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Use Low Total Bet</Text>
            <Switch
            onValueChange={(value) => this.setState({lowTotal: value})}
            value={this.state.lowTotal} />
          </View>
          {this.renderLowTotalBet()}
        </View>
      );
    }
    if (game === "Skins"){
      return(
        <View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Skin Bet per Player (pts)</Text>
            <TextInput
              style  = {styles.input}
              placeholder = "Pts"
              keyboardType = 'numbers-and-punctuation'
              value  = {this.state.skinsBet}
              onChangeText = {(text)=>this.setState({skinsBet: text})}
              />
          </View>
          <View style = {styles.row}>
            <Text style={styles.labelnassau}>Skins Carry On Ties</Text>
            <Switch
            onValueChange={(value) => this.setState({skinsCarry: value})}
            value={this.state.skinsCarry} />
          </View>
        </View>
      );
    }
    if (game === "Nines"){
      return(
          <View style = {styles.container}>
            <Text style={styles.label}>Each Hole is worth 9 points</Text>
          </View>
      );
    }
  },
  renderLowScoreBet: function(){
    if (this.state.lowScore === true){
      return (
        <View style = {styles.row}>
          <Text style={styles.labelnassau}>Low Score Bet per Player (pts)</Text>
          <TextInput
            style  = {styles.input}
            placeholder = "Pts"
            keyboardType = 'numbers-and-punctuation'
            value  = {this.state.betLowScore}
            onChangeText = {(text)=>this.setState({betLowScore: text})}
            />
        </View>
      );
    }
  },
  renderLowTotalBet: function(){
    if (this.state.lowTotal === true){
      return (
        <View style = {styles.row}>
          <Text style={styles.labelnassau}>Low Total Bet per Player (pts)</Text>
          <TextInput
            style  = {styles.input}
            placeholder = "Pts"
            keyboardType = 'numbers-and-punctuation'
            value  = {this.state.betLowTotal}
            onChangeText = {(text)=>this.setState({betLowTotal: text})}
            />
        </View>
      );
    }
  },
  renderTeams: function(){
    var rrTeams  = Random();
    var game = this.props.route.gameSelected;
    if (game === "RoundRobin"){
      return (
      <View style = {{flex:1}}>
        <View style = {styles.row}>
          <View>
            <Text style={styles.labelrr}>Holes 1-6</Text>
            <Text style={styles.labelrr}>------------</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[0]}Name`]} &</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[1]}Name`]}</Text>
            <Text style={styles.labelrr}>vs.</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[2]}Name`]} &</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[3]}Name`]}</Text>
          </View>
          <View>
            <Text style={styles.labelrr}>Holes 7-12</Text>
            <Text style={styles.labelrr}>------------</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[4]}Name`]} &</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[5]}Name`]}</Text>
            <Text style={styles.labelrr}>vs.</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[6]}Name`]} &</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[7]}Name`]}</Text>
          </View>
          <View>
            <Text style={styles.labelrr}>Holes 13-18</Text>
            <Text style={styles.labelrr}>-----------</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[8]}Name`]} &</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[9]}Name`]}</Text>
            <Text style={styles.labelrr}>vs.</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[10]}Name`]} &</Text>
            <Text style={styles.labelrr}>{this.props.route[`player${this.state.teams[11]}Name`]}</Text>
          </View>
        </View>
      </View>
    );
    }
    if (this.props.route.playerCount === 4 && this.state.teamMember === null && (game === 'Nassau' || game === "MatchPlay")){
      return (
      <View style = {{flex:1}}>
        <View style  = {styles.container}>
          <Text style = {styles.label} >Select your Partner to Form Teams</Text>
        </View>
        <View style = {styles.row}>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: 2, teams:[1,2,3,4,1,2,3,4,1,2,3,4]})}>
            <Text style={styles.labelchange}>{this.props.route.player2Name}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: 3, teams:[1,3,2,4,1,3,2,4,1,3,2,4]})}>
            <Text style={styles.labelchange}>{this.props.route.player3Name}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: 4, teams:[1,4,2,3,1,4,2,3,1,4,2,3]})}>
            <Text style={styles.labelchange}>{this.props.route.player4Name}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    }
    if (this.props.route.playerCount === 4 && (game === 'Nassau' || game === "MatchPlay")){
      return (
      <View style = {{flex:1}}>
        <View style  = {styles.container}>
          <Text style={styles.label}>{this.props.route[`player${this.state.teams[0]}Name`]} & {this.props.route[`player${this.state.teams[1]}Name`]}</Text>
          <Text style={styles.label}>vs.</Text>
          <Text style={styles.label}>{this.props.route[`player${this.state.teams[2]}Name`]} & {this.props.route[`player${this.state.teams[3]}Name`]}</Text>
          <Text style={styles.label}></Text>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: null})}>
            <Text style={styles.labelchange}>Change Partners</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    }
    if (this.props.route.playerCount === 2 && (game === 'Nassau' || game === "MatchPlay")){
      return (
      <View style = {{flex:1}}>
        <View style  = {styles.container}>
          <Text style={styles.label}>{this.props.route.player1Name}</Text>
          <Text style={styles.label}>vs.</Text>
          <Text style={styles.label}>{this.props.route.player2Name}</Text>
        </View>
      </View>
    );
    }
  },
  renderStrokes: function(){
    var game = this.props.route.gameSelected;
    var strokes;
    if ((this.state.indexUsed === true && this.props.route.playerCount === 4 && this.state.player1Hcp && this.state.player2Hcp && this.state.player3Hcp && this.state.player4Hcp) && (game === "Nassau" || game === "MatchPlay")){
      strokes = Strokes(this.props.route.playerCount, Math.round(parseFloat(this.state.player1Hcp)), Math.round(parseFloat(this.state.player2Hcp)), Math.round(parseFloat(this.state.player3Hcp)), Math.round(parseFloat(this.state.player4Hcp)));

      return (
        <View style = {styles.row2}>
          <View>
            <Text style={styles.labelstrokes}>{this.props.route.player1Name} gets {strokes[0]} strokes</Text>
            <Text style={styles.labelstrokes}>{this.props.route.player2Name} gets {strokes[1]} strokes</Text>
          </View>
          <View>
            <Text style={styles.labelstrokes}>{this.props.route.player3Name} gets {strokes[2]} strokes</Text>
            <Text style={styles.labelstrokes}>{this.props.route.player4Name} gets {strokes[3]} strokes</Text>
          </View>
        </View>
      );
    }
    if ((this.state.indexUsed === true && this.props.route.playerCount === 2 && this.state.player1Hcp && this.state.player2Hcp)&& (game === "Nassau" || game === "MatchPlay")){
      strokes = Strokes(this.props.route.playerCount, Math.round(parseFloat(this.state.player1Hcp)), Math.round(parseFloat(this.state.player2Hcp)), Math.round(parseFloat(this.state.player3Hcp)), Math.round(parseFloat(this.state.player4Hcp)));

      return (
        <View style = {styles.row2}>
          <View>
            <Text style={styles.labelstrokes}>{this.props.route.player1Name} gets {strokes[0]} strokes</Text>
          </View>
          <View>
            <Text style={styles.labelstrokes}>{this.props.route.player2Name} gets {strokes[1]} strokes</Text>
          </View>
        </View>
      );
    }
    if (this.state.indexUsed === true && game !== "Nassau" && game !== "MatchPlay"){
      return (
        <View style = {styles.row2}>
          <View>
            <Text style={styles.labelrr}>Each player strokes according to thier</Text>
            <Text style={styles.labelrr}>own index in {game}</Text>
          </View>
        </View>
      );
    }
  },



  renderContent: function(){


    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.container}>
          <Text style={styles.title}>{this.props.route.gameSelected}</Text>
        </View>
        <View style = {styles.row}>
          <View>
          <Text style={{width: (this.state.indexUsed === true) ? 100 : 200, color: 'white'}}>Use Handicaps</Text>
          <TouchableHighlight style={{width: (this.state.indexUsed === true) ? 100 :200}}
            onPress={()=>Alert.alert('Handicaps','If you are a plus index - meaning that your index is below par - enter your index as negative number. A golfers Handicap Index allows the golfer to compete with other golfers on a level playing field, regardless of their playing ability. It is rare to have a plus index. Plus indexes are the realm of golf professionals and very skilled players. Most players will have an index between 0 and 36',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}]
              )}>
              <Text style={styles.more}>more...</Text>
          </TouchableHighlight>
          </View>
          <Switch
          onValueChange={(value) => this.setState({indexUsed: value})}
          value={this.state.indexUsed} />
          {this.renderIndexUsed()}
        </View>
        {this.renderStrokes()}
        {this.renderBets()}
        <View style = {{flex:1}}>
          {this.renderTeams()}
        </View>
        <View style = {styles.container}>
        <Button text={"Submit"} onPress={this.onSubmit}/>
        </View>
    </Image>
    );
  },

  onSubmit: function(){
    var game = this.props.route.gameSelected;
    //Validation checks
    if (this.state.indexUsed === true){
      this.setState({hcpValid: true});
      for (var i = 1; i<= this.props.route.playerCount; i++){
          if (isNaN(Math.round(parseFloat(this.state[`player${i}Hcp`])))){
            this.setState({hcpValid:false});
          }
          if (Math.round(parseFloat(this.state[`player${i}Hcp`]))>36 || Math.round(parseFloat(this.state[`player${i}Hcp`]))<-12){
            this.setState({hcpValid:false});
          }
          if (this.state.hcpValid === false) {
            break;
          }
      }
      if (this.state.hcpValid === false){
        Alert.alert('Handicap Indexes','Each player must have a valid number as an index between -12 and 36',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}]
        );
        return;
      }
    }

    if (game === "Nassau"){
      if (isNaN(parseInt(this.state.betFrontNassau)) || isNaN(parseInt(this.state.betTotalNassau)) ){
        Alert.alert('Nassau Bets','All bets must have a points number - Enter 0 for no bet',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}]
        );
        return;
      }
      if (this.props.route.playerCount === 4){
        if (this.state.teamMember === null){
          Alert.alert('Nassau Teams','Select your Team Member',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
          return;
        }
      }
    }

    if (game === "MatchPlay"){
      if (this.props.route.playerCount === 4){
        if (this.state.teamMember === null){
          Alert.alert('MatchPlay Teams','Select your Team Member',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
          return;
        }
      }
    }

    if (game === "RoundRobin"){
      if (this.state.lowScore ===true){
        if (isNaN(parseInt(this.state.betLowScore))){
          Alert.alert('Round Robin Bets','All bets must have a valid points number - Enter 0 for no bet',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
          return;
        }
      }
      if (this.state.lowTotal ===true){
        if (isNaN(parseInt(this.state.betLowTotal))){
          Alert.alert('Round Robin Bets','All bets must have a valid points number - Enter 0 for no bet',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
          return;
        }
      }
    }
    if (game === "Skins"){
      if (isNaN(parseInt(this.state.skinsBet))){
        Alert.alert('Skins Bet','All bets must have a valid points number - Enter 0 for no bet',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}]
        );
        return;
      }
    }

    var strokes;
    if ((this.state.indexUsed === true && this.props.route.playerCount === 2 && this.state.player1Hcp && this.state.player2Hcp)&& (game === "Nassau" || game === "MatchPlay")){
      strokes = Strokes(this.props.route.playerCount, Math.round(parseFloat(this.state.player1Hcp)), Math.round(parseFloat(this.state.player2Hcp)), Math.round(parseFloat(this.state.player3Hcp)), Math.round(parseFloat(this.state.player4Hcp)));
      this.setState({
        player1Hcp: strokes[0]+'', player2Hcp: strokes[1]+''
      });
    }
    if ((this.state.indexUsed === true && this.props.route.playerCount === 4 && this.state.player1Hcp && this.state.player2Hcp && this.state.player3Hcp && this.state.player4Hcp) && (game === "Nassau" || game === "MatchPlay")){
      strokes = Strokes(this.props.route.playerCount, Math.round(parseFloat(this.state.player1Hcp)), Math.round(parseFloat(this.state.player2Hcp)), Math.round(parseFloat(this.state.player3Hcp)), Math.round(parseFloat(this.state.player4Hcp)));
      this.setState({
        player1Hcp: strokes[0]+'', player2Hcp: strokes[1]+'', player3Hcp: strokes[2]+'', player4Hcp: strokes[3]+''
      });
    }
    if (this.state.indexUsed === true){
      this.setState({
        scoreAdj1: ScoreAdjust(Math.round(parseFloat(this.state.player1Hcp)), this.props.route.course.coursehcp),
        scoreAdj2: ScoreAdjust(Math.round(parseFloat(this.state.player2Hcp)), this.props.route.course.coursehcp),
        scoreAdj3: ScoreAdjust(Math.round(parseFloat(this.state.player3Hcp)), this.props.route.course.coursehcp),
        scoreAdj4: ScoreAdjust(Math.round(parseFloat(this.state.player4Hcp)), this.props.route.course.coursehcp),
      });
    }


    this.props.navigator.push({
      name: "starthole",
      data: this.props.route.data,
      course:this.props.route.course,
      playerCount: this.props.route.playerCount,
      player1Name: this.props.route.player1Name,
      player2Name: this.props.route.player2Name,
      player3Name: this.props.route.player3Name,
      player4Name: this.props.route.player4Name,
      gameSelected: this.props.route.gameSelected,
      indexUsed: this.state.indexUsed,
      scoreAdj1: this.state.scoreAdj1,
      scoreAdj2: this.state.scoreAdj2,
      scoreAdj3: this.state.scoreAdj3,
      scoreAdj4: this.state.scoreAdj4,
      betFrontNassau: parseInt(this.state.betFrontNassau),
      betBackNassau: parseInt(this.state.betBackNassau),
      betTotalNassau: parseInt(this.state.betTotalNassau),
      betLowScore: parseInt(this.state.betLowScore),
      betLowTotal: parseInt(this.state.betLowTotal),
      skinsBet: parseInt(this.state.skinsBet),
      auto9: this.state.auto9,
      auto18: this.state.auto18,
      lowScore: this.state.lowScore,
      lowTotal: this.state.lowTotal,
      skinsCarry: this.state.skinsCarry,
      teamMember: this.state.teamMember,
      teams:this.state.teams
    });
  },

  render: function(){
    var user  = this.props.route.data;
    
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Games</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.setState({selectedTab: 'setbets'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Set Bets</Text>
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
          title="Profile"
          icon = {require('../../assets/results.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Set Bets"
          icon = {require('../../assets/money.png')}
          selected={this.state.selectedTab === 'setbets'}
          onPress={() => {
            this.setState({
              selectedTab: 'setbets',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Games"
          icon = {require('../../assets/games.png')}
          selected={this.state.selectedTab === 'games'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },



});

var styles = StyleSheet.create({
  container: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  labelchange: {
    color: 'greenyellow',
  },

  labelrr: {
    color: 'white',
    alignSelf: "center",
    fontSize: 12,
  },
  labelstrokes: {
    color: 'white',
    fontSize: 12,
  },
  label: {
    color: 'white',
  },
  labelnassau: {
    color: 'white',
    width: 200,
  },
  name: {
    color: 'white',
    width: 75
  },
  more: {
    color:'greenyellow',
    fontSize: 12,
  },
  input: {
    padding: 2,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    width: 40,
    alignSelf: 'center'
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  row2:{
    flex: .3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1
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
