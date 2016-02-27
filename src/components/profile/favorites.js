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

  renderContent: function(user) {
    return (
      <View style = {{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.label}>Welcome Back {user.name}!</Text>
          <Text style={styles.label}></Text>
          <Text style={styles.label}>Select From Your Favorites</Text>
        </View>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderCourse}
          style = {styles.ListView}
        />
      </View>
    );
  },

  renderSearch: function(){
    return (
      <View style = {{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.label}>Search for Course by City</Text>
          <TextInput
            style={styles.input}
            value  = {this.state.city}
            onChangeText= {(text)=>this.setState({city : text})}
          />
          <Button text={'Search'} onPress={this.courseSearch}/>
        </View>
        <ListView
          dataSource = {this.state.dataSource2}
          renderRow = {this.renderCourseSearch}
          style = {styles.ListView}
        />
      </View>

    );
  },


  render: function(){
    var user  = this.props.route.data;
    console.log(this.state);
    var navigationView = (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TouchableHighlight
        onPress = {()=>this.props.navigator.push({name: 'profile', data: user})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'favorites'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Favorites</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress = {()=>this.setState({selectedTab: 'search'})}>
        <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Course Search</Text>
      </TouchableHighlight>
    </View>
    );

    if (Platform.OS === "android"){
      if (this.state.selectedTab === "favorites"){
        return (
          <DrawerLayoutAndroid
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
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Profile"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Favorites"
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
    console.log('rowdata', rowData);
      return (
      <TouchableOpacity onPress = {()=>this.onPressCourseRow(rowData)}>
        <View style  = {styles.row}>
          <Text>{rowData}</Text>
        </View>
      </TouchableOpacity>
      );
  },
  renderCourseSearch: function(rowData){
    console.log('rowdata', rowData);
      return (
      <TouchableOpacity onPress = {()=>this.onPressCourseSearchRow(rowData)}>
        <View style  = {styles.row}>
          <Text>{rowData.coursename}</Text>
        </View>
      </TouchableOpacity>
      );
  },

  async onPressCourseRow(rowData){
    try {
      await Post('courseinfo', {coursename: rowData}).then((data)=>{
      this.props.navigator.push({name: 'setup', data: this.props.route.data, course:data[0]});
      }).done();
    } catch (error) {
      console.log(error);
    }

  },

  onPressCourseSearchRow: function(rowData){
    console.log('rowData', rowData);
    if (rowData.coursename  === "No Courses Found" || rowData.coursename === "Check the city spelling"){return}
    this.setState({course: rowData});
    this.props.navigator.push({name: 'setup', data: this.props.route.data, course: this.state.course});
  },


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'black',
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
    backgroundColor: 'transparent',
  },
  listView: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },

});
