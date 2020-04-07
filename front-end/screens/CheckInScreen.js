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
                  What did you discover?
              </Text>
                <View>
                  <View>
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
                <Text style={{
                  ...styles.textQuestion,
                  paddingTop: 20,
                }}>
                  Does it have a name?
                    </Text>
                <TextInput
                  autoCapitalize="words"
                  placeholder={'The Butcher\'s daughter'}
                  placeholderTextColor="rgba(201, 201, 201, 0.7)"
                  style={styles.input}
                  value={this.state.placeName}
                  onChangeText={placeName => this.setState({ placeName })}
                />
                <Text style={styles.textQuestion}>
                  Where is {this.state.placeName}?
                    </Text>
                <TextInput
                  autoCapitalize="words"
                  placeholder={'10 Streetname St., Brooklyn, NY 11202'}
                  placeholderTextColor="rgba(201, 201, 201, 0.7)"
                  style={styles.input}
                  value={this.state.location}
                  onChangeText={location => { this.setState({ location }) }}
                />
                <Text style={styles.textQuestion}>
                  Ok. Tell us about it.
                    </Text>
                <TextInput
                  autoCapitalize="sentences"
                  placeholder={'some filter text'}
                  placeholderTextColor="rgba(201, 201, 201, 0.7)"
                  style={styles.input}
                  value={this.state.description}
                  onChangeText={description => { this.setState({ description }) }}
                />
                <Text style={styles.textQuestion}>
                  Add some tags, denoted by hashtags and separated by a space, so we can learn more about it.
                    </Text>
                <TextInput
                  placeholder={'#AvocadoToast'}
                  placeholderTextColor="rgba(201, 201, 201, 0.7)"
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
    backgroundColor: '#FFF',
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
    backgroundColor: 'white',
    borderColor: 'gray',
    color: 'black',
    borderBottomWidth: 1,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 100
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#dbdbdb',
    borderRadius: 12,
    borderWidth: 0.5,
    width: 100,
    padding: 6
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 20,
    color: '#1f1f1f',
    fontFamily: 'playfair-display'
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#000',
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'playfair-display'
  },
  backBtn: {
    color: 'blue',
    fontSize: 20,
  },
  textQuestion: {
    color: '#ff8482',
    fontWeight: '400',
    fontSize: 14,
    // textAlign: 'center'
  }
})

const mapState = state => {
  return {
    user: state.user,
    snapshot: state.snapshots.selectedSnapshot
  }
}

const mapDispatch = dispatch => ({
  addSnapshot: (snapshot, userId) => { dispatch(addSnapshotThunk(snapshot, userId)) }
})

export default connect(mapState, mapDispatch)(CheckInScreen)
