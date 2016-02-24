var React  = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  ListView,
  TouchableOpacity
} = React;

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'profile',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      course: "",
    };
  },
  componentDidMount: function(){
    var courses = this.props.route.data.favorites;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(courses),
      //loaded: true,
    });
  },
  renderContent: function(user) {
    var scoreSum = null;
    var lowScore = null;
    for (var i = 0; i<user.scores.length; i++){
      if (lowScore === null || lowScore > user.scores[i]) lowScore = user.scores[i];
      scoreSum += user.scores[i];
    }
    var avgScore  = Math.round(scoreSum/user.scores.length);

    var winningSum = null;
    var highWinnings = null;
    for (var x = 0; x<user.winnings.length; x++){
      if (highWinnings === null || highWinnings < user.winnings[x]) highWinnings = user.winnings[x];
      winningSum += user.winnings[x];
    }
    var avgWinnings  = Math.round(winningSum/user.winnings.length);

    return (
      <View style = {{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.label}>Betting and Scoring Profile</Text>
          <Text style={styles.label}>Average Score {avgScore}</Text>
          <Text style={styles.label}>Low Score {lowScore}</Text>
          <Text style={styles.label}>Rounds Played {user.scores.length}</Text>
          <Text style={styles.label}>Total Points Won {winningSum}</Text>
          <Text style={styles.label}>Average Points Won per Round {avgWinnings}</Text>
          <Text style={styles.label}>Highest Points Won {highWinnings}</Text>
          <Text style={styles.label}>Betting Rounds Played {user.winnings.length}</Text>
        </View>
        <View>
        <Text style={styles.label}> Your Favorite Courses</Text>
        </View>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderCourse}
          style = {styles.ListView}
        />


      </View>


    );
  },

  render: function(){
    console.log(this.props);
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Back</Text>
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
        <TabBarIOS.Item
          title="Play"
          selected={this.state.selectedTab === 'play'}
          onPress={() => {
            this.props.navigator.pop();
          }}>

        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
  renderCourse: function(rowData){
      return (
      <TouchableOpacity>
        <View style  = {styles.row}>
          <Text>{rowData}</Text>
        </View>
      </TouchableOpacity>
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
    alignSelf: 'center',
    justifyContent: 'center'
  },
  listView: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    backgroundColor: 'transparent',
  },


});
