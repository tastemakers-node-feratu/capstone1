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

class UserProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      editingMode: false,
      email: '',
      imageURL: '',
      bio: '',
      name: ''
    }
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
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
    console.log('user props', this.props.user)
    if(this.state.editingMode){
      return (
        <SafeAreaView>

          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarEdit}>
                <Icon name="close" size={30} color="black"
                  onPress={() => this.setState({editingMode: false})}
                />
                <Image style={styles.avatar}
                  source={{uri: this.props.user.imageURL}}/>
                  <Icon name="pencil" size={30} color="black" />
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
                    placeHolder={this.state.email}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
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
                  <Text style={styles.userInfo}>{this.props.user.email}</Text>
                  <Text style={styles.userInfo}>{this.props.user.bio} </Text>
              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Icon style={styles.icon} name="users" size={30} color="white"/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>My Friends</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Icon style={styles.icon} name="tags" size={30} color="white"/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>My Pins</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Icon style={styles.icon} name="gears" size={30} color="white"/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>Settings</Text>
                </View>
              </View>

            </View>
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
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#a29bfe",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    padding: 7
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
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
