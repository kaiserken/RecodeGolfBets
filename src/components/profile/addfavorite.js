var React  = require('react-native');

var {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  DrawerLayoutAndroid,
  TabBarIOS,
  TouchableHighlight,
  ListView,
  TouchableOpacity,
  Image,
} = React;

var Post = require('../common/post');
var Button = require('../common/button');

module.exports  = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'addfavorites',
      course: null,
      city: "",
      coursefav: "",
    };
  },



  async addFavorite(){
    try {
      await Post('coursecity', {city: this.state.city}).then((data)=>{
        if (data.length === 0){
          data = [{coursename: "No Courses Found"}, {coursename:"Check the city spelling"}];
        }
        this.setState({
          coursefav: "Succesfully Saved to Favorites"
        });
      }).done();
    } catch (error) {
      console.log(error);
    }
  },

  renderContent: function(user) {
    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        <View style={styles.titlecontainer}>
          <Text style={styles.titlelabel}>Golf Bets</Text>
        </View>
        <View style  = {{flex:.05}}/>
        <View style  = {styles.container}>
          <Text style={styles.label1}>You selected</Text>
          <Text style={styles.label1}></Text>
          <View style={styles.container1}>
            <Text style={styles.label}>{this.props.route.course.coursename}</Text>
          </View>
          <Button text = {'Add Course to Favorites'} onPress={()=>{this.addFavorite()}}/>
          <Text style={styles.label}>{this.state.coursefav}</Text>
          <Button text = {"Continue"} onPress={()=>{this.props.navigator.push({name: 'setup', data: this.props.route.data, course: this.props.route.course})}}/>
        </View>
        <View style  = {{flex:.05}}/>

      <View style={{flex:.6}}/>
      </Image>
    );
  },




  render: function(){
    var user  = this.props.route.data;
    console.log(this.state);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight style = {{backgroundColor: 'green'}}
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'addfavorites'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Add Favorites</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Course Search</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
        return (
          <DrawerLayoutAndroid
            drawerWidth={200}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            {this.renderContent(user)}
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
          title="Add Favorites"
          selected={this.state.selectedTab === 'addfavorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'addfavorites',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Course Search"
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.props.navigator.pop()
          }}>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  titlecontainer: {
    backgroundColor: "black",
    opacity: 0.5,
    flex: .15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container1: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    borderRadius:5,
    backgroundColor: "darkolivegreen",
    opacity: 0.6,
  },
  titlelabel: {
    color: 'white',
    fontSize: 22,
  },
  label: {
    color: 'white',
  },
  label1: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500"
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
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    backgroundColor: 'darkolivegreen',
    borderColor: "black",
    borderWidth: 1,
    opacity: 0.7
  },
  listView: {
    flex: 4,
    paddingTop: 20,
  },
  backgroundImage: {
    marginTop:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },

});
