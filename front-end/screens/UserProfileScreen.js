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
import UserProfileLinks from '../components/userProfileLinks'
import LogOutButton from '../components/LogOutButton';
import FindFriendsButton from '../components/FindFriendsButton'

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
    const { username, firstName, lastName, bio, imageURL } = this.props.user
    this.setState({
      ...this.state,
      firstName,
      lastName,
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
          <View style={styles.topContainer}>
            <LogOutButton navigate={navigate} />
          </View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarEdit}>
                <Icon style={styles.closeIcon} name="close" size={30} color="black"
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
          <UserProfileLinks navigate={navigate} />
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
            <LogOutButton navigate={navigate} />
            <FindFriendsButton navigate={navigate} />
          </View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarEdit}>
                <Image style={styles.avatar}
                  source={{ uri: user.imageURL }} />
                <Icon name="edit" size={30} color="black" style={styles.editor}
                  onPress={() => this.setState({ editingMode: true })}
                />
              </View>
              <View  style={styles.userInfo}>
                <Text style={{...styles.userInfoText, fontSize: 22, fontWeight: '600', marginTop: 15}}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.userInfoText}>{user.username}</Text>
                <Text style={styles.userInfoText}>{user.bio} </Text>
              </View>
            </View>
          </View>
          <UserProfileLinks navigate={navigate} />
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
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'space-between'
  },
  header: {
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingBottom: 20
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  closeIcon: {
    paddingRight: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#f7786b",
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10

  },
  userInfo: {
    fontSize: 16,
    color: '#f7786b',
    fontWeight: '600',
  },
  userInfoText: {
    margin: 3
  },
  avatarEdit: {
    marginLeft: 125,
    marginRight: 100,
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
