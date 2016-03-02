var React = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  Image
} = React;

var Button = require('../common/button');
var Post = require('../common/post');

module.exports = React.createClass({

  getInitialState: function(){
    return{
      username: '',
      email: '',
      password: '',
      passwordconfirmation: '',
      errorMessage: '',
    };
  },

  render: function(){
    return(
      <Image source={require('../../assets/grass5.jpeg')} style={styles.backgroundImage}>
      <View style = {styles.container}>
        <Text style = {styles.label}>Sign Up</Text>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(text)=>this.setState({username: text})}
          style= {styles.input}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(text)=>this.setState({email: text})}
          style= {styles.input}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text)=>this.setState({password: text})}
          style= {styles.input}
        />
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.passwordconfirmation}
          onChangeText={(text)=>this.setState({passwordconfirmation: text})}
          style= {styles.input}
        />
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Signup'} onPress={this.onSignupPress}/>
        <Button text={'I have an account'} onPress={this.onSigninPress}/>
      </View>
      </Image>
    );
  },
  onSignupPress: function(){
    if(this.state.username ===""){
      return this.setState({errorMessage: 'You need to enter a Username'});
    }
    if(this.state.password !== this.state.passwordconfirmation){
      return this.setState({errorMessage: 'Your passwords do not match'});
    }
    Post('signup', {name: this.state.username, email: this.state.email, password: this.state.password}).then((data)=>{
    console.log('signup data',data);
    if (data === undefined){
      this.setState({errorMessage: "Account with that email already exists"});
    } else {
      this.props.navigator.immediatelyResetRouteStack([{name: 'favorites', data: data}]);
    }
    }).done();


  },

  onSigninPress: function(){
    this.props.navigator.pop();
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label:{
    color: 'white'
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
