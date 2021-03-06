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
      coursefav: null,
    };
  },



  addFavorite(){
    Post('addfavorite', {email: this.props.route.data.email, coursename: this.props.route.course.coursename}).then((data)=>{

      if (data === undefined){
        this.setState({coursefav: "Error - Not Added"});
      } else {
        this.props.navigator.immediatelyResetRouteStack([{name: 'loggedin'}]);
      }
    }).done();
    this.setState({coursefav: "remove button"});
  },

  addButton: function(){
    if (!this.state.coursefav){
      return (
        <Button text = {'Add this Course to my Favorites'} onPress={()=>{this.addFavorite()}}/>
      );
    }
  },

  renderDrawer: function(){
    if (Platform.OS === "android"){
      return (
        <View style={{ justifyContent:'space-around', alignItems: 'center', flex: .15, flexDirection:'row', backgroundColor:"black"}}>
          <TouchableOpacity
            style={{width : 30}}
            onPress = {()=> this.refs['DRAWER_REF'].openDrawer()}>
            <View>
              <Text style  = {{fontSize:10, textAlign: "center", color: 'greenyellow'}}>Menu</Text>
              <Image source ={require('../../assets/dlist.png')}></Image>
            </View>
          </TouchableOpacity>
          <Text style={styles.titlelabel}>Golf Bets</Text>
          <Text style={{width:30}}></Text>
        </View>
      );
    } else {
      return (
        <View style={styles.titlecontainer}>
          <Text style={styles.titlelabel}>Golf Bets</Text>
        </View>
      );
    }
  },

  renderContent: function(user) {

    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        {this.renderDrawer()}
        <View style  = {{flex:.05}}/>
        <View style  = {styles.container}>
          <Text style={styles.label1}>You selected</Text>
          <Text style={styles.label1}></Text>
          <View style={styles.container1}>
            <Text style={styles.label}></Text>
            <Text style={styles.label}>{this.props.route.course.coursename}</Text>
            <Text style={styles.label}></Text>
            <Text style={styles.label}>If you would like to add this course to your</Text>
            <Text style={styles.label}>favorites. Click on the button below.</Text>
            <Text style={styles.label}></Text>
          </View>
          <View style  = {{flex:.2}}/>
          {this.addButton()}
          <View style  = {{flex:.2}}/>
          <Text style={styles.label1}>Otherwise</Text>
          <Text style={styles.label1}></Text>
          <Button text = {"Continue to Player Setup"} onPress={()=>{this.props.navigator.push({name: 'setup', data: this.props.route.data, course: this.props.route.course})}}/>
          <View style  = {{flex:.2}}/>
          <Text style={styles.label1}>{this.state.coursefav}</Text>
        </View>
        <View style  = {{flex:.05}}/>

      <View style={{flex:.6}}/>
      </Image>
    );
  },




  render: function(){
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.props.navigator.push({name: 'profile', data:user}), this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.setState({selectedTab: 'addfavorites'}), this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Add Favorites</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>this.props.navigator.pop()}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Course Search</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
        return (
          <DrawerLayoutAndroid
            ref = {'DRAWER_REF'}
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
          icon = {require('../../assets/results.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Add Favorites"
          icon = {require('../../assets/favorites.png')}
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
          icon = {require('../../assets/search.png')}
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
    alignItems: 'center',
    flex: 1.2
  },
  container1: {
    flex: .3,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    borderRadius:5,
    backgroundColor: "darkolivegreen",
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
  android1: {
    backgroundColor: "darkolivegreen",
    borderTopWidth:10,
    borderColor: "beige",
    opacity: 0.8,
    height: 60,
    justifyContent: 'center'
  }
});
