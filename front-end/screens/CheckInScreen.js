import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { addSnapshotThunk } from '../store/snapshots'
import {connect} from 'react-redux'

import { MonoText } from '../components/StyledText';

class CheckInScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      placeName: '',
      location: '',
      description: '',
      tags: '',
      checkboxes: [
        //{ food: false }, reach by title?
        { name: 'food', checked: false },
        { name: 'fitness', checked: false },
        { name: 'nightlife', checked: false },
        { name: 'shop', checked: false },
        { name: 'beauty', checked: false },
        { name: 'experience', checked: false },
      ]
    }
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggleCheckBox(index){
    let newBoxes = this.state.checkboxes;
    newBoxes[index].checked = !newBoxes[index].checked
    this.setState({
      ...this.state,
      checkboxes: newBoxes,
    })
  }

  submit(){
    console.log('hello in submit');
    const tempUserId = 1;
    this.props.addSnapshot(this.state, tempUserId)
  }

    render() {
    //   console.log('PROPS IN FRIENDS', this.props)
        return (
            <SafeAreaView style={styles.container} >
                <ScrollView contentContainerStyle={styles.contentContainer} >
                  <Text style={styles.title}>
                    What'd you discover?
                  </Text>
                    <View style={styles.checkboxesContainer}>
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
                    <Text>
                      Does it have a name?
                    </Text>
                    <TextInput
                      placeholder={'The Butcher\'s daughter'}
                      style={styles.input}
                      value={this.state.placeName}
                      onChangeText={placeName => this.setState({ placeName })}
                    />
                    <Text>
                      Where is {this.state.placeName}?
                    </Text>
                    <TextInput
                      placeholder={'10 Streetname St., Brooklyn, NY 11202'}
                      style={styles.input}
                      value={this.state.location}
                      onChangeText={location => {this.setState({ location })}}
                    />
                    <Text>
                      Ok. Tell us about it.
                    </Text>
                    <TextInput
                      placeholder={'some filter text'}
                      style={styles.input}
                      value={this.state.description}
                      onChangeText={description => {this.setState({ description })}}
                    />
                    <Text>
                      Add some tags, denoted by hashtags and separated by commas, so we can learn more about it.
                    </Text>
                    <TextInput
                      placeholder={'#AvocadoToast'}
                      style={styles.input}
                      onChangeText={tags => {this.setState({ tags })}}
                      />

                    <Button
                      title={'Done'}
                      onPress={()=>this.submit()}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#74b9ff',
    },
    checkboxesContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    input: {
      padding: 8,
      marginBottom: 8,
      borderColor: 'blue',
      borderWidth: 1,
      borderRadius: 4,
      // alignItems: 'flex-start'
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#a29bfe',
      margin: 15,
      marginLeft: 30,
      marginRight: 30,
      alignItems: 'center',
      borderRadius: 10,
      paddingBottom: 15
    },
  title: {
    fontSize: 25,
    color: '#FFFFFF',
    margin: 10
  },
    topContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    rightButtons: {
        flexDirection: "row",
    }
})

// const mapState = state => ({
//   userId: state.user.id
// })

const mapDispatch = dispatch => ({
    addSnapshot: (userId) => {dispatch(addSnapshotThunk(userId))}
})

export default connect(null, mapDispatch)(CheckInScreen)
