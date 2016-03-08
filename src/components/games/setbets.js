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

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'setbets',
      indexUsed: false,
      scoreAdj1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      scoreAdj2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      scoreAdj3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      scoreAdj4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      player1Hcp: null,
      player2Hcp: null,
      player3Hcp: null,
      player4Hcp: null,
      betFrontNassau: null,
      betBackNassau: null,
      betTotalNassau: null,
      auto9: false,
      auto18: false,
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
  renderPlayerIndex: function(){
    var players = [];
    for (var i = 1; i <= this.props.route.playerCount; i++){
      if (i===1){
        players.push(<PlayerIndex key = {i} text = {this.props.route.data.name} value = {this.state.player1Hcp} onChangeText = {(text)=> this.setState({player1Hcp: text})}/>);
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
              value  = {this.props.value}
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
              value  = {this.props.value}
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
  },
  renderTeams: function(){
    var game = this.props.route.gameSelected;
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
          <Text style={styles.label}>{this.props.route.data.name} and  {this.props.route[`player${this.state.teams[1]}Name`]}</Text>
          <Text style={styles.label}>vs.</Text>
          <Text style={styles.label}>{this.props.route[`player${this.state.teams[2]}Name`]} and {this.props.route[`player${this.state.teams[3]}Name`]}</Text>
          <Text style={styles.label}></Text>
          <TouchableHighlight
            onPress={()=>this.setState({teamMember: null})}>
            <Text style={styles.labelchange}>Change Partners</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    }





  },
  renderTeamSelected: function(){
    // if (this.state.teamMember === 2){this.setState({teams:[1,2,3,4]});}
    // if (this.state.teamMember === 3){this.setState({teams:[1,3,2,4]});}
    // if (this.state.teamMember === 4){this.setState({teams:[1,4,2,3]});}
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
          <Text style={styles.label}>Use Handicaps</Text>
          <Switch
          onValueChange={(value) => this.setState({indexUsed: value})}
          value={this.state.indexUsed} />
          {this.renderIndexUsed()}
        </View>
        <View style = {{flex:1}}>
          {this.renderBets()}
        </View>
        <View style = {{flex:1}}>
          {this.renderTeams()}
        </View>
        <View style = {styles.container}>
        <Button text={"Submit"} onPress={this.onSubmit}/>
        </View>
    </Image>
    );
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
    width: 50,
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
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    marginBottom:(Platform.OS === 'ios') ? 40 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },

});
