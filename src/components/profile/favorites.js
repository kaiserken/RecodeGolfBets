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
      selectedTab: 'favorites',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSource2: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      course: null,
      city: "",
      coursefav: "",
    };
  },

  componentDidMount: function(){
    var courses = this.props.route.data.favorites;
    if (courses.length ===0){
      courses = ["You don't have any favorites yet", "They will show up here after being added"];
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(courses)
    });
  },

  async courseSearch(){
    try {
      await Post('coursecity', {city: this.state.city}).then((data)=>{
        if (data.length === 0){
          data = [{coursename: "No Courses Found"}, {coursename:"Check the city spelling"}];
        }
        this.setState({
          dataSource2: this.state.dataSource2.cloneWithRows(data),
        });
      }).done();
    } catch (error) {
      console.log(error);
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
          <Text style={styles.label1}>Welcome {user.name}!</Text>
          <Text style={styles.label1}></Text>
          <View style={styles.container1}>
            <Text style={styles.label}>Select from your Favorites</Text>
            <Text style={styles.label}>or</Text>
            <TouchableHighlight
              onPress = {()=>this.setState({selectedTab: 'search'})}>
            <Text style={styles.label}>Use Course Search</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style  = {{flex:.05}}/>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderCourse}
          style = {styles.ListView}
        />
      <View style={{flex:.6}}/>
      </Image>
    );
  },

  renderSearch: function(){

    return (
      <Image source={require('../../assets/golfball.jpeg')} style={styles.backgroundImage}>
        {this.renderDrawer()}
        <View style  = {{flex:.05}}/>
        <View style  = {styles.container}>
          <View style={styles.container1}>
            <Text style={styles.label}>Search for a course by city</Text>
          </View>

          <TextInput
            style={styles.input}
            value  = {this.state.city}
            placeholder = {'City Name'}
            onChangeText= {(text)=>this.setState({city : text})}
          />
          <Button text={'Search'} onPress={this.courseSearch}/>
        </View>
        <View style  = {{flex:.05}}/>
        <ListView
          dataSource = {this.state.dataSource2}
          renderRow = {this.renderCourseSearch}
          style = {styles.ListView}
        />
      <View style={{flex: .6}}/>
    </Image>

    );
  },


  render: function(){
    var user  = this.props.route.data;

    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black', opacity:0.8}}>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.props.navigator.push({name: 'profile', data: user}),this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.setState({selectedTab: 'favorites'}),this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Favorites</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style = {styles.android1}
        onPress = {()=>{this.setState({selectedTab: 'search'}), this.refs['DRAWER_REF'].closeDrawer()}}>
        <Text style={{color: 'white', margin: 10, fontSize: 17, textAlign: 'left'}}>Course Search</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
      if (this.state.selectedTab === "favorites"){
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
      if (this.state.selectedTab === "search"){
        return (
          <DrawerLayoutAndroid
            ref = {'DRAWER_REF'}
            drawerWidth={200}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            {this.renderSearch()}

          </DrawerLayoutAndroid>
        );
      }
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
          title="Favorites"
          icon = {require('../../assets/favorites.png')}
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'favorites',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Course Search"
          icon = {require('../../assets/search.png')}
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          {this.renderSearch()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
  renderCourse: function(rowData){

      return (
      <TouchableOpacity onPress = {()=>this.onPressCourseRow(rowData)}>
        <View style  = {styles.row}>
          <Text style  = {styles.label}>{rowData}</Text>
        </View>
      </TouchableOpacity>
      );
  },
  renderCourseSearch: function(rowData){

      return (
      <TouchableOpacity onPress = {()=>this.onPressCourseSearchRow(rowData)}>
        <View style  = {styles.row}>
          <Text style  = {styles.label}>{rowData.coursename}</Text>
        </View>
      </TouchableOpacity>
      );
  },

  async onPressCourseRow(rowData){
    if (rowData === "You don't have any favorites yet" || rowData === "They will show up here after being added"){return}
    try {
      await Post('courseinfo', {coursename: rowData}).then((data)=>{
      this.props.navigator.push({name: 'setup', data: this.props.route.data, course:data[0]});
      }).done();
    } catch (error) {
      console.log(error);
    }

  },

  onPressCourseSearchRow: function(rowData){

    if (rowData.coursename  === "No Courses Found" || rowData.coursename === "Check the city spelling"){return}
    this.setState({course: rowData});
    this.props.navigator.push({name: 'addfavorites', data: this.props.route.data, course: this.state.course});
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
  android1: {
    backgroundColor: "darkolivegreen",
    borderTopWidth:10,
    borderColor: "beige",
    opacity: 0.8,
    height: 60,
    justifyContent: 'center'
  }
});
