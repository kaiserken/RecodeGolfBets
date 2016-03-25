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
      teams:[]
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
    if (this.props.route.gameSelected === "Carts / Round Robin"){
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
    if (game === "Carts / Round Robin"){
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
            <Text style={styles.labelnassau}>Bet Per Skin (pts)</Text>
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
          <Text style={styles.labelnassau}>Low Score Bet (pts)</Text>
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
          <Text style={styles.labelnassau}>Low Total Bet (pts)</Text>
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
    if (game === "Carts / Round Robin"){
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
    if (this.props.route.playerCount === 4 && this.state.teamMember === null && (game === 'Nassau' || game === "Match Play")){
      return (
      <View style = {{flex:1}}>
        <View style  = {styles.container}>
          <Text style = {styles.label} >Select your Partner to Form Teams</Text>
        </View>
        <View style = {styles.row}>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: 2, teams:[1,2,3,4]})}>
            <Text style={styles.labelchange}>{this.props.route.player2Name}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: 3, teams:[1,3,2,4]})}>
            <Text style={styles.labelchange}>{this.props.route.player3Name}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: 4, teams:[1,4,2,3]})}>
            <Text style={styles.labelchange}>{this.props.route.player4Name}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    }
    if (this.props.route.playerCount === 4 && (game === 'Nassau' || game === "Match Play")){
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
    if (this.props.route.playerCount === 2 && (game === 'Nassau' || game === "Match Play")){
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
    if ((this.state.indexUsed === true && this.props.route.playerCount === 4 && this.state.player1Hcp && this.state.player2Hcp && this.state.player3Hcp && this.state.player4Hcp) && (game === "Nassau" || game === "Match Play")){
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
    if ((this.state.indexUsed === true && this.props.route.playerCount === 2 && this.state.player1Hcp && this.state.player2Hcp)&& (game === "Nassau" || game === "Match Play")){
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
    if (this.state.indexUsed === true && game !== "Nassau" && game !== "Match Play"){
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
    console.log(this.props);
    console.log(this.state);

    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.container}>
          <Text style={styles.title}>{this.props.route.gameSelected}</Text>
        </View>
        <View style = {styles.row}>
          <Text style={{width: (this.state.indexUsed === true) ? 100 : 200, color: 'white'}}>Use Handicaps</Text>
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
    if (this.state.indexUsed === true){
      this.setState({
        scoreAdj1: ScoreAdjust(Math.round(parseFloat(this.state.player1Hcp)), this.props.route.course.coursehcp),
        scoreAdj2: ScoreAdjust(Math.round(parseFloat(this.state.player2Hcp)), this.props.route.course.coursehcp),
        scoreAdj3: ScoreAdjust(Math.round(parseFloat(this.state.player3Hcp)), this.props.route.course.coursehcp),
        scoreAdj4: ScoreAdjust(Math.round(parseFloat(this.state.player4Hcp)), this.props.route.course.coursehcp),
      });
    }
    this.props.navigator.push({
      name: "hole",
      data: this.props.route.data,
      course:this.props.route.course,
      playerCount: this.props.route.playerCount,
      player1Name: this.props.route.player1Name,
      player2Name: this.props.route.player2Name, player3Name: this.props.route.player3Name,
      player4Name: this.props.route.player4Name,
      gameSelected: this.props.route.gameSelected,
      indexUsed: this.state.indexUsed,
      scoreAdj1: this.state.scoreAdj1,
      scoreAdj2: this.state.scoreAdj2,
      scoreAdj3: this.state.scoreAdj3,
      scoreAdj4: this.state.scoreAdj4,
      betFrontNassau: this.state.betFrontNassau,
      betBackNassau: this.state.betBackNassau,
      betTotalNassau: this.state.betTotalNassau,
      betLowScore: this.state.betLowScore,
      betLowTotal: this.state.betLowTotal,
      skinsBet: this.state.skinsBet,
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
    console.log(this.state);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Games</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'setbets'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Set Bets</Text>
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
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Set Bets"
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

});
