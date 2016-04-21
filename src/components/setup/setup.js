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
      namesValid: true,
    };
  },

  onSubmitGroup: function(){
    this.setState({namesValid: true});
    for (var i = 2; i<= this.state.playerCount; i++){
      if (this.state[`player${i}Name`]===null || this.state[`player${i}Name`]=== undefined ){
        this.setState({namesValid:false})
      }
    }
    if (this.state.namesValid === false){
      Alert.alert('Player Names','Each player must have a name',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}]
      );
      return;
    }
    this.setState({groupSubmitted: true});
    this.props.navigator.push({name: 'games', data: this.props.route.data, course:this.props.route.course, playerCount: this.state.playerCount, player1Name: this.props.route.data.name, player2Name: this.state.player2Name, player3Name: this.state.player3Name, player4Name: this.state.player4Name});
  },

  onConfirmGroup: function(){
    this.props.navigator.push({name: 'starthole', data: this.props.route.data, course:this.props.route.course, playerCount: this.state.playerCount, player1Name: this.props.route.data.name, player2Name: "", player3Name: "", player4Name: "", gameSelected: "JustKeepScore", indexUsed: false, scoreAdj1:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], scoreAdj2:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], scoreAdj3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], scoreAdj4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], betFrontNassau: null, betBackNassau: null, betTotalNassau: null, betLowScore: null, betLowTotal: null, skinsBet: null, auto9: false, auto18: false, lowScore: false,lowTotal: false, skinsCarry: false, teamMember: null,teams:[]});
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
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style={styles.titlelabel}>{this.props.route.course.coursename}</Text>
        </View>
        <View style  =  {styles.container}>
          <View style  = {{flex:.1}}/>
          <View style  = {styles.container1}>
          <Text style={styles.label}>{this.props.route.data.name}</Text>
          <Text style={styles.label1}>Enter the names for the </Text>
          <Text style={styles.label1}>rest of your group</Text>
          </View>
          <View style  = {{flex:.1}}/>
          {players}
          <View style  = {{flex:.1}}/>
          <Button text={'Submit'} onPress={this.onSubmitGroup}/>
          <View style  = {{flex:.1}}/>
          <Button text={'Edit Number of Players'} onPress={this.onBackPlayerSetup}/>
        </View>
        <View style  = {{flex:.5}}/>
      </Image>
    );
  },
  renderContent: function(user){
    if (this.state.playerCount === null){
      return (
        <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
          <View style = {styles.titlecontainer}>
            <Text style={styles.titlelabel}>{this.props.route.course.coursename}</Text>
          </View>
          <View style = {{flex:.1}}/>
          <View style  = {styles.container}>
            <View style  = {styles.container1}>
            <Text style={styles.label1}>Tap the number of players</Text>
            <Text style={styles.label1}>including yourself</Text>
            </View>
            <TouchableHighlight
              style = {styles.touchableHighlight}
              onPress={()=>this.setState({playerCount: 1})}>
              <Text style={styles.numbers}>1</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style = {styles.touchableHighlight}
              onPress={()=>this.setState({playerCount: 2})}>
              <Text style={styles.numbers}>2</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style = {styles.touchableHighlight}
              onPress={()=>this.setState({playerCount: 3})}>
              <Text style={styles.numbers}>3</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style = {styles.touchableHighlight}
              onPress={()=>this.setState({playerCount: 4})}>
              <Text style={styles.numbers}>4</Text>
            </TouchableHighlight>
          </View>
          <View style = {{flex:.5}}/>
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
        <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
          <View style = {styles.titlecontainer}>
            <Text style={styles.titlelabel}>{this.props.route.course.coursename}</Text>
          </View>
          <View style  = {styles.container}>
            <View style = {{flex:.1}}/>
            <View style  = {styles.container1}>
              <Text style={styles.label}>{this.props.route.data.name}</Text>
              <Text style={styles.label1}></Text>
              <Text style={styles.label1}>You selected one player</Text>
              <Text style={styles.label1}></Text>
              <Text style={styles.label1}>There are not any one player games</Text>
              <Text style={styles.label1}></Text>
              <Text style={styles.label1}>Press start round to use the app</Text>
              <Text style={styles.label1}>to keep your score </Text>
            </View>
            <View style = {{flex:.05}}/>
            <Button text={'Start Round'} onPress={this.onConfirmGroup}/>
            <View style = {{flex:.05}}/>
            <Button text={'Edit Number of Players'} onPress={this.onBackPlayerSetup}/>
            <View style = {{flex:.05}}/>
          </View>
          <View style = {{flex:.5}}/>
        </Image>
      );
    }

  },

  render: function(){
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Back to Courses</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.setState({selectedTab: 'players'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Players</Text>
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
          icon = {require('../../assets/results.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Players"
          icon = {require('../../assets/players.png')}
          selected={this.state.selectedTab === 'players'}
          onPress={() => {
            this.setState({
              selectedTab: 'players',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Back"
          icon = {require('../../assets/return.png')}
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
  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.7,
    flex: .15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container1: {
    flex: .6,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    borderRadius:5,
    backgroundColor: "darkolivegreen",
    opacity: 0.8
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500'
  },
  label1: {
    color: 'white',
    fontSize: 14,
  },
  titlelabel: {
    color: 'white',
    fontSize: 22,
  },
  touchableHighlight: {
    borderRadius: 25,
    backgroundColor: "darkolivegreen",
    padding:15,
    width: 50,
    height: 50,
    marginTop:20,
    justifyContent:'center',
    opacity: 0.9,
    borderColor: 'white',
    borderWidth:2
  },
  numbers : {
    fontWeight: "800",
    fontSize: 25,
    color:'white',
    textAlign: 'center',
    alignSelf: 'center'
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
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
