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

  onSubmit: function(){
    var count = 0;
    if (this.state.keepScoreSwitch === true){count++;}
    if (this.state.nassauSwitch === true){count++;}
    if (this.state.roundRobinSwitch === true){count++;}
    if (this.state.matchPlaySwitch === true){count++;}
    if (this.state.skinsSwitch === true){count++;}
    if (this.state.ninesSwitch === true){count++;}
    if (count === 0 || count > 1){ Alert.alert('Game Options','Please select a game before submitting',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}]
      );
    }




  },

  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.row}>
          <Text style={styles.label}>Select Your Game</Text>
        </View>
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
            <TouchableHighlight onPress={()=>Alert.alert('Nassau','The Nassau is one of the most common side bets on a golf course. You can play individual or team Nassaus, which are basically three bets -- front, back and overall match play. In team Nassaus it is the two better balls from each team. Many players, however, play automatic two-downs, which means there is a press (e.g. a new $5 bet ) each time a side gets two holes down. A $5 Nassau, which is worth $15 overall, can easily triple if one side dominates in automatic two downs.',
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
            <TouchableHighlight onPress={()=>Alert.alert('Skins','The best score on each hole wins the points for that hole as long as there is not a tie. Points roll over if there are ties for the best scores. That leaves an opportunity for the vulture, who could have 10 bad holes in a row, but pick the right moment to record a crucial birdie.',
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
            <TouchableHighlight onPress={()=>Alert.alert('Nines','Nines is an ideal game for threesomes. Basically each hole is worth nine points (points are assigned a monetary value), with points being divided according to order of finish on each hole. If one player makes birdie, for example, another makes par and the third makes bogey, it is 5-3-1 respectively. If all three players make par, however, each player gets three points. If one player makes birdie and the other two pars, then the player with the birdie is awarded five points with the other two getting two points each. (It always adds up to nine.) Conceivably, a great performance by one player or poor one for another could prove lucrative or costly, but this game usually has a way of evening out at the end.',
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
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Players</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'games'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Games</Text>
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
          title="Games"
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

});