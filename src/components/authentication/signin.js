var React  = require('react-native');

 var {
   View,
   Text,
   StyleSheet,
   TextInput,
   Platform,
   Image
 } = React;

 var Button  = require('../common/button');
 var Post  = require('../common/post');

 module.exports = React.createClass({

  getInitialState: function(){
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },

  render: function(){
    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View>
          <Text style = {styles.title}>Golf Bets</Text>
        </View>
        <View style = {styles.container}>
          <Text style = {styles.label}>Sign In</Text>
          <Text style = {styles.label}></Text>
          <Text style  = {styles.label}>Email:</Text>
          <TextInput
            placeholder = {'Email'}
            style  = {styles.input}
            value  = {this.state.email}
            onChangeText = {(text)=>this.setState({email: text})}
            />
            <Text style  = {styles.label}>Password:</Text>
            <TextInput
            secureTextEntry = {true}
            placeholder = {'Password'}
            style  = {styles.input}
            value = {this.state.password}
            onChangeText={(text)=>this.setState({password: text})}
            />
            <Text style = {styles.label}>{this.state.errorMessage}</Text>
            <Button text = {'Sign In'} onPress={this.onPress}/>
            <Text style = {styles.label}></Text>
            <Text style = {styles.label}></Text>
            <Button text = {"I need an account..."} onPress={this.onSignupPress}/>
        </View>

      </Image>
    );
  },

  onSignupPress: function(){
    this.props.navigator.push({name:'signup'}); // pass additional props here
  },

  onPress: function(){
      Post('signin', {email: this.state.email, password: this.state.password}).then((data)=>{
        console.log('data',data);
        if (data === undefined){
          this.setState({errorMessage: "Invalid Login Parameters"});
        } else {
          // route to course favs page  - or profile page
          this.props.navigator.immediatelyResetRouteStack([{name: 'favorites', data: data}]);
        }
      }).done();
  }
 });

 var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 45,
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 40,
    marginBottom:20

  },
  label: {
    color: 'white',
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
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },

 });
