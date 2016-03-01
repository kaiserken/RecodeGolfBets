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

  },

  renderContent: function(){
    return (
      <View style  = {[{flex:1},{paddingBottom:(Platform.OS === 'ios') ? 40 : 0, }]}>
        <View style = {styles.row}>
          <Text style={styles.label}>Select Your Game</Text>
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Score</Text>
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
          </View>
          <Switch
          onValueChange={(value) => this.setState({matchPlaySwitch: value})}
          value={this.state.matchPlaySwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Skins </Text>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>2 to 4 player game. Each hole is worth a skin and can only be won with a single low score on that hole. Skins not won are carried to the next hole.</Text>
          </View>
          <Switch
          onValueChange={(value) => this.setState({skinsSwitch: value})}
          value={this.state.skinsSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Nines</Text>
          <View style={styles.descriptionWidth}>
            <Text style={styles.description}>3 player game. Each hole is worth 9 points. If one player makes birdie, for example, another makes par and the third makes bogey, it is 5-3-1 respectively.</Text>
          </View>
          <Switch
          onValueChange={(value) => this.setState({ninesSwitch: value})}
          value={this.state.ninesSwitch} />
        </View>
        <View style = {styles.row}>
        <Button text={"Submit"} onPress={this.onSubmit}/>
        </View>
      </View>
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
        tintColor="white"
        barTintColor="darkslateblue">
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
    color: 'black',
  },
  descriptionWidth: {
    width: 220,
  },
  description: {
    color: 'black',
    fontSize: 11,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1
  }

});
