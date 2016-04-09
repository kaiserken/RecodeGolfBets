var React  = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  Image
} = React;

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'profile',
    };
  },

  renderContent: function(user) {
    var scoreSum = null;
    var lowScore = null;
    for (var i = 0; i<user.scores.length; i++){
      if (lowScore === null || lowScore > user.scores[i]) lowScore = user.scores[i];
      scoreSum += user.scores[i];
    }
    var avgScore  = Math.round(scoreSum/user.scores.length);



    return (
        <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
          <View style  = {styles.container}>
            <Text style={styles.label}>Betting and Scoring Profile</Text>
            <Text style={styles.label}>Average Score: {avgScore}</Text>
            <Text style={styles.label}>Low Score: {lowScore}</Text>
            <Text style={styles.label}>Rounds Played: {user.scores.length}</Text>
          </View>
        </Image>
    );
  },

  render: function(){
    console.log(this.props);
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.setState({selectedTab: 'profile'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Back</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
      return (
        <DrawerLayoutAndroid
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          {this.renderContent(user)}
        </DrawerLayoutAndroid>
      );
    }

    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="white">
        <TabBarIOS.Item
          title="Back"
          selected={this.state.selectedTab === 'back'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Profile"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          {this.renderContent(user)}
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
    alignSelf: 'center',
    justifyContent: 'center'
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
