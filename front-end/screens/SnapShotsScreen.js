import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text, Modal,
    TouchableHighlight,
    ScrollView,
    View,
} from 'react-native';
import { Spinner } from 'native-base'
import MiniSnapShot from '../components/MiniSnapShot'
import SnapFilter from '../components/SnapFilter'
import { allSnapshotsThunk } from '../store/snapshots'
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import LogOutButton from '../components/LogOutButton';
import { MaterialIcons } from '@expo/vector-icons'

class SnapShotsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        if (this.props.user && this.props.user.id) {
            console.log(this.props.user)
            this.props.allSnapshotsThunk(this.props.user.id, this.props.catFilter);
        }
    }

    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    render() {
        const { navigate } = this.props.navigation;
        return !this.props.allLoading ? (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                    <LogOutButton navigate={navigate} />
                    <View style={styles.rightButtons}>
                        <Button title="Filter" color={'white'} onPress={this.toggleModal} />
                        <Button title="My Friends" color={'white'} onPress={() => navigate('AllFriends')} />
                    </View>
                </View>
                <Modal visible={this.state.modalVisible} animationType='slide'>
                    <View style={styles.modal}>
                        <TouchableHighlight
                            onPress={this.toggleModal} style={styles.buttonContainer}
                        >
                            <Text style={styles.backBtn}>{'<<Back'}</Text>
                        </TouchableHighlight>
                        <SnapFilter user={this.props.user} />
                    </View>
                </Modal>
                <ScrollView style={styles.contentContainer} >
                    {this.props.allSnapshots.map(snapshot => (
                        <MiniSnapShot key={snapshot.id} snapshot={snapshot} navigate={navigate} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        ) : (
                <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#74b9ff' }}>
                    <Spinner color="#7d5fff" />
                </SafeAreaView>
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
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    rightButtons: {
        flexDirection: "row",
    },
    modalToggle: {
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 10,
        padding: 10,
        width: 45,
        marginLeft: 10
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 100
    },
    backBtn: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center'
    },
    buttonContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#2980b9',
        width: 90,
        paddingVertical: 10,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10
    }
})

const mapState = state => ({
    user: state.user,
    allSnapshots: state.snapshots.allSnapshots,
    catFilter: state.snapshots.catFilter,
    allLoading: state.snapshots.allLoading
});

const mapDispatch = dispatch => ({
    allSnapshotsThunk: (id) => dispatch(allSnapshotsThunk(id))
})

export default connect(mapState, mapDispatch)(SnapShotsScreen)
