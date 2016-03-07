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
    };
  },
  renderPlayer1Index: function(){
    if (this.props.route.playerCount>=1){
      return (
        <View style  = {styles.row}>
        <Text style  = {styles.name}>{this.props.route.data.name}</Text>
        <TextInput
          style  = {styles.input}
          placeholder = "HCP"
          value  = {this.state.player1Hcp}
          onChangeText = {(text)=> this.setState({player1Hcp: text})}
          />
        </View>
      );
    }
  },
  renderPlayer2Index: function(){
    if (this.props.route.playerCount>=2){
      return (
        <View style  = {styles.row}>
        <Text style  = {styles.name}>{this.props.route.player2Name}</Text>
        <TextInput
          style  = {styles.input}
          placeholder = "HCP"
          value  = {this.state.player2Hcp}
          onChangeText = {(text)=> this.setState({player2Hcp: text})}
          />
        </View>
      );
    }
  },
  renderPlayer3Index: function(){
    if (this.props.route.playerCount>=3){
      return (
        <View style  = {styles.row}>
        <Text style  = {styles.name}>{this.props.route.player3Name}</Text>
        <TextInput
          style  = {styles.input}
          placeholder = "HCP"
          value  = {this.state.player3Hcp}
          onChangeText = {(text)=> this.setState({player3Hcp: text})}
          />
        </View>
      );
    }
  },
  renderPlayer4Index: function(){
    if (this.props.route.playerCount>=4){
      return (
        <View style  = {styles.row}>
        <Text style  = {styles.name}>{this.props.route.player4Name}</Text>
        <TextInput
          style  = {styles.input}
          placeholder = "HCP"
          value  = {this.state.player4Hcp}
          onChangeText = {(text)=> this.setState({player4Hcp: text})}
          />
        </View>
      );
    }
  },
  renderIndexUsed: function(){
    if (this.state.indexUsed === true){
      return (
        <View>
          {this.renderPlayer1Index()}
          {this.renderPlayer2Index()}
          {this.renderPlayer3Index()}
          {this.renderPlayer4Index()}
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
          <Text style={styles.label}>This is the Set Bets Page</Text>
        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>Use HCP indexes</Text>
          <Switch
          onValueChange={(value) => this.setState({indexUsed: value})}
          value={this.state.indexUsed} />
          {this.renderIndexUsed()}
        </View>
        <View style = {styles.container}>

        </View>
        <View style = {styles.row}>
          <Text style={styles.label}>just another option</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white',
  },
  name: {
    color: 'white',
    width: 75
  },
  input: {
    padding: 1,
    height: 20,
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
