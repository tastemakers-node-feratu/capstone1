import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import {connect} from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { updateUserThunk } from '../store/user'
import UserProifleLinks from '../components/userProfileLinks'

class UserProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      editingMode: false,
      imageURL: '',
      bio: '',
      username: '',
      name: ''
    }
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  componentDidMount(){
    const {username, name, bio, imageURL} = this.props.user
    this.setState({
      ...this.state,
      name,
      bio,
      username,
      imageURL
    })
  }

  handleUpdateUser(){
    const {id} = this.props.user
    this.props.updateUser(id, this.state);
    this.setState({
      ...this.state,
      editingMode: false
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    if(this.state.editingMode){
      return (
        <SafeAreaView>

          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarEdit}>
                <Icon style={styles.icon} name="close" size={30} color="black"
                  onPress={() => this.setState({editingMode: false})}
                />
                <Image style={styles.avatar}
                  source={{uri: this.props.user.imageURL}}/>
                </View>
                <TextInput
                      autoCapitalize="words"
                      placeholder={this.state.name}
                      style={styles.input}
                      value={this.state.name}
                      onChangeText={name => {this.setState({ name })}}
                    />
                  <TextInput
                    style={styles.input}
                    placeHolder={this.state.username}
                    value={this.state.username}
                    onChangeText={username => this.setState({username})}
                  />
                  <TextInput
                    style={styles.input}
                    placeHolder={this.state.bio}
                    value={this.state.bio}
                    onChangeText={bio => this.setState({bio})}
                  />
                  <TouchableOpacity
                    onPress={() => this.handleUpdateUser()}
                  >
                    <Text>Save</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <UserProifleLinks navigate={navigate}/>
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.avatarEdit}>
                  <Image style={styles.avatar}
                    source={{uri: this.props.user.imageURL}}/>
                  <Icon name="edit" size={30} color="black" style={styles.editor}
                    onPress={() => this.setState({editingMode: true})}
                  />
                </View>
                  <Text style={styles.name}>{this.props.user.name}</Text>
                  <Text style={styles.userInfo}>{this.props.user.username}</Text>
                  <Text style={styles.userInfo}>{this.props.user.bio} </Text>
              </View>
            </View>
            <UserProifleLinks navigate={navigate}/>
        </SafeAreaView>
      );
    }
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  updateUser: (id, info) => dispatch(updateUserThunk(id, info))
});

export default connect(mapState, mapDispatch)(UserProfileScreen)

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#74b9ff",
    paddingTop: 20,
    paddingBottom: 20
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  icon: {
    paddingRight: 1
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "black",
    marginBottom:10,
    marginLeft: 30,

  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"white",
    fontWeight:'600',
  },
  avatarEdit: {
    flexDirection: 'row'
  },
  editor: {
    paddingTop: 100,
  },
  input: {
      padding: 8,
      marginBottom: 8,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 4,
      color: 'gray'
  }
});
