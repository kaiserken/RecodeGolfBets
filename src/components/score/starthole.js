var React  = require('react-native');

 var {
   View,
   Text,
   StyleSheet,
   Platform,
   Image,
   TouchableHighlight
 } = React;

 var Button  = require('../common/button');

 module.exports = React.createClass({

  getInitialState: function(){
    return {
      startHole: null,
    };
  },

  submitHoleNumeber: function(){
    if (this.state.startHole){
      return (
        <View style  = {{justifyContent:"center", alignItems:"center"}}>
          <View style = {{flex:2}}/>
          <Text style = {styles.title1}>You selected Hole {this.state.startHole}</Text>
          <View style = {{flex:1}}/>
          <Button text={'Start Round'} onPress={this.onSubmitHole}/>
        </View>
      );
    }

  },

  onSubmitHole: function(){
    this.props.navigator.push({
      name: "hole",
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
      startHole: this.state.startHole
    });
  },

  render: function(){
    return (
      <Image source={require('../../assets/dark.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>{this.props.route.course.coursename}</Text>
        </View>
        <View style = {{flex:.2}}/>
        <View style  = {styles.container2}>
          <Text style = {styles.title1}>Select your starting hole</Text>
        </View>
        <View style = {{flex:.2}}/>
        <View style = {styles.rowheader}>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole: 1})}>
            <Text style={styles.plusMinus}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:2})}>
            <Text style={styles.plusMinus}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:3})}>
            <Text style={styles.plusMinus}>3</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.rowheader}>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole: 4})}>
            <Text style={styles.plusMinus}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:5})}>
            <Text style={styles.plusMinus}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:6})}>
            <Text style={styles.plusMinus}>6</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.rowheader}>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole: 7})}>
            <Text style={styles.plusMinus}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:8})}>
            <Text style={styles.plusMinus}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:9})}>
            <Text style={styles.plusMinus}>9</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.rowheader}>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole: 10})}>
            <Text style={styles.plusMinus}>10</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:11})}>
            <Text style={styles.plusMinus}>11</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:12})}>
            <Text style={styles.plusMinus}>12</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.rowheader}>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole: 13})}>
            <Text style={styles.plusMinus}>13</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:14})}>
            <Text style={styles.plusMinus}>14</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:15})}>
            <Text style={styles.plusMinus}>15</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.rowheader}>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole: 16})}>
            <Text style={styles.plusMinus}>16</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:17})}>
            <Text style={styles.plusMinus}>17</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style  = {styles.touchablehighlight1}
            onPress={()=>this.setState({startHole:18})}>
            <Text style={styles.plusMinus}>18</Text>
          </TouchableHighlight>
        </View>
        <View style = {{flex:1, justifyContent: "center"}} >
          {this.submitHoleNumeber()}
        </View>
      </Image>
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
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: "500",
    opacity: 0.9,
  },
  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.7,
    flex: 1,
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
    padding: 10
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  touchablehighlight1:{
    borderRadius: 20,
    backgroundColor: "darkolivegreen",
  	width: 40,
  	height: 40,
    justifyContent:'center',
    alignItems: "center",
    borderWidth:1,
    borderColor:"white"
  },
  plusMinus: {
    fontWeight: "900",
    fontSize: 20,
    color:'white',
    textAlign: 'center',
    alignSelf: "center"
  },
  rowheader:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

 });
