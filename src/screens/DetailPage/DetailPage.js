import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Dimensions
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Feather';

//Images
import fullStar from '../../assets/img/yellow_star.png';
import emptyStar from '../../assets/img/gray_star.png';
import lupa from '../../assets/img/magnifying.png';


class DetailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            property_name: "",
            price: '',
            location: "",
            avatar: "",
            rating: '',
            modalVisible: false,
            modalImageLoaded: false,
            smallImageLoaded: false,
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '75%',
            },
        }
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.extractProps();
    }

    loadedImags = (key) => {
        this.setState({
            key: true
        })
    }
    extractProps = () => {
        const {id, property_name, price, location, avatar, rating} = this.props.navigation.getParam('detail');
        this.setState({
            id,
            property_name,
            price,
            location,
            avatar,
            rating
        })
    }


    render() {
        const {avatar} = this.state
        let smallImage = avatar.replace('50x50', '200x200');
        let bigImage = avatar.replace('50x50', '500x500');
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.imageContainer}>
                        <ActivityIndicator size="large" color="blue"/>
                        {smallImage ?
                            <View style={{height: '100%', width: '100%', position: 'absolute'}}>
                                <Image
                                    style={{width: '100%', height: '100%', position: 'absolute',}}
                                    source={{uri: smallImage}}
                                />
                                <View style={{position: 'absolute', top: 0, left: 0}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(true);
                                        }}>
                                        <Image
                                            style={{width: 30, height: 30, margin: 5}}
                                            source={lupa}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View> : null
                        }


                    </View>
                    <View style={styles.textContainer}>
                        <View style={{paddingVertical: 10}}>
                            <Text>Loacation:</Text>
                            <Text style={{fontSize: 18}}>{this.state.location}</Text>
                        </View>
                        <View>
                            <Text>Price:</Text>
                            <Text style={{fontSize: 18}}>{this.state.price} USD </Text>
                        </View>

                    </View>
                </View>
                <View style={styles.starsContainer}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={Number(this.state.rating)}
                        fullStar={fullStar}
                        emptyStar={emptyStar}
                        emptyStarColor={'grey'}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <ActivityIndicator size="large" color="blue"/>
                            {bigImage ?
                                <View style={{height: '100%', width: '100%', position: 'absolute'}}>
                                    <Image
                                        style={{width: '100%', height: '100%', position: 'absolute'}}
                                        source={{uri: bigImage}}
                                    />
                                    <View style={{position: 'absolute', top: 0, left: 0}}>
                                        <TouchableHighlight
                                            style={{height: 45, width: 45}}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Icon name="x" size={30} color="black"/>
                                        </TouchableHighlight>
                                    </View>
                                </View> : null
                            }
                        </View>
                    </View>

                </Modal>

            </View>
        );
    }
}

const SW = Dimensions.get('window').width
const Sh = Dimensions.get('window').height


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    starsContainer: {
        width: '80%',
        alignSelf: 'center',
        flex: 1,
    },
    imageContainer: {
        width: '40%',
        height: '50%',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        borderRadius: 10,
    },
    textContainer: {
        width: '60%',
        height: '50%',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    //Modal
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        marginTop: 22,
        height: SW * 0.9,
        width: SW * 0.9,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10
    }
})

export default DetailPage;