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
import { connect } from 'react-redux'
import { TouchableHighlight } from 'react-native-gesture-handler';
import SnapPreview from '../components/SnapPreview'
import { checkboxes } from '../components/helpers/checkboxes'
import MyImagePicker from './ImagePicker'

class CheckInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      placeName: '',
      location: '',
      description: '',
      tags: '',
      checkboxes: checkboxes,
      modalVisible: false,
      imageURL: null
    }
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.confirm = this.confirm.bind(this);
    this.done = this.done.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
  }

  toggleCheckBox(name) {
    const boxIndex = this.state.checkboxes.findIndex(box => box.name === name);
    let newBoxes = this.state.checkboxes;
    newBoxes[boxIndex].checked = !newBoxes[boxIndex].checked
    this.setState({
      ...this.state,
      checkboxes: newBoxes,
    })
  }

  done() {
    let boxIsChecked = false;
    this.state.checkboxes.forEach((box) => {
      if (box.checked) {
        boxIsChecked = true;
      }
    })
    if (!boxIsChecked || this.state.placeName === '' || this.state.location === '') {
      alert("You'll need to check at least one category, and include a name and location!");
    }
    else {
      this.toggleModal()
    }
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  confirm() {
    this.props.addSnapshot(this.state, this.props.user.id);
    const { navigate } = this.props.navigation;
    const { snapshot } = this.props;
    //For now, it navigates back to feed. But in the future, I want to navigate to the
    //user's pins on their profile
    navigate('AllSnapShots');
  }

  imageHandler(imageURL) {
    this.setState({ imageURL })
  }

  render() {
    return (
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
          // onRequestClose={() => console.log('modal closed')}
          >
            <View style={styles.modal}>
              <TouchableHighlight
                onPress={this.toggleModal}
              >
                <Text style={styles.backBtn}>{'<<Back'}</Text>
              </TouchableHighlight>
              <SnapPreview snapshot={this.state} user={this.props.user} />
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
                  <View /*style={styles.checkboxesRow}*/ >
                    {this.state.checkboxes.map((checkbox) => {
                      return (
                        <CheckBox
                          key={checkbox.name}
                          title={checkbox.name}
                          checked={checkbox.checked}
                          onPress={() => this.toggleCheckBox(checkbox.name)}
                        />
                      )
                    })}
                  </View>
                </View>
                <Text style={{ paddingTop: 10 }}>
                  Does it have a name?
                    </Text>
                <TextInput
                  autoCapitalize="words"
                  placeholder={'The Butcher\'s daughter'}
                  style={styles.input}
                  value={this.state.placeName}
                  onChangeText={placeName => this.setState({ placeName })}
                />
                <Text>
                  Where is {this.state.placeName}?
                    </Text>
                <TextInput
                  autoCapitalize="words"
                  placeholder={'10 Streetname St., Brooklyn, NY 11202'}
                  style={styles.input}
                  value={this.state.location}
                  onChangeText={location => { this.setState({ location }) }}
                />
                <Text>
                  Ok. Tell us about it.
                    </Text>
                <TextInput
                  autoCapitalize="sentences"
                  placeholder={'some filter text'}
                  style={styles.input}
                  value={this.state.description}
                  onChangeText={description => { this.setState({ description }) }}
                />
                <Text>
                  Add some tags, denoted by hashtags and separated by a space, so we can learn more about it.
                    </Text>
                <TextInput
                  placeholder={'#AvocadoToast'}
                  style={styles.input}
                  onChangeText={tags => { this.setState({ tags }) }}
                />
                <MyImagePicker
                  handler={this.imageHandler}
                />

                <TouchableOpacity
                  onPress={this.done}
                  style={styles.button}
                >
                  <Text style={styles.buttonTxt}>Done</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
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
    // user: {
    //   id: 1,
    //   username: 'mtoff',
    //   imageURL: 'https://reactnative.dev/img/tiny_logo.png'
    // },
    user: state.user,
    snapshot: state.snapshots.selectedSnapshot
  }
}

const mapDispatch = dispatch => ({
  addSnapshot: (snapshot, userId) => { dispatch(addSnapshotThunk(snapshot, userId)) }
})

export default connect(mapState, mapDispatch)(CheckInScreen)
