import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements'
import { addSnapshotThunk } from '../store/snapshots'
import {connect} from 'react-redux'
import { TouchableHighlight } from 'react-native-gesture-handler';
import SnapPreview from '../components/SnapPreview'
import {checkboxes} from '../components/helpers/checkboxes'

class CheckInScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      placeName: '',
      location: '',
      description: '',
      tags: '',
      checkboxes: checkboxes,
      imageURL: 'https://reactnative.dev/img/tiny_logo.png',
      modalVisible: false
    }
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.confirm = this.confirm.bind(this);
    this.done = this.done.bind(this);
  }

  toggleCheckBox(index){
    let newBoxes = this.state.checkboxes;
    newBoxes[index].checked = !newBoxes[index].checked
    this.setState({
      ...this.state,
      checkboxes: newBoxes,
    })
  }

  done(){
    let boxIsChecked = false;
    this.state.checkboxes.forEach((box) => {
      if(box.checked){
        boxIsChecked = true;
      }
    })
    if(!boxIsChecked || this.state.placeName==='' || this.state.location===''){
        alert("You'll need to check at least one category, and include a name and location!");
      }
    else {
      this.toggleModal()
    }
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  confirm(){
      this.props.addSnapshot(this.state, this.props.user.id);
      const { navigate } = this.props.navigation;
      const { snapshot } = this.props;
      //For now, it navigates back to feed. But in the future, I want to navigate to the
      //user's pins on their profile
      navigate('AllSnapShots');
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  render() {
    return(
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={64}
        behavior="padding"
      >
        <SafeAreaView style={styles.container}>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => console.log('modal closed')}
          >
            <View style={styles.modal}>
              <TouchableHighlight
                onPress={this.toggleModal}
              >
                <Text style={styles.backBtn}>{'<<Back'}</Text>
              </TouchableHighlight>
              <SnapPreview snapshot={this.state} user={this.props.user}/>
              <Button
                title='Confirm'
                onPress={() => {
                  this.toggleModal();
                  this.confirm();
                }}
                style={styles.button}
              >Confirm</Button>
            </View>
          </Modal>
        <ScrollView contentContainerStyle={styles.contentContainer} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             <View style={styles.inner}>
              <Text style={styles.title}>
                What'd you discover?
              </Text>
              <View>
                <View style={styles.checkboxesRow}>
                  <CheckBox
                    title='food'
                    checked={this.state.checkboxes[0].checked}
                    onPress={() => this.toggleCheckBox(0)}
                  />
                  <CheckBox
                    title='fitness'
                    checked={this.state.checkboxes[1].checked}
                    onPress={() => this.toggleCheckBox(1)}
                  />
                </View>
                <View style={styles.checkboxesRow}>
                  <CheckBox
                    title='nightlife'
                    checked={this.state.checkboxes[2].checked}
                    onPress={() => this.toggleCheckBox(2)}
                  />
                  <CheckBox
                    title='shop'
                    checked={this.state.checkboxes[3].checked}
                    onPress={() => this.toggleCheckBox(3)}
                  />
                </View>
                <View style={styles.checkboxesRow}>
                  <CheckBox
                    title='beauty'
                    checked={this.state.checkboxes[4].checked}
                    onPress={() => this.toggleCheckBox(4)}
                  />
                  <CheckBox
                    title='experience'
                    checked={this.state.checkboxes[5].checked}
                    onPress={() => this.toggleCheckBox(5)}
                  />
                </View>
              </View>
              <Text style={{paddingTop: 10}}>
                      Does it have a name?
                    </Text>
                    <TextInput
                      autoCapitalize="words"
                      placeholder={'The Butcher\'s daughter'}
                      style={styles.input}
                      value={this.state.placeName}
                      onChangeText={placeName => {
                        const updated = this.capitalize(placeName)
                        this.setState({ placeName: updated })
                      }}
                    />
                    <Text>
                      Where is {this.state.placeName}?
                    </Text>
                    <TextInput
                      autoCapitalize="words"
                      placeholder={'10 Streetname St., Brooklyn, NY 11202'}
                      style={styles.input}
                      value={this.state.location}
                      onChangeText={location => {this.setState({ location })}}
                    />
                    <Text>
                      Ok. Tell us about it.
                    </Text>
                    <TextInput
                      autoCapitalize="sentences"
                      placeholder={'some filter text'}
                      style={styles.input}
                      value={this.state.description}
                      onChangeText={description => {this.setState({ description })}}
                    />
                    <Text>
                      Add some tags, denoted by hashtags and separated by a space, so we can learn more about it.
                    </Text>
                    <TextInput
                      placeholder={'#AvocadoToast'}
                      style={styles.input}
                      onChangeText={tags => {this.setState({ tags })}}
                      />

                    <TouchableOpacity
                      onPress={this.done}
                      style={styles.button}
                    >
                      <Text style={styles.buttonTxt}>Done</Text>
                    </TouchableOpacity>
                    <View style={{ flex : 1 }} />
             </View>
          </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 20,
        backgroundColor: '#74b9ff',
    },
    contentContainer: {
        paddingTop: 15,
        paddingBottom: 15
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "flex-end",
    },
    checkboxesRow: {
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'center'
    },
    input: {
      padding: 8,
      marginBottom: 8,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4,
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      // backgroundColor: '#f7021a',
      paddingHorizontal: 50,
      paddingVertical: 100
   },
    button: {
      marginTop: 10,
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      overflow: 'hidden',
      padding: 12,
      alignSelf: 'center',
    },
    buttonTxt: {
      textAlign: 'center',
      fontSize: 24,
      color: 'black',
      paddingHorizontal: 10
    },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#FFFFFF',
    margin: 10
  },
  backBtn: {
    color: 'blue',
    fontSize: 20,
  }
})

const mapState = state => {
  return {
    user: {
      id: 1,
      username: 'mtoff',
      imageURL: 'https://reactnative.dev/img/tiny_logo.png'
    },
  // user: state.user,
  snapshot: state.snapshots.selectedSnapshot
  }
}

const mapDispatch = dispatch => ({
    addSnapshot: (snapshot, userId) => {dispatch(addSnapshotThunk(snapshot, userId))}
})

export default connect(mapState, mapDispatch)(CheckInScreen)
