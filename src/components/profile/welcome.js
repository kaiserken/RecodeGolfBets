var React  = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight
} = React;

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'welcome',
    };
  },

  renderContent: function(user) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Welcome Back {user.name}</Text>
      </View>
    );
  },

  render: function(){
    console.log(this.props);
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Play Round</Text>
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
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Profile"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Welcome"
          selected={this.state.selectedTab === 'welcome'}
          onPress={() => {
            this.setState({
              selectedTab: 'welcome',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Play"
          selected={this.state.selectedTab === 'play'}
          onPress={() => {
            this.setState({
              selectedTab: 'play',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'black',
  },


});
