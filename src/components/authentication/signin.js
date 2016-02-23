var React  = require('react-native');

 var {
   View,
   Text,
   StyleSheet,
   TextInput,
   Platform
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
      <View style = {styles.container}>
          <Text style = {styles.label}>Sign In</Text>
          <Text style  = {styles.label}>Email:</Text>
          <TextInput
            style  = {styles.input}
            value  = {this.state.email}
            onChangeText = {(text)=>this.setState({email: text})}
            />
            <Text style  = {styles.label}>Password:</Text>
            <TextInput
            secureTextEntry = {true}
            style  = {styles.input}
            value = {this.state.password}
            onChangeText={(text)=>this.setState({password: text})}
            />
            <Text style = {styles.label}>{this.state.errorMessage}</Text>
            <Button text = {'Sign In'} onPress={this.onPress}/>
            <Button text = {"I need an account..."} onPress={this.onSignupPress}/>
      </View>
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
          this.props.navigator.immediatelyResetRouteStack([{name: 'welcome', data: data}]);
        }
      }).done();
  }
 });

 var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'black'
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
  }

 });
