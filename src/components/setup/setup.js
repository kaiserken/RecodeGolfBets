var React  = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  TextInput,
  Image,
  Alert
} = React;

var Button = require('../common/button');
var PlayerNames = require('./playernames');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'players',
      playerCount: null,
      player2Name: null,
      player3Name: null,
      player4Name: null,
      groupSubmitted: false,
    };
  },

  onSubmitGroup: function(){
    this.setState({groupSubmitted: true});
    this.props.navigator.push({name: 'games', data: this.props.route.data, course:this.props.route.course, playerCount: this.state.playerCount, player2Name: this.state.player2Name, player3Name: this.state.player3Name, player4Name: this.state.player4Name});
  },
  onBackPlayerSetup: function(){
    this.setState({playerCount: null, player2Name: null, player3Name: null, player4Name: null,});
  },

  renderPlayerSetup: function(){
    var players = [];
    for (var i = 2; i <= this.state.playerCount; i++){
      if (i===2){
        players.push(<PlayerNames key = {i} value1 = {this.state.player2Name}  onChangeText = {(text)=>this.setState({player2Name: text})}/>);
      }
      if (i===3){
        players.push(<PlayerNames key = {i} value1 = {this.state.player3Name}  onChangeText = {(text)=>this.setState({player3Name: text})}/>);
      }
      if (i===4){
        players.push(<PlayerNames key = {i} value1 = {this.state.player4Name}  onChangeText = {(text)=>this.setState({player4Name: text})}/>);
      }
    }
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style  = {styles.container}>
          <Text style={styles.label}>{this.props.route.data.name}</Text>
          <Text style={styles.label1}>Enter the names of your playing</Text>
          <Text style={styles.label1}>partners for todays round at</Text>
          <Text style={styles.label1}>{this.props.route.course.coursename}</Text>
          <Text style={styles.label}></Text>
          {players}
          <Button text={'Submit'} onPress={this.onSubmitGroup}/>
          <Button text={'Edit # Players'} onPress={this.onBackPlayerSetup}/>
        </View>
      </Image>
    );
  },
  renderContent: function(user){
    if (this.state.playerCount === null){
      return (
        <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
          <View style  = {styles.container}>
            <Text style={styles.label1}>Tap the number of players</Text>
            <Text style={styles.label1}>incuding yourself for</Text>
            <Text style={styles.label1}>todays round</Text>
            <Text style={styles.label}></Text>
            <TouchableHighlight
              onPress={()=>this.setState({playerCount: 1})}>
              <Text style={styles.numbers}>1</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={()=>this.setState({playerCount: 2})}>
              <Text style={styles.numbers}>2</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={()=>this.setState({playerCount: 3})}>
              <Text style={styles.numbers}>3</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={()=>this.setState({playerCount: 4})}>
              <Text style={styles.numbers}>4</Text>
            </TouchableHighlight>
          </View>
        </Image>
      );
    }
    if (this.state.playerCount > 1){
      return(
        this.renderPlayerSetup()
      );
    }
    if (this.state.playerCount === 1){
      return(
        <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
          <View style  = {styles.container}>
            <Text style={styles.label}>{this.props.route.data.name}</Text>
            <Text style={styles.label}></Text>
            <Text style={styles.label}>You selected 1 player</Text>
            <Text style={styles.label}></Text>
            <Button text={'Confirm'} onPress={this.onConfirmGroup}/>
            <Button text={'Go back'} onPress={this.onBackPlayerSetup}/>
          </View>
        </Image>
      );
    }

  },

  render: function(){
    var user  = this.props.route.data;
    console.log(this.state);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Back to Courses</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'players'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Players</Text>
      </TouchableHighlight>

    </View>
    );

    if (Platform.OS === "android"){
      if (this.state.selectedTab === "players"){
        return (
          <DrawerLayoutAndroid
            drawerWidth={200}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            {this.renderContent(user)}
          </DrawerLayoutAndroid>
        );
      }
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
          title="Players"
          selected={this.state.selectedTab === 'players'}
          onPress={() => {
            this.setState({
              selectedTab: 'players',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Back to Courses"
          selected={this.state.selectedTab === 'back'}
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
    fontSize: 18,
  },
  label1: {
    color: 'white',
    fontSize: 12,
  },
  numbers : {
    color: 'white',
    fontSize: 40,
    fontWeight: "700",
    marginTop: 10,
    marginBottom:10,
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
});
