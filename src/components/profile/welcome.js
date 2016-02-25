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
      selectedTab: 'welcome',
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

  courseSearch: function(){
    Post('coursecity', {city: this.state.city}).then((data)=>{
      this.setState({
          dataSource2: this.state.dataSource2.cloneWithRows(data),
      });
    }).done();
  },

  renderContent: function(user) {
    return (
      <View style = {{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.label}>Welcome Back {user.name}!</Text>
          <Text style={styles.label}>Start a new round on</Text>
          <Text style={styles.label}>one of your favorite</Text>
          <Text style={styles.label}>courses or search for</Text>
          <Text style={styles.label}>a new one</Text>
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

  newRoute: function(user){
    this.props.navigator.push({name: 'profile', data: user});
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
      <Text style={{color: 'white', margin: 10, fontSize: 15, textAlign: 'left'}}>Play Round</Text>
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
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Profile"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.props.navigator.push({name: 'profile', data: user});
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Welcome"
          selected={this.state.selectedTab === 'welcome'}
          onPress={() => {
            this.setState({
              selectedTab: 'welcome',
            });
          }}>
          {this.renderContent(user)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
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
      var value  = await Post('courseinfo', {coursename: rowData}).then((data)=>{
        this.setState({
            course: data[0]
        });
      }).done();
      if (value !== null){
        this.props.navigator.push({name: 'profile', data: this.props.route.data, course: this.state.course});
      }
    } catch (error) {
      console.log(error);
    }

  },

  onPressCourseSearchRow: function(rowData){
    this.setState({course: rowData});
    this.props.navigator.push({name: 'profile', data: this.props.route.data, course: this.state.course});
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
