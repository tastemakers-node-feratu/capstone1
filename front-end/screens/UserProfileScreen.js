import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { updateUserThunk } from '../store/user'
import UserProifleLinks from '../components/userProfileLinks'

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      imageURL: '',
      bio: '',
      username: '',
      firstName: '',
      lastName: ''
    }
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.getPlaceHolder = this.getPlaceHolder.bind(this);
  }

  componentDidMount() {
    const { username, name, bio, imageURL } = this.props.user
    this.setState({
      ...this.state,
      name,
      bio,
      username,
      imageURL
    })
  }

  handleUpdateUser() {
    const { id } = this.props.user
    this.props.updateUser(id, this.state);
    this.setState({
      ...this.state,
      editingMode: false
    })
  }

  getPlaceHolder(content, field){
    if(content === ''){
      return field
    }
    return content
  }

  render() {
    const { navigate } = this.props.navigation;
    const {user} = this.props

    if (this.state.editingMode) {
      return (
        <SafeAreaView>
          {/* <StatusBar barStyle="light-content" backgroundColor="#74b9ff" /> */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarEdit}>
                <Icon style={styles.icon} name="close" size={30} color="white"
                  onPress={() => this.setState({ editingMode: false })}
                />
                <Image style={styles.avatar}
                  source={{ uri: this.props.user.imageURL }} />
              </View>
              <View style={styles.nameInput}>
                <TextInput
                  autoCapitalize="words"
                  placeholder={this.getPlaceHolder(this.state.firstName, 'first name')}
                  style={styles.input}
                  value={this.state.firstName}
                  onChangeText={firstName => { this.setState({ firstName }) }}
                />
                <TextInput
                  autoCapitalize="words"
                  placeholder={this.getPlaceHolder(this.state.lastName, 'last name')}
                  style={styles.input}
                  value={this.state.lastName}
                  onChangeText={lastName => {
                    this.setState({ lastName });
                    console.log('state',  this.state.lastName)
                 }}
                />
              </View>
              <TextInput
                style={styles.input}
                placeHolder={this.state.username}
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
              <TextInput
                style={styles.input}
                placeHolder={this.getPlaceHolder(this.state.bio, 'bio')}
                value={this.state.bio}
                onChangeText={bio => this.setState({ bio })}
              />
              <TouchableOpacity
                onPress={() => this.handleUpdateUser()}
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          <UserProifleLinks navigate={navigate} />
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
                  source={{ uri: user.imageURL }} />
                <Icon name="edit" size={30} color="white" style={styles.editor}
                  onPress={() => this.setState({ editingMode: true })}
                />
              </View>
              <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.userInfo}>{user.username}</Text>
              <Text style={styles.userInfo}>{user.bio} </Text>
            </View>
          </View>
          <UserProifleLinks navigate={navigate} />
        </SafeAreaView >
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
  header: {
    backgroundColor: "#034f84",
    paddingTop: 20,
    paddingBottom: 20
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  icon: {
    paddingRight: 1,
    color: 'white'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#f7786b",
    marginBottom: 10,
    marginLeft: 30,

  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#f7cac9",
    fontWeight: '600',
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
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 4,
    color: 'gray',
    marginHorizontal: 5
  },
  nameInput: {
    flexDirection: 'row'
  }
});
