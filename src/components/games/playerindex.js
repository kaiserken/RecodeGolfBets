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
      <View style  = {styles.row}>
        <Text style  = {styles.name}>{this.props.text}</Text>
        <TextInput
          style  = {styles.input}
          placeholder = "HCP"
          value  = {this.props.value}
          onChangeText = {this.props.onChangeText}
          />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  name: {
    color: 'white',
    width: 75
  },
  input: {
    padding: 1,
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    width: 50,
    alignSelf: 'center'
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
});
