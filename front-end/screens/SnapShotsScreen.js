import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text, Modal,
    TouchableHighlight,
    ScrollView,
    View,
    FlatList
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
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (this.props.userId) {
            const snapshotData = {
                userId: this.props.userId,
                catFilter: this.props.catFilter
            }
            this.props.allSnapshotsThunk(snapshotData);
        } else {
            console.log('NO USER NO SNAPSHOTS')
        }
    }

    openModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    closeModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
        const snapshotData = {
            userId: this.props.userId,
            catFilter: this.props.catFilter
        }
        this.props.allSnapshotsThunk(snapshotData);
    }

    render() {
        const { navigate } = this.props.navigation;
        return !this.props.allLoading ? (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                    <LogOutButton navigate={navigate} />
                    <View style={styles.rightButtons}>
                        <Button title="Filter" color={'black'} onPress={this.openModal} />
                    </View>
                </View>
                <Modal visible={this.state.modalVisible} animationType='slide'>
                    <View style={styles.modal}>
                        <TouchableHighlight
                            onPress={this.closeModal} style={styles.buttonContainer}
                        >
                            <Text style={styles.backBtn}>{'<<Back'}</Text>
                        </TouchableHighlight>
                        <SnapFilter user={this.props.user} />
                    </View>
                </Modal>
                {/* <ScrollView style={styles.contentContainer} >
                    {this.props.allSnapshots.map(snapshot => {
                        return (
                        <MiniSnapShot key={snapshot.id} snapshot={snapshot} navigate={navigate} />
                    )})}
                </ScrollView> */}
                <View style={styles.contentContainer}>
                <FlatList
                keyExtractor={item => item.id.toString()}
                data={this.props.allSnapshots}
                renderItem={({item}) => (<MiniSnapShot snapshot={item} navigate={navigate} />)}
                />
                </View>
            </SafeAreaView>
        ) : (
                <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#034f84' }}>
                    <Spinner color="#7d5fff" />
                </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#034f84',
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
    userId: state.user.id,
    allSnapshots: state.snapshots.allSnapshots,
    catFilter: state.snapshots.catFilter,
    allLoading: state.snapshots.allLoading
});

const mapDispatch = dispatch => ({
    allSnapshotsThunk: (id) => dispatch(allSnapshotsThunk(id))
})

export default connect(mapState, mapDispatch)(SnapShotsScreen);
