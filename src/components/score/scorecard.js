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
  Image,
  Dimensions,
} = React;

var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {

    return {
      selectedTab: 'scorecard',


    };
  },
  holesFront: function(){
    var holesfront = [1,2,3,4,5,6,7,8,9].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (holesfront);

  },

  parFront: function(){
    var parfront  = this.props.route.course.coursepar.slice(0,9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title10}>{element}</Text>
      );
    });
    return (parfront);
  },

  parBack: function(){
    var parback  = this.props.route.course.coursepar.slice(9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title10}>{element}</Text>
      );
    });
    return (parback);
  },

  hcpFront: function(){
    var hcpfront  = this.props.route.course.coursehcp.slice(0,9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (hcpfront);
  },

  hcpBack: function(){
    var hcpback  = this.props.route.course.coursehcp.slice(9).map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (hcpback);
  },

  holesBack: function(){
    var holesback = [10,11,12,13,14,15,16,17,18].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title3}>{element}</Text>
      );
    });
    return (holesback);
  },

  holesTotal: function(){
    var holesback = ['Front', 'Back', 'Total'].map(function(element, index){
      return (
        <Text key = {index} style = {styles.title7}>{element}</Text>
      );
    });
    return (holesback);
  },

  scoreResults: function(resultsArray){
    var playerResults = resultsArray.map(function(element, index){
      return (
        <Text key = {index} style = {styles.title4}>{element}</Text>
      );
    });
    return (playerResults);
  },


  renderScores: function(){
    var scoresFront  = [];
    var scoresBack = [];
    var scoresTotal = [];
    for (var i = 1; i<=this.props.route.playerCount; i++){
      scoresFront.push(this.props.route[`player${i}Score`].slice(0,9));
      scoresTotal.push([]);
      scoresTotal[i-1].push(this.props.route[`player${i}Score`].slice(0,9).reduce(function(sum, score){
        return sum + score;
      }, 0));
      while (scoresFront[i-1].length<9){scoresFront[i-1].push('');}
      scoresBack.push(this.props.route[`player${i}Score`].slice(9));
      scoresTotal[i-1].push(this.props.route[`player${i}Score`].slice(9).reduce(function(sum, score){
        return sum + score;
      }, 0));
      while (scoresBack[i-1].length<9){scoresBack[i-1].push('');}
      scoresTotal[i-1].push(this.props.route[`player${i}Score`].reduce(function(sum, score){
        return sum + score;
      }, 0));
    }
    return this.renderResults(scoresFront, scoresBack, scoresTotal);

  },
  renderResults: function(scoresFront, scoresBack, scoresTotal){

      var self = this;
      var front = scoresFront.map(function(element, index){
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
            {self.scoreResults(element)}
          </View>
        );
      });
      var back = scoresBack.map(function(element, index){
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
            {self.scoreResults(element)}
          </View>
        );
      });
      var totals = scoresTotal.map(function(element, index){
        console.log("element", element)
        return(
          <View key = {index} style = {styles.row}>
            <Text style = {styles.title5}>{self.props.route[`player${index+1}Name`]}</Text>
            <Text style = {styles.title8}>{element[0]}</Text>
            <Text style = {styles.title8}>{element[1]}</Text>
            <Text style = {styles.title8}>{element[2]}</Text>
          </View>
        );
      });

      return (
        <View style = {{flex:3}}>
          <View style = {{flex:1}}/>
          <Text style = {styles.title6}>Front Nine</Text>
          <View style = {styles.row}>
            <Text style = {styles.title2}>Hole #</Text>
            {this.holesFront()}
          </View>
          <View style = {styles.row2}>
            <Text style = {styles.title9}>Par</Text>
            {this.parFront()}
          </View>
          <View style = {styles.row3}>
            <Text style = {styles.title2}>Hcp</Text>
            {this.hcpFront()}
          </View>
          {front}
          <View style = {{flex:1}}/>
          <Text style = {styles.title6}>Back Nine</Text>
          <View style = {styles.row}>
            <Text style = {styles.title2}>Hole #</Text>
            {this.holesBack()}
          </View>
          <View style = {styles.row2}>
            <Text style = {styles.title9}>Par</Text>
            {this.parBack()}
          </View>
          <View style = {styles.row3}>
            <Text style = {styles.title2}>Hcp</Text>
            {this.hcpBack()}
          </View>
          {back}
          <View style = {{flex:1}}/>
          <View style = {styles.row}>
            <Text style = {styles.title2}>Totals</Text>
            {this.holesTotal()}
          </View>
          {totals}
          <View style = {{flex:2}}/>
        </View>
      );

  },


  renderContent: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style = {{flex: 6}}>
        {this.renderScores()}
        </View>
      </Image>
    );
  },

  render: function(){
    var user  = this.props.route.data;
    console.log('hole state', this.state);
    console.log('hole props', this.props);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>currenthole</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'scorecard'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Scorecard</Text>
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
          title="Scorecard"
          selected={this.state.selectedTab === 'scorecard'}
          onPress={() => {
            this.setState({
              selectedTab: 'currenthole',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Current Hole"
          selected={this.state.selectedTab === 'betresults'}
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
    fontSize: 22,
    alignSelf: 'center'
  },
  title1: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: "500",
    opacity: 0.9,
  },

  title2: {
    color:'yellowgreen',
    fontSize: 14,
    width:60,

  },
  title3: {
    color:'greenyellow',
    fontSize: 14,
    width:20,
    textAlign: 'center',
  

  },

  title4: {
    color:'white',
    fontWeight: "400",
    fontSize: 14,
    width:20,
    height:16,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: "darkolivegreen",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 3,
  },
  title5: {
    color:'white',
    fontSize: 14,
    width:60,
    height:16,
    marginTop: 1,
    marginBottom: 1,
  },
  title6: {
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title7: {
    color:'greenyellow',
    fontSize: 14,
    width:50,
    textAlign: 'center',
  },

  title8: {
    color:'white',
    fontWeight: "400",
    fontSize: 14,
    width:50,
    height:16,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: "darkolivegreen",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 3,
  },

  title9: {
    color:'white',
    fontSize: 14,
    width:60,

  },
  title10: {
    color:'white',
    fontSize: 14,
    width:20,
    textAlign: 'center',
  },

  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container1: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container2: {
    backgroundColor: "darkolivegreen",
    opacity: 0.8,
    flex: .5,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5
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
    backgroundColor: "transparent"
  },
  row2:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'darkolivegreen'
  },
  row3:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black'
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
