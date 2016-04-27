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
  TouchableOpacity
} = React;
var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'games',
      keepScoreSwitch: false,
      nassauSwitch: false,
      roundRobinSwitch: false,
      matchPlaySwitch: false,
      skinsSwitch: false,
      ninesSwitch: false,
    };
  },

  onRouteChange: function(route, game){
    this.props.navigator.push({name: route, data: this.props.route.data, course:this.props.route.course, playerCount: this.props.route.playerCount, player1Name: this.props.route.player1Name, player2Name: this.props.route.player2Name, player3Name: this.props.route.player3Name, player4Name: this.props.route.player4Name, gameSelected: game});
  },

  onSubmit: function(){
    // still need to check to make sure player count is accurate for chosen game

    var count = 0;
    if (this.state.keepScoreSwitch === true){count++;}
    if (this.state.nassauSwitch === true){count++;}
    if (this.state.roundRobinSwitch === true){count++;}
    if (this.state.matchPlaySwitch === true){count++;}
    if (this.state.skinsSwitch === true){count++;}
    if (this.state.ninesSwitch === true){count++;}
    if (count === 0 || count > 1){ Alert.alert('Game Options','Please select a game before submitting. Only one game may be selected',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}]
      );
    }

    if (this.state.nassauSwitch === true && count === 1){
      if (this.props.route.playerCount===2 || this.props.route.playerCount===4 ){
        this.onRouteChange('setbets', "Nassau");
      }else {
        Alert.alert('Game Options','Nassau is a 2 or 4 player Game - Go back and adjust number of players or select a different game',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
      }
    }
    if (this.state.roundRobinSwitch === true && count === 1){
      if (this.props.route.playerCount===4){
        this.onRouteChange('setbets', "RoundRobin");
      } else {
        Alert.alert('Game Options','RoundRobin/Carts is a 4 player Game - Go back and adjust number of players or select a different game',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
      }
    }
    if (this.state.matchPlaySwitch === true && count === 1){
      if (this.props.route.playerCount===2 || this.props.route.playerCount===4){
        this.onRouteChange('setbets', "MatchPlay");
      } else {
        Alert.alert('Game Options','MatchPlay is a 2 or 4 player Game - Go back and adjust number of players or select a different game',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
      }
    }
    if (this.state.skinsSwitch === true && count === 1)this.onRouteChange('setbets', "Skins");

    if (this.state.ninesSwitch === true && count === 1){
      if (this.props.route.playerCount===3){
        this.onRouteChange('setbets', "Nines");
      }else {
        Alert.alert('Game Options','Nines is a 3 player Game - Go back and adjust number of players or select a different game',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
      }
    }

    if (this.state.keepScoreSwitch === true && count === 1) this.props.navigator.push({name: 'starthole', data: this.props.route.data, course:this.props.route.course, playerCount: this.props.route.playerCount, player1Name: this.props.route.player1Name, player2Name: this.props.route.player2Name, player3Name: this.props.route.player3Name, player4Name: this.props.route.player4Name, gameSelected: "JustKeepScore", indexUsed: false, scoreAdj1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], scoreAdj2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], scoreAdj3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], scoreAdj4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],betFrontNassau: null, betBackNassau: null, betTotalNassau: null, betLowScore: null, betLowTotal: null, skinsBet: null, auto9: false, auto18: false, lowScore: false,lowTotal: false, skinsCarry: false, teamMember: null,teams:[]});
  },
  renderDrawer: function(){
    if (Platform.OS === "android"){
      return (
        <View style={{ justifyContent:'space-around', alignItems: 'center', flex: 1, flexDirection:'row', backgroundColor:"black"}}>
          <TouchableOpacity
            style={{width : 30}}
            onPress = {()=> this.refs['DRAWER_REF'].openDrawer()}>
            <View>
              <Text style  = {{fontSize:10, textAlign: "center", color: 'greenyellow'}}>Menu</Text>
              <Image source ={require('../../assets/dlist.png')}></Image>
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Select Your Game</Text>
          <Text style={{width:30}}></Text>
        </View>
      );
    } else {
      return (
        <View style = {styles.row}>
          <Text style={styles.label}>Select Your Game</Text>
        </View>
      );
    }
  },

  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        {this.renderDrawer()}
        <View style = {styles.row}>
          <Text style={styles.label}>Score </Text>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>Use this option if you want to keep score for yourself or your group without any betting games.</Text>
          </View>
          <Switch
          onValueChange={(value) => this.setState({keepScoreSwitch: value})}
          value={this.state.keepScoreSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Nassau</Text>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>2 player or 2 team game. Scoring is match play format. Seperate bets are made on front, back and total. Additional press bets are optional.</Text>
            <TouchableHighlight onPress={()=>Alert.alert('Nassau','The Nassau is one of the most common side bets on a golf course. You can play individual or team Nassaus, which are basically three bets -- front, back and overall match play. In team Nassaus it is the better ball from each team. Many players, however, play automatic two-downs, which means there is a press (e.g. a new $5 bet ) each time a side gets two holes down. A $5 Nassau, which is worth $15 overall, can easily triple if one side dominates in automatic two downs.',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}]
              )}>
              <Text style={styles.more}>more...</Text>
            </TouchableHighlight>
          </View>
          <Switch
          onValueChange={(value) => this.setState({nassauSwitch: value})}
          value={this.state.nassauSwitch} />
        </View>
        <View style = {styles.row}>
          <View>
            <Text style={styles.label}>Carts /</Text>
            <Text style={styles.label}>Round</Text>
            <Text style={styles.label}>Robin</Text>
          </View>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>4 player game. Teams change every 6 holes so everyone ends up paired. Bets are low score, low total or both.</Text>
            <TouchableHighlight onPress={()=>Alert.alert('Carts / Round Robin','Used in foursomes, this is a match-play game where you change partners each six holes for three separate bets. Bets do not carry when the groups change. Common bets are low score, low total for groups or both',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}]
              )}>
              <Text style={styles.more}>more...</Text>
            </TouchableHighlight>
          </View>
          <Switch
          onValueChange={(value) => this.setState({roundRobinSwitch: value})}
          value={this.state.roundRobinSwitch} />
        </View>
        <View style = {styles.row}>
          <View>
            <Text style={styles.label}>Match</Text>
            <Text style={styles.label}>Play</Text>
          </View>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>2 player or 2 team game. Each hole is worth 1 point and is either won, lost or halved.</Text>
            <TouchableHighlight onPress={()=>Alert.alert('Match Play','Match play is a scoring system for golf in which a player, or team, earns a point for each hole in which they have beat thier opponents. Scoring consists of individual holes won, halved or lost. On each hole, the most that can be gained is one point. The golfer with the lowest score on a given hole receives one point. If the golfers tie, then the hole is halved. Once a player is "up" more holes than there are holes remaining to play the match is over. For example, if after 12 holes Player A is 7-up with six left to play, Player A is said to have won the match "7 and 6".',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}]
              )}>
              <Text style={styles.more}>more...</Text>
            </TouchableHighlight>
          </View>
          <Switch
          onValueChange={(value) => this.setState({matchPlaySwitch: value})}
          value={this.state.matchPlaySwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Skins </Text>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>2 to 4 player game. Each hole is worth a skin and can only be won with a single low score on that hole. Skins not won are carried to the next hole.</Text>
            <TouchableHighlight onPress={()=>Alert.alert('Skins','The best score on each hole wins the points for that hole as long as there is not a tie. Points can roll over if there are ties for the best scores. That leaves an opportunity for the vulture, who could have 10 bad holes in a row, but pick the right moment to record a crucial birdie.',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}]
              )}>
              <Text style={styles.more}>more...</Text>
            </TouchableHighlight>
          </View>
          <Switch
          onValueChange={(value) => this.setState({skinsSwitch: value})}
          value={this.state.skinsSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Nines</Text>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>3 player game. Each hole is worth 9 points. If one player makes birdie, for example, and two others make par, it is 5-2-2 respectively.</Text>
            <TouchableHighlight onPress={()=>Alert.alert('Nines','Nines is an ideal game for threesomes. Basically each hole is worth nine points, with points being divided according to order of finish on each hole. If one player makes birdie, for example, another makes par and the third makes bogey, it is 5-3-1 respectively. If all three players make par, however, each player gets three points. If one player makes birdie and the other two pars, then the player with the birdie is awarded five points with the other two getting two points each. (It always adds up to nine.) Conceivably, a great performance by one player or poor one for another could prove lucrative or costly, but this game usually has a way of evening out at the end.',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}]
              )}>
              <Text style={styles.more}>more...</Text>
            </TouchableHighlight>
          </View>
          <Switch
          onValueChange={(value) => this.setState({ninesSwitch: value})}
          value={this.state.ninesSwitch} />
        </View>
        <View style = {styles.row}>
        <Button text={"Submit"} onPress={this.onSubmit}/>
        </View>
    </Image>
    );
  },

  render: function(){
    var user  = this.props.route.data;
    console.log(this.state);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Players</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.props.navigator.push({name: 'profile', data: user}), this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.setState({selectedTab: 'games'}), this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Games</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
      return (
        <DrawerLayoutAndroid
          ref = {'DRAWER_REF'}
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
          title="Games"
          icon = {require('../../assets/games.png')}
          selected={this.state.selectedTab === 'games'}
          onPress={() => {
            this.setState({
              selectedTab: 'games',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Players"
          icon = {require('../../assets/players.png')}
          selected={this.state.selectedTab === 'players'}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white',
  },
  more: {
    color:'greenyellow',
    fontSize: 10,
  },
  descriptionWidth: {
    width: 210,
  },
  description: {
    color: 'white',
    fontSize: 11,
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
  android1: {
    backgroundColor: "darkolivegreen",
    borderTopWidth:10,
    borderColor: "beige",
    opacity: 0.8,
    height: 60,
    justifyContent: 'center'
  }

});
