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
    if (this.props.route.reload === true){
      return {
        selectedTab: 'currenthole',
        player1Score: this.props.route.player1Score,
        player2Score: this.props.route.player2Score,
        player3Score: this.props.route.player3Score,
        player4Score:this.props.route.player4Score,
        player1NetScore: this.props.route.player1NetScore,
        player2NetScore: this.props.route.player2NetScore,
        player3NetScore: this.props.route.player3NetScore,
        player4NetScore:this.props.route.player4NetScore,
        score1:null,
        score2:null,
        score3:null,
        score4:null,
        netScore1: null,
        netScore2: null,
        netScore3: null,
        netScore4: null,
        holeNumber: this.props.route.holeNumber,
      };
    }
    return {
      selectedTab: 'currenthole',
      player1Score: [],
      player2Score: [],
      player3Score: [],
      player4Score:[],
      player1NetScore: [],
      player2NetScore: [],
      player3NetScore: [],
      player4NetScore:[],
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
        score1: this.state.player1Score[this.state.holeNumber-1], netScore1:this.state.player1NetScore[this.state.holeNumber-1]-this.props.route.scoreAdj1[this.state.holeNumber-1],
        score2: this.state.player2Score[this.state.holeNumber-1], netScore2:this.state.player2NetScore[this.state.holeNumber-1]-this.props.route.scoreAdj2[this.state.holeNumber-1],
        score3: this.state.player3Score[this.state.holeNumber-1], netScore3:this.state.player3NetScore[this.state.holeNumber-1]-this.props.route.scoreAdj3[this.state.holeNumber-1],
        score4: this.state.player4Score[this.state.holeNumber-1], netScore4:this.state.player4NetScore[this.state.holeNumber-1]-this.props.route.scoreAdj4[this.state.holeNumber-1],
      });
    }
  },

  onSubmitScores: function(){
    var updatedScore1 = this.state.player1Score;
    updatedScore1[this.state.holeNumber-1]= this.state.score1;
    var updatedNetScore1 = this.state.player1NetScore;
    updatedNetScore1[this.state.holeNumber-1]= this.state.netScore1;
    this.setState({player1Score: updatedScore1, player1NetScore: updatedNetScore1});


    if (this.props.route.playerCount >= 2){
      var updatedScore2 = this.state.player2Score;
      updatedScore2[this.state.holeNumber-1]= this.state.score2;
      var updatedNetScore2 = this.state.player2NetScore;
      updatedNetScore2[this.state.holeNumber-1]= this.state.netScore2;
      this.setState({player2Score: updatedScore2, player2NetScore: updatedNetScore2});
    }
    if (this.props.route.playerCount >= 3){
      var updatedScore3 = this.state.player3Score;
      updatedScore3[this.state.holeNumber-1]= this.state.score3;
      var updatedNetScore3 = this.state.player3NetScore;
      updatedNetScore3[this.state.holeNumber-1]= this.state.netScore3;
      this.setState({player3Score: updatedScore3, player3NetScore: updatedNetScore3});
    }
    if (this.props.route.playerCount >= 4){
      var updatedScore4 = this.state.player4Score;
      updatedScore4[this.state.holeNumber-1]= this.state.score4;
      var updatedNetScore4 = this.state.player4NetScore;
      updatedNetScore4[this.state.holeNumber-1]= this.state.netScore4;
      this.setState({player4Score: updatedScore4, player4NetScore: updatedNetScore4});
    }
    this.setState({holeNumber: ++this.state.holeNumber});
    if (this.state.holeNumber<1){this.setState({holeNumber: 1});}
    if (this.state.holeNumber>18){this.setState({holeNumber: 18});}
    this.setHole();
  },



  renderContent: function(){
    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style  = {{flex:.1}}></View>
        <View>
          <View style = {styles.titlecontainer2}>
            <Text style = {styles.title1}>Hole {this.state.holeNumber}</Text>
            <View style = {styles.rowheader}>
              <Text style = {styles.title2}>Par {this.props.route.course.coursepar[this.state.holeNumber-1]}</Text>
              <Text style = {styles.title2}>Hdcp {this.props.route.course.coursehcp[this.state.holeNumber-1]}</Text>
            </View>
          </View>
        </View>
        <View style  = {{flex:.1}}></View>
        <View>
          <Text style = {styles.title3}>Adjust Gross Score with + & - Net Score will update</Text>
        </View>
        <View style  = {{flex:.1}}></View>
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
        <View style  = {{flex:.75}}></View>
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

  onBetResults: function(){
    this.props.navigator.push({
      name: 'betresults',
      data: this.props.route.data,
      course:this.props.route.course,
      playerCount: this.props.route.playerCount,
      player1Name: this.props.route.player1Name,
      player2Name: this.props.route.player2Name,
      player3Name: this.props.route.player3Name,
      player4Name: this.props.route.player4Name,
      gameSelected: this.props.route.gameSelected,
      indexUsed: this.props.route.indexUsed,
      scoreAdj1: this.props.route.scoreAdj1,
      scoreAdj2: this.props.route.scoreAdj2,
      scoreAdj3: this.props.route.scoreAdj3,
      scoreAdj4: this.props.route.scoreAdj4,
      betFrontNassau: this.props.route.betFrontNassau,
      betBackNassau: this.props.route.betBackNassau,
      betTotalNassau: this.props.route.betTotalNassau,
      betLowScore: this.props.route.betLowScore,
      betLowTotal: this.props.route.betLowTotal,
      skinsBet: this.props.route.skinsBet,
      auto9: this.props.route.auto9,
      auto18: this.props.route.auto18,
      lowScore: this.props.route.lowScore,
      lowTotal: this.props.route.lowTotal,
      skinsCarry: this.props.route.skinsCarry,
      teamMember: this.props.route.teamMember,
      teams:this.props.route.teams,
      player1Score: this.state.player1Score,
      player2Score: this.state.player2Score,
      player3Score: this.state.player3Score,
      player4Score:this.state.player4Score,
      player1NetScore: this.state.player1NetScore,
      player2NetScore: this.state.player2NetScore,
      player3NetScore: this.state.player3NetScore,
      player4NetScore:this.state.player4NetScore,
      holeNumber: this.state.holeNumber-1,
    });
  },




  render: function(){
    var user  = this.props.route.data;
    console.log('hole state', this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.onBetResults()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Bets</Text>
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
          title="Bets"
          selected={this.state.selectedTab === 'betresults'}
          onPress={() => {
            this.onBetResults();
          }}>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },



});

var styles = StyleSheet.create({

  title: {
    color: 'white',
    fontSize: 22,
  },
  title1: {
    color: 'white',
    fontSize: 20,
  },
  title2: {
    color: 'white',
    fontSize: 17,
    marginLeft:5,
    marginRight:5,
  },
  title3: {
    color:'greenyellow',
    fontSize: 11,
    marginLeft:5,
    marginRight:5,
    alignSelf: 'center'
  },
  name: {
    fontSize: 20,
    color: 'white',
    width: 75,
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
  plusMinus: {
    fontWeight: "800",
    fontSize: 30,
    color:'greenyellow',
    borderRadius: 20,
    backgroundColor: "darkolivegreen",
  	width: 40,
  	height: 40,
    //alignSelf:'center',
    textAlign: 'center',
    justifyContent:'center'
  },
  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.7,
    flex: .3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titlecontainer2: {
    backgroundColor: "darkolivegreen",
    opacity: 0.8,
    flex: .3,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    width:300,
  },
  container: {
    flex: .25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowheader:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

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
