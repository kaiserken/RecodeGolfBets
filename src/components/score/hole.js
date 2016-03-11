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
  Image
} = React;

var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'currenthole',
      player1Score: [],
      player2Score: [],
      player3Score: [],
      player4Score:[],
      score1:null,
      score2:null,
      score3:null,
      score4:null,
      netScore1: null,
      netScore2: null,
      netScore3: null,
      netScore4: null,
      holeNumber: 1,

    };
  },

  componentWillMount: function(){
    if (this.state.player1Score[this.state.holeNumber-1]=== undefined){
      this.setHole();
    }
  },

  setHole: function(){
    if (this.state.player1Score[this.state.holeNumber-1]=== undefined){
      this.setState({
        score1: this.props.route.course.coursepar[this.state.holeNumber-1], netScore1:this.props.route.course.coursepar[this.state.holeNumber-1]-this.props.route.scoreAdj1[this.state.holeNumber-1], score2: this.props.route.course.coursepar[this.state.holeNumber-1], netScore2:this.props.route.course.coursepar[this.state.holeNumber-1]-this.props.route.scoreAdj2[this.state.holeNumber-1],
        score3: this.props.route.course.coursepar[this.state.holeNumber-1], netScore3:this.props.route.course.coursepar[this.state.holeNumber-1]-this.props.route.scoreAdj3[this.state.holeNumber-1],
        score4: this.props.route.course.coursepar[this.state.holeNumber-1], netScore4:this.props.route.course.coursepar[this.state.holeNumber-1]-this.props.route.scoreAdj4[this.state.holeNumber-1]
      });
    }
    else {
      this.setState({
        score1: this.state.player1Score[this.state.holeNumber-1], netScore1:this.state.player1Score[this.state.holeNumber-1]-this.props.route.scoreAdj1[this.state.holeNumber-1],
        score2: this.state.player2Score[this.state.holeNumber-1], netScore2:this.state.player2Score[this.state.holeNumber-1]-this.props.route.scoreAdj2[this.state.holeNumber-1],
        score3: this.state.player3Score[this.state.holeNumber-1], netScore3:this.state.player3Score[this.state.holeNumber-1]-this.props.route.scoreAdj3[this.state.holeNumber-1],
        score4: this.state.player4Score[this.state.holeNumber-1], netScore4:this.state.player4Score[this.state.holeNumber-1]-this.props.route.scoreAdj4[this.state.holeNumber-1],
      });
    }
  },

  onSubmitScores: function(){
    var updatedScore1 = this.state.player1Score;
    updatedScore1[this.state.holeNumber-1]= this.state.score1;
    this.setState({player1Score: updatedScore1});
    if (this.props.route.playerCount >= 2){
      var updatedScore2 = this.state.player2Score;
      updatedScore2[this.state.holeNumber-1]= this.state.score2;
      this.setState({player2Score: updatedScore2});
    }
    if (this.props.route.playerCount >= 3){
      var updatedScore3 = this.state.player3Score;
      updatedScore3[this.state.holeNumber-1]= this.state.score3;
      this.setState({player3Score: updatedScore3});
    }
    if (this.props.route.playerCount >= 4){
      var updatedScore4 = this.state.player4Score;
      updatedScore4[this.state.holeNumber-1]= this.state.score4;
      this.setState({player4Score: updatedScore4});
    }
    this.setState({holeNumber: ++this.state.holeNumber});
    this.setHole();
  },



  renderContent: function(){
    return (
      <Image source={require('../../assets/grass5.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.container}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
          <Text style = {styles.title}>Hole {this.state.holeNumber}</Text>
          <Text style = {styles.title}>Par {this.props.route.course.coursepar[this.state.holeNumber-1]}</Text>
        </View>
        <View style  = {{flex:1}}>
          <View style = {styles.row}>
            <Text style = {styles.name}>{this.props.route.data.name}</Text>
            <TouchableHighlight
              onPress={()=>this.setState({score1: --this.state.score1, netScore1: --this.state.netScore1})}>
              <Text style={styles.plusMinus}>-</Text>
            </TouchableHighlight>
            <Text style = {styles.label}>{this.state.score1}</Text>
            <TouchableHighlight
              onPress={()=>this.setState({score1: ++this.state.score1, netScore1: ++this.state.netScore1})}>
              <Text style={styles.plusMinus}>+</Text>
            </TouchableHighlight>
            {this.renderNet1()}
          </View>
          {this.renderPlayer2()}
          {this.renderPlayer3()}
          {this.renderPlayer4()}
        </View>
        <View style = {styles.container}>
          <Button text={'Submit Scores'} onPress={this.onSubmitScores}/>
        </View>

      </Image>
    );
  },
  renderPlayer2: function(){
    if (this.props.route.playerCount >= 2){
      return (
        <View style = {styles.row}>
          <Text style = {styles.name}>{this.props.route.player2Name}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score2: --this.state.score2, netScore2: --this.state.netScore2})}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score2}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score2: ++this.state.score2, netScore2: ++this.state.netScore2})}>
            <Text style={styles.plusMinus}>+</Text>
          </TouchableHighlight>
          {this.renderNet2()}
        </View>
      );
    }
  },
  renderPlayer3: function(){
    if (this.props.route.playerCount >= 3){
      return (
        <View style = {styles.row}>
          <Text style = {styles.name}>{this.props.route.player3Name}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score3: --this.state.score3, netScore3: --this.state.netScore3})}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score3}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score3: ++this.state.score3, netScore3: ++this.state.netScore3})}>
            <Text style={styles.plusMinus}>+</Text>
          </TouchableHighlight>
          {this.renderNet3()}
        </View>
      );
    }
  },
  renderPlayer4: function(){
    if (this.props.route.playerCount >= 4){
      return (
        <View style = {styles.row}>
          <Text style = {styles.name}>{this.props.route.player4Name}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score4: --this.state.score4, netScore4: --this.state.netScore4})}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score4}</Text>
          <TouchableHighlight
            onPress={()=>this.setState({score4: ++this.state.score4, netScore4: ++this.state.netScore4})}>
            <Text style={styles.plusMinus}>+</Text>
          </TouchableHighlight>
          {this.renderNet4()}
        </View>
      );
    }
  },

  renderNet1: function(){
    if (this.props.route.indexUsed === true){
      return (
        <Text style = {styles.label}>Net {this.state.netScore1}</Text>
      );
    }
  },
  renderNet2: function(){
    if (this.props.route.indexUsed === true){
      return (
        <Text style = {styles.label}>Net {this.state.netScore2}</Text>
      );
    }
  },
  renderNet3: function(){
    if (this.props.route.indexUsed === true){
      return (
        <Text style = {styles.label}>Net {this.state.netScore3}</Text>
      );
    }
  },
  renderNet4: function(){
    if (this.props.route.indexUsed === true){
      return (
        <Text style = {styles.label}>Net {this.state.netScore4}</Text>
      );
    }
  },





  render: function(){
    var user  = this.props.route.data;
    console.log('hole state', this.state);
    console.log('hole props', this.props);
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
        onPress = {()=>this.setState({selectedTab: 'currenthole'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Current Hole</Text>
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
          title="Current Hole"
          selected={this.state.selectedTab === 'currenthole'}
          onPress={() => {
            this.setState({
              selectedTab: 'currenthole',
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

  title: {
    color: 'white',
    fontSize: 20
  },
  name: {
    fontSize: 18,
    color: 'white',
    width: 75
  },
  label: {
    fontSize: 18,
    color: 'white',
  },
  plusMinus: {
    color: 'white',
    fontWeight: "800",
    fontSize: 40,
  },
  container: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'space-around',
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
