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

var Button  = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'profile',
      showSkins: false,
      showNines: false,
      showRound: false,
      showNassau: false,
      showMatch: false,
    };
  },
  renderMatchPlayResults: function(user){
    var matchesWon = null;
    var matchesTied = null;
    var matchesLost = null;
    matchesWon = user.matchplaytotals.filter(function(element){
      return element === 1;
    }).length;
    matchesLost = user.matchplaytotals.filter(function(element){
      return element === -1;
    }).length;
    matchesTied = user.matchplaytotals.filter(function(element){
      return element === 0;
    }).length;

    if (!user.matchplaytotals.length){
      matchesOne = "";
      matchesTied = "";
      matchesLost = "";
    }
    if (this.state.showMatch === true){
      return (
        <View style = {{flex:4}}>
          <View style = {styles.row1}>
            <Text style = {styles.label}>MatchPlay</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Matches won</Text>
            <Text style = {styles.title1}>{matchesWon}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Matches tied</Text>
            <Text style = {styles.title1}>{matchesTied}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Matches lost</Text>
            <Text style = {styles.title1}>{matchesLost}</Text>
          </View>
        </View>
      );
    }
  },
  renderSkinsScores: function(user){
    var scoreSum = null;
    var highScore = null;
    for (var i = 0; i<user.skinstotals.length; i++){
      if (highScore === null || highScore < user.skinstotals[i]) highScore = user.skinstotals[i];
      scoreSum += user.skinstotals[i];
    }
    var rounds  = user.skinstotals.length;
    var avgScore  = Math.round(scoreSum/user.skinstotals.length);
    if (!user.skinstotals.length){
      avgScore = '';
      lowScore = '';
      rounds = 'None';
      scoreSum="";
    }

    if (this.state.showSkins === true){
      return (
        <View style = {{flex:5}}>
          <View style = {styles.row1}>
            <Text style = {styles.label}>Skins</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Rounds played</Text>
            <Text style = {styles.title1}>{rounds}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Totalpoints won/lost</Text>
            <Text style = {styles.title1}>{scoreSum}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Average points won/lost</Text>
            <Text style = {styles.title1}>{avgScore}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Highest points won</Text>
            <Text style = {styles.title1}>{highScore}</Text>
          </View>
        </View>
      );
    }
  },

  renderNinesScores: function(user){
    var scoreSum = null;
    var highScore = null;
    for (var i = 0; i<user.ninestotals.length; i++){
      if (highScore === null || highScore < user.ninestotals[i]) highScore = user.ninestotals[i];
      scoreSum += user.ninestotals[i];
    }
    var rounds  = user.ninestotals.length;
    var avgScore  = Math.round(scoreSum/user.ninestotals.length);
    if (!user.ninestotals.length){
      avgScore = '';
      lowScore = '';
      rounds = 'None';
      scoreSum="";
    }
    if (this.state.showNines === true){
      return (
        <View style = {{flex:5}}>
          <View style = {styles.row1}>
            <Text style = {styles.label}>Nines</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Rounds played</Text>
            <Text style = {styles.title1}>{rounds}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Totalpoints won/lost</Text>
            <Text style = {styles.title1}>{scoreSum}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Average points won/lost</Text>
            <Text style = {styles.title1}>{avgScore}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Highest points won</Text>
            <Text style = {styles.title1}>{highScore}</Text>
          </View>
        </View>
      );
    }
  },
  renderRoundRobinScores: function(user){
    var scoreSum = null;
    var highScore = null;
    for (var i = 0; i<user.roundrobintotals.length; i++){
      if (highScore === null || highScore < user.roundrobintotals[i]) highScore = user.roundrobintotals[i];
      scoreSum += user.roundrobintotals[i];
    }
    var rounds  = user.roundrobintotals.length;
    var avgScore  = Math.round(scoreSum/user.roundrobintotals.length);
    if (!user.roundrobintotals.length){
      avgScore = '';
      lowScore = '';
      rounds = 'None';
      scoreSum = '';
    }
    if (this.state.showRound === true){
      return (
        <View style = {{flex:5}}>
          <View style = {styles.row1}>
            <Text style = {styles.label}>Carts/RoundRobin</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Rounds played</Text>
            <Text style = {styles.title1}>{rounds}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Total points won/lost</Text>
            <Text style = {styles.title1}>{scoreSum}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Average points won/lost</Text>
            <Text style = {styles.title1}>{avgScore}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Highest points won</Text>
            <Text style = {styles.title1}>{highScore}</Text>
          </View>
        </View>
      );
    }
  },
  renderNassauScores: function(user){
    var scoreSum = null;
    var highScore = null;
    for (var i = 0; i<user.nassautotals.length; i++){
      if (highScore === null || highScore < user.nassautotals[i]) highScore = user.nassautotals[i];
      scoreSum += user.nassautotals[i];
    }
    var rounds  = user.nassautotals.length;
    var avgScore  = Math.round(scoreSum/user.nassautotals.length);
    if (!user.nassautotals.length){
      avgScore = '';
      lowScore = '';
      rounds = 'None';
      scoreSum= "";
    }
    if (this.state.showNassau === true){
      return (
        <View style = {{flex:5}}>
          <View style = {styles.row1}>
            <Text style = {styles.label}>Nassau</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Rounds played</Text>
            <Text style = {styles.title1}>{rounds}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Total points won/lost</Text>
            <Text style = {styles.title1}>{scoreSum}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Average points won/lost</Text>
            <Text style = {styles.title1}>{avgScore}</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.title}>Highest points won</Text>
            <Text style = {styles.title1}>{highScore}</Text>
          </View>
        </View>
      );
    }
  },
  renderScores: function(user){
    var scoreSum = null;
    var lowScore = null;
    var score = [];
    for (var i = 0; i<user.scores.length; i++){
      if (user.scores[i].length===18){
        score.push(user.scores[i].reduce(function(sum, element){
          return sum + element;
        },0));
      }
      console.log(user.scores[i]);
    }

    console.log(score);
    for (i = 0; i<score.length; i++){
      if (lowScore === null || lowScore > score[i]) {lowScore = score[i];}
      scoreSum += score[i];
    }

    var rounds  = score.length;
    var avgScore  = Math.round(scoreSum/score.length);
    if (!score.length){
      avgScore = '';
      lowScore = '';
      rounds = 'None';
    }
    return (
          <View style = {{flex:4}}>
            <View style = {styles.row1}>
              <Text style = {styles.label}>Scoring</Text>
            </View>
            <View style = {styles.row}>
              <Text style = {styles.title}>Number of rounds played</Text>
              <Text style = {styles.title1}>{rounds}</Text>
            </View>
            <View style = {styles.row}>
              <Text style = {styles.title}>Average score</Text>
              <Text style = {styles.title1}>{avgScore}</Text>
            </View>
            <View style = {styles.row}>
              <Text style = {styles.title}>Low Score</Text>
              <Text style = {styles.title1}>{lowScore}</Text>
            </View>
          </View>
    );
  },

  renderContent: function(user) {
    return (
        <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
          <View style = {styles.container}>
            <Text style = {styles.label}>Profile for {this.props.route.data.name}</Text>
          </View>
          {this.renderScores(user)}
          <View style = {{flex:1}}/>
          {this.renderNassauScores(user)}
          {this.renderRoundRobinScores(user)}
          {this.renderSkinsScores(user)}
          {this.renderNinesScores(user)}
          {this.renderMatchPlayResults(user)}
          <View style = {{flex:1}}/>
          <View style = {styles.row2}>
            <TouchableHighlight
              style  = {styles.button}
              underlayColor = {'darkolivegreen'}
              onPress = {()=>this.setState({showNassau: true, showSkins: false, showNines: false, showMatch: false, showRound: false})}
            >
              <Text style  = {styles.buttonText}>{'Nassau'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style  = {styles.button}
              underlayColor = {'darkolivegreen'}
              onPress = {()=>this.setState({showNassau: false, showSkins: true, showNines: false, showMatch: false, showRound: false})}
            >
              <Text style  = {styles.buttonText}>{'Skins'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style  = {styles.button}
              underlayColor = {'darkolivegreen'}
              onPress = {()=>this.setState({showNassau: false, showSkins: false, showNines: true, showMatch: false, showRound: false})}
            >
              <Text style  = {styles.buttonText}>{'Nines'}</Text>
            </TouchableHighlight>
          </View>
          <View style = {styles.row2}>
            <TouchableHighlight
              style  = {styles.button}
              underlayColor = {'darkolivegreen'}
              onPress = {()=>this.setState({showNassau: false, showSkins: false, showNines: false, showMatch: true, showRound: false})}
            >
              <Text style  = {styles.buttonText}>{'MatchPlay'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style  = {styles.button}
              underlayColor = {'darkolivegreen'}
              onPress = {()=>this.setState({showNassau: false, showSkins: false, showNines: false, showMatch: false, showRound: true})}
            >
              <Text style  = {styles.buttonText}>{'RoundRobin'}</Text>
            </TouchableHighlight>
          </View>



          <View style = {{flex:1.5}}/>
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
          icon = {require('../../assets/back.png')}
          selected={this.state.selectedTab === 'back'}
          onPress={() => {
            this.props.navigator.pop();
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Profile"
          icon = {require('../../assets/results.png')}
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
  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'darkolivegreen',
    borderTopWidth: 2,
    borderBottomWidth:2,
    borderColor: "black"
  },
  row1: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopWidth: 2,
    borderBottomWidth:2,
    borderColor: "black",
    opacity: 0.7,
  },
  row2: {
    flex: 1,
    flexDirection:'row',
    justifyContent: "space-around",
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "darkolivegreen",
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    borderColor: 'white',
    marginTop: 5,
    width: 90,
  },
  buttonText: {
    color:'white',
    flex: 1,
    alignSelf: 'center',
    fontSize: 13
  },
  title: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 250,
  },
  title1: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 40,
  },
  label: {
    fontSize: 22,
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
