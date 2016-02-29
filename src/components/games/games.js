var React  = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  Switch,
  TouchableHighlight
} = React;

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

  renderContent: function(){
    return (
      <View style  = {{flex:1}}>
        <View style = {styles.row}>
          <Text style={styles.label}>Select Your Game</Text>
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Just Keep Score</Text>
          <Switch
          onValueChange={(value) => this.setState({keepScoreSwitch: value})}
          value={this.state.keepScoreSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Nassau</Text>
          <View>
          <Text style={styles.label}>Nassau</Text>
          <Text style={styles.label}>Nassau</Text>
          <Text style={styles.label}>Nassau</Text>
          </View>
          <Switch
          onValueChange={(value) => this.setState({nassauSwitch: value})}
          value={this.state.nassauSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Round Robin / Carts</Text>
          <Switch
          onValueChange={(value) => this.setState({roundRobinSwitch: value})}
          value={this.state.roundRobinSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Match Play</Text>
          <Switch
          onValueChange={(value) => this.setState({matchPlaySwitch: value})}
          value={this.state.matchPlaySwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Skins</Text>
          <Switch
          onValueChange={(value) => this.setState({skinsSwitch: value})}
          value={this.state.skinsSwitch} />
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Nines</Text>
          <Switch
          onValueChange={(value) => this.setState({ninesSwitch: value})}
          value={this.state.ninesSwitch} />
        </View>
        <View style = {styles.row}>
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
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

});
