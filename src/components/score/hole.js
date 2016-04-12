var React  = require('react-native');

var {
  Text,
  AsyncStorage,
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
        startHole: this.props.route.startHole,
        advance: ">",
        back: "<",
        betScoreP1: [],
        betScoreP2: [],
        betScoreP3: [],
        betScoreP4: [],
        betNetScoreP1: [],
        betNetScoreP2: [],
        betNetScoreP3: [],
        betNetScoreP4: []
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
      holeNumber: this.props.route.startHole,
      startHole: this.props.route.startHole,
      advance: ">",
      back: "<",
      betScoreP1: [],
      betScoreP2: [],
      betScoreP3: [],
      betScoreP4: [],
      betNetScoreP1: [],
      betNetScoreP2: [],
      betNetScoreP3: [],
      betNetScoreP4: []
    };
  },

  componentWillMount: function(){

    //if (this.state.player1Score[this.state.holeNumber-1]=== undefined){
      this.setHole();
    //}
  },
  async _setdata() {
    try {
      var value  = await AsyncStorage.multiSet([
        ["selectedTab", 'currenthole'],
        ["player1Score", JSON.stringify(this.state.player1Score)],
        ["player2Score", JSON.stringify(this.state.player2Score)],
        ["player3Score", JSON.stringify(this.state.player3Score)],
        ["player4Score", JSON.stringify(this.state.player4Score)],
        ["player1NetScore",JSON.stringify(this.state.player1NetScore)],
        ["player2NetScore",JSON.stringify(this.state.player2NetScore)],
        ["player3NetScore",JSON.stringify(this.state.player3NetScore)],
        ["player4NetScore",JSON.stringify(this.state.player4NetScore)],
        ["holeNumber",JSON.stringify(this.state.holeNumber)],
        ["name",this.props.route.name],
        ["data", JSON.stringify(this.props.route.data)],
        ["course",JSON.stringify(this.props.route.course)],
        ["playerCount",JSON.stringify(this.props.route.playerCount)],
        ["player1Name", this.props.route.player1Name],
        ["player2Name", this.props.route.player2Name || ""],
        ["player3Name", this.props.route.player3Name || ""],
        ["player4Name", this.props.route.player4Name || ""],
        ["gameSelected", this.props.route.gameSelected],
        ["indexUsed", JSON.stringify(this.props.route.indexUsed)],
        ["scoreAdj1", JSON.stringify(this.props.route.scoreAdj1)],
        ["scoreAdj2", JSON.stringify(this.props.route.scoreAdj2)],
        ["scoreAdj3", JSON.stringify(this.props.route.scoreAdj3)],
        ["scoreAdj4", JSON.stringify(this.props.route.scoreAdj4)],
        ["betFrontNassau", JSON.stringify(this.props.route.betFrontNassau)],
        ["betBackNassau", JSON.stringify(this.props.route.betBackNassau)],
        ["betTotalNassau", JSON.stringify(this.props.route.betTotalNassau)],
        ["betLowScore", JSON.stringify(this.props.route.betLowScore)],
        ["betLowTotal", JSON.stringify(this.props.route.betLowTotal)],
        ["skinsBet", JSON.stringify(this.props.route.skinsBet)],
        ["auto9", JSON.stringify(this.props.route.auto9)],
        ["auto18", JSON.stringify(this.props.route.auto18)],
        ["lowScore", JSON.stringify(this.props.route.lowScore)],
        ["lowTotal", JSON.stringify(this.props.route.lowTotal)],
        ["skinsCarry", JSON.stringify(this.props.route.skinsCarry)],
        ["teams", JSON.stringify(this.props.route.teams)],
        ["startHole", JSON.stringify(this.props.route.startHole)],
        ["reload", JSON.stringify(true)],
        ["currentGame", JSON.stringify(true)],
      ]);
    } catch (error) {
      console.log("AsyncStorage Error " + error);
    }
  },

  setHole: function(){
    if (this.state.holeNumber<1){this.setState({holeNumber:18});}
    if (this.state.holeNumber>18){this.setState({holeNumber:1});}
    if (this.state.player1Score[this.state.holeNumber-1]=== undefined || this.state.player1Score[this.state.holeNumber-1]=== null ){
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
    this.onScorecard();
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
            <View style = {styles.rowheader}>
              <TouchableHighlight
                style  = {styles.touchablehighlight1}
                onPress={()=>{this.setState({score2: --this.state.holeNumber});this.setHole();} }>
                <Text style={styles.plusMinus1}>{this.state.back}</Text>
              </TouchableHighlight>
              <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {styles.title1}>Hole {this.state.holeNumber}</Text>
                <View style = {styles.rowheader}>
                  <Text style = {styles.title2}>Par {this.props.route.course.coursepar[this.state.holeNumber-1]}</Text>
                  <Text style = {styles.title2}>Hdcp {this.props.route.course.coursehcp[this.state.holeNumber-1]}</Text>
                </View>
              </View>
              <TouchableHighlight
                style  = {styles.touchablehighlight1}
                onPress={()=>{this.setState({score2: ++this.state.holeNumber}); this.setHole();}}>
                <Text style={styles.plusMinus1}>{this.state.advance}</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
        <View style  = {{flex:.1}}></View>
        <View>
          <Text style = {styles.title3}>Adjust Gross Score with + & - Net Score will update</Text>
          <Text style = {styles.title3}></Text>
          {this.renderTeams()}
        </View>
        <View style  = {{flex:.1}}></View>
        <View style  = {{flex:1}}>
          <View style = {styles.row}>
            <Text style = {styles.name}>{this.props.route.data.name}</Text>
            <TouchableHighlight
              style  = {styles.touchablehighlight}
              onPress={()=>this.setState({score1: --this.state.score1, netScore1: --this.state.netScore1})}>
              <Text style={styles.plusMinus}>-</Text>
            </TouchableHighlight>
            <Text style = {styles.label}>{this.state.score1}</Text>
            <TouchableHighlight
              style  = {styles.touchablehighlight}
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
            style  = {styles.touchablehighlight}
            onPress={()=>this.setState({score2: --this.state.score2, netScore2: --this.state.netScore2})}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score2}</Text>
          <TouchableHighlight
            style  = {styles.touchablehighlight}
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
            style  = {styles.touchablehighlight}
            onPress={()=>this.setState({score3: --this.state.score3, netScore3: --this.state.netScore3})}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score3}</Text>
          <TouchableHighlight
            style  = {styles.touchablehighlight}
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
            style  = {styles.touchablehighlight}
            onPress={()=>this.setState({score4: --this.state.score4, netScore4: --this.state.netScore4})}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableHighlight>
          <Text style = {styles.label}>{this.state.score4}</Text>
          <TouchableHighlight
            style  = {styles.touchablehighlight}
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
  renderTeams: function(){
    if ((this.props.route.playerCount === 4) && (this.props.route.gameSelected === "Nassau" || this.props.route.gameSelected === "RoundRobin" || this.props.route.gameSelected === "MatchPlay")){
      var holesArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
      if (this.state.holeNumber >= holesArray[this.state.startHole] && this.state.holeNumber <= holesArray[this.state.startHole+5]){
        return (
          <Text style = {styles.title3}>{this.props.route[`player${this.props.route.teams[0]}Name`]} & {this.props.route[`player${this.props.route.teams[1]}Name`]}   vs.   {this.props.route[`player${this.props.route.teams[2]}Name`]} & {this.props.route[`player${this.props.route.teams[3]}Name`]}</Text>
        );
      }
      if (this.state.holeNumber >= holesArray[this.state.startHole+6] && this.state.holeNumber <= holesArray[this.state.startHole+11]){
        return (
          <Text style = {styles.title3}>{this.props.route[`player${this.props.route.teams[4]}Name`]} & {this.props.route[`player${this.props.route.teams[5]}Name`]}   vs.   {this.props.route[`player${this.props.route.teams[6]}Name`]} & {this.props.route[`player${this.props.route.teams[7]}Name`]}</Text>
        );
      }
      if (this.state.holeNumber >= holesArray[this.state.startHole+12] && this.state.holeNumber <= holesArray[this.state.startHole+17]){
        return (
          <Text style = {styles.title3}>{this.props.route[`player${this.props.route.teams[8]}Name`]} & {this.props.route[`player${this.props.route.teams[9]}Name`]}   vs.   {this.props.route[`player${this.props.route.teams[10]}Name`]} & {this.props.route[`player${this.props.route.teams[11]}Name`]}</Text>
        );
      }
    }
  },

  betScore: function(){
    var betScore1 = [];
    var betScore2 = [];
    var betScore3 = [];
    var betScore4 = [];
    var betNetScore1 = [];
    var betNetScore2 = [];
    var betNetScore3 = [];
    var betNetScore4 = [];

    for (var i  = this.state.startHole; i <=19; i++){
      if (this.state.player1NetScore[i-1] !== undefined && this.state.player1NetScore[i-1] !== null){
        betNetScore1.push(this.state.player1NetScore[i-1]);
        betNetScore2.push(this.state.player2NetScore[i-1]);
        betNetScore3.push(this.state.player3NetScore[i-1]);
        betNetScore4.push(this.state.player4NetScore[i-1]);
      }
    }
    i = 1;
    while (i < this.state.startHole){
      if (this.state.player1NetScore[i-1] !== undefined && this.state.player1NetScore[i-1] !== null){
        betNetScore1.push(this.state.player1NetScore[i-1]);
        betNetScore2.push(this.state.player2NetScore[i-1]);
        betNetScore3.push(this.state.player3NetScore[i-1]);
        betNetScore4.push(this.state.player4NetScore[i-1]);
      }
      i++;
    }
    for (var i  = this.state.startHole; i <=19; i++){
      if (this.state.player1Score[i-1] !== undefined && this.state.player1Score[i-1] !== null){
        betScore1.push(this.state.player1Score[i-1]);
        betScore2.push(this.state.player2Score[i-1]);
        betScore3.push(this.state.player3Score[i-1]);
        betScore4.push(this.state.player4Score[i-1]);
      }
    }
    i = 1;
    while (i < this.state.startHole){
      if (this.state.player1Score[i-1] !== undefined && this.state.player1Score[i-1] !== null){
        betScore1.push(this.state.player1Score[i-1]);
        betScore2.push(this.state.player2Score[i-1]);
        betScore3.push(this.state.player3Score[i-1]);
        betScore4.push(this.state.player4Score[i-1]);
      }
      i++;
    }
    this.setState({
      betScoreP1: betScore1,
      betScoreP2: betScore2,
      betScoreP3: betScore3,
      betScoreP4: betScore4,
      betNetScoreP1: betNetScore1,
      betNetScoreP2: betNetScore2,
      betNetScoreP3: betNetScore3,
      betNetScoreP4: betNetScore4
    })
  },


  onScorecard: function(){
    this._setdata();
    this.betScore();
    this.props.navigator.push({
      name: 'scorecard',
      data: this.props.route.data,
      course:this.props.route.course,
      playerCount: this.props.route.playerCount,
      player1Name: this.props.route.player1Name,
      player2Name: this.props.route.player2Name,
      player3Name: this.props.route.player3Name,
      player4Name: this.props.route.player4Name,
      player1Score: this.state.player1Score,
      player2Score: this.state.player2Score,
      player3Score: this.state.player3Score,
      player4Score:this.state.player4Score,
      player1NetScore: this.state.player1NetScore,
      player2NetScore: this.state.player2NetScore,
      player3NetScore: this.state.player3NetScore,
      player4NetScore: this.state.player4NetScore,
      scoreAdj1: this.props.route.scoreAdj1,
      scoreAdj2: this.props.route.scoreAdj2,
      scoreAdj3: this.props.route.scoreAdj3,
      scoreAdj4: this.props.route.scoreAdj4,
      gameSelected: this.props.route.gameSelected,
      indexUsed: this.props.route.indexUsed,
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
      holeNumber: this.state.holeNumber-1,
      betScoreP1: this.state.betScoreP1,
      betScoreP2: this.state.betScoreP2,
      betScoreP3: this.state.betScoreP3,
      betScoreP4: this.state.betScoreP4,
      betNetScoreP1: this.state.betNetScoreP1,
      betNetScoreP2: this.state.betNetScoreP2,
      betNetScoreP3: this.state.betNetScoreP3,
      betNetScoreP4: this.state.betNetScoreP4,
      startHole: this.state.startHole
    });
  },



  render: function(){
    var user  = this.props.route.data;
    console.log('hole state', this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.setState({selectedTab: 'currenthole'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Current Hole</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.onScorecard()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>ScoreCard</Text>
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
          title="Scorecard"
          selected={this.state.selectedTab === 'scorecard'}
          onPress={() => {
            this.onScorecard();
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
    fontWeight: "500",
    marginRight: 10,
    marginLeft: 10,

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
  touchablehighlight:{
    borderRadius: 20,
    backgroundColor: "darkolivegreen",
  	width: 40,
  	height: 40,
    justifyContent:'center',
    alignItems: "center"
  },
  touchablehighlight1:{
    borderRadius: 20,
    backgroundColor: "darkolivegreen",
  	width: 40,
  	height: 40,
    justifyContent:'center',
    alignItems: "center",
  },
  plusMinus1: {
    fontWeight: "500",
    fontSize: 20,
    color:'greenyellow',
    textAlign: 'center',
    alignSelf: "center",
    marginLeft: 10,
    marginRight:10,
    opacity: 0.8
  },
  plusMinus: {
    fontWeight: "900",
    fontSize: 20,
    color:'greenyellow',
    textAlign: 'center',
    alignSelf: "center"
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
  android1: {
    backgroundColor: "darkolivegreen",
    borderTopWidth:10,
    borderColor: "beige",
    opacity: 0.8,
    height: 60,
    justifyContent: 'center'
  }

});
