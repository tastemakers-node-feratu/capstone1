import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'
import { checkboxes } from '../components/helpers/filterBoxes'
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import { snapFilterThunk } from '../store/snapshots'

class SnapFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkboxes: checkboxes
        }
        this.toggleCheckBox = this.toggleCheckBox.bind(this)
        this.addCategories = this.addCategories.bind(this)
    }

    componentDidMount() {
        let newBoxes = checkboxes.map(boxObj => {
            boxObj.checked = false
            return boxObj
        });
        this.setState({ checkboxes: newBoxes })
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

    addCategories() {
        if (this.props.snapFilterThunk) {
            this.props.snapFilterThunk(this.state);
            this.props.closeModal()
        }
    }

    render() {
        return (
            <SafeAreaView >
                <View style={styles.container}>
                    <View  >
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
                    < TouchableHighlight
                        onPress={this.addCategories}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonText}>{`- Confirm -`}</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        width: 380,
        height: 500,
        paddingBottom: 15

    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: 170,
        paddingVertical: 8,
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderRadius: 10,
        borderWidth: 0.5
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'playfair-display'
    },
})

const mapState = state => ({
    user: state.user,
});

const mapDispatch = dispatch => ({
    snapFilterThunk: (checkboxes) => dispatch(snapFilterThunk(checkboxes))
})

export default connect(mapState, mapDispatch)(SnapFilter)
