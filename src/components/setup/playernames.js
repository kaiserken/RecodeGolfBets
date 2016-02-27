var React = require('react-native');

var {
  View,
  Text,
  TextInput,
  StyleSheet,
} =  React;

module.exports = React.createClass({
  render: function(){
    return(
        <View>
          <TextInput
            style  = {styles.input}
            placeholder = "Name"
            value  = {this.props.value1}
            onChangeText = {this.props.onChangeText}
            />
        </View>
    );
  },
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    padding: 4,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    width: 150,
    alignSelf: 'center'
  },
});
