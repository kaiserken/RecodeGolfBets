var React  = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  TextInput
} = React;

var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'players',
      indexUsed: false,
      playerCount: null,
      player2Name: null,
      player3Name: null,
      player4Name: null,
      groupSubmitted: false,
    };
  },

  renderGroup: function(){
    return (
      <View style  = {styles.container}>
        <Text style={styles.label}>Your Group is:</Text>
        <Text style={styles.label}>{this.props.route.data.name}</Text>
        <Text style={styles.label}>{this.state.player2Name}</Text>
        <Text style={styles.label}>{this.state.player3Name}</Text>
        <Text style={styles.label}>{this.state.player4Name}</Text>
      </View>
    );

  },
  onSubmitGroup: function(){
    this.setState({groupSubmitted: true});
  },
  renderPlayerSetup: function(){
    if (this.state.playerCount === 2){
      return (
        <View style  = {styles.container}>
          <Text style={styles.label}>Enter Name of Playing Partner</Text>
          <TextInput
          style  = {styles.input}
          value = {this.state.player2Name}
          onChangeText={(text)=>this.setState({player2Name: text})}
          />
          <Button text={'Submit'} onPress={this.onSubmitGroup}/>
        </View>
      );
    }
    if (this.state.playerCount === 3){
      return (
        <View style  = {styles.container}>
          <Text style={styles.label}>Enter Name of Playing Partners</Text>
          <TextInput
          style  = {styles.input}
          value = {this.state.player2Name}
          onChangeText={(text)=>this.setState({player2Name: text})}
          />
          <TextInput
          style  = {styles.input}
          value = {this.state.player3Name}
          onChangeText={(text)=>this.setState({player3Name: text})}
          />
          <Button text={'Submit'} onPress={this.onSubmitGroup}/>
        </View>
      );
    }
    if (this.state.playerCount === 4){
      return (
        <View style  = {styles.container}>
          <Text style={styles.label}>Enter Name of Playing Partners</Text>
          <TextInput
          style  = {styles.input}
          value = {this.state.player2Name}
          onChangeText={(text)=>this.setState({player2Name: text})}
          />
          <TextInput
          style  = {styles.input}
          value = {this.state.player3Name}
          onChangeText={(text)=>this.setState({player3Name: text})}
          />
          <TextInput
          style  = {styles.input}
          value = {this.state.player4Name}
          onChangeText={(text)=>this.setState({player4Name: text})}
          />
          <Button text={'Submit'} onPress={this.onSubmitGroup}/>
        </View>
      );
    }
  },
  renderContent: function(user){
    if (this.state.groupSubmitted === true)
       return(
         this.renderGroup()
       );

    if (this.state.playerCount === null){
    return (
      <View style  = {styles.container}>
          <Text style={styles.label}>Tap the Number of Players</Text>
          <Text style={styles.label}>Including Yourself</Text>
          <TouchableHighlight onPress={()=>this.setState({playerCount: 1})}>
            <Text style={styles.numbers}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.setState({playerCount: 2})}>
            <Text style={styles.numbers}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.setState({playerCount: 3})}>
            <Text style={styles.numbers}>3</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.setState({playerCount: 4})}>
            <Text style={styles.numbers}>4</Text>
          </TouchableHighlight>
      </View>
    );
   }
   if (this.state.playerCount > 1){
     return(
       this.renderPlayerSetup()
     );
   }
   if (this.state.playerCount === 1){
     return(
       this.renderSinglePlayer()
     );
   }

  },

  render: function(){
    var user  = this.props.route.data;
    console.log(this.state);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'players'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Players</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'next'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Next</Text>
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
      if (this.state.selectedTab === "next"){
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
          title="Next"
          selected={this.state.selectedTab === 'next'}
          onPress={() => {
            this.setState({
              selectedTab: 'next',
            });
          }}>
          {this.renderContent()}
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
  numbers: {
    color: 'black',
    fontSize: 40,
    padding: 10,
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor: 'transparent',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }
});
