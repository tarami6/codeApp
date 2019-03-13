import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';


//readux
import {connect} from "react-redux";
import {changeLanguage, editUser} from '../../store/actions/action';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            getDataNum: 20,
            currentIndexNum: 0,
            lowData: [],
            language: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: "Properties",
            headerTitleStyle: {textAlign: 'center', flex: 1},
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
                    <View style={{paddingRight: 5, paddingLeft: 10}}>
                        <Icon name="log-out" size={30} color="grey"/>
                    </View>
                </TouchableOpacity>

            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <View style={{paddingRight: 5, paddingLeft: 10,}}>
                        <Icon name="info-with-circle" size={30} color="grey"/>
                    </View>
                </TouchableOpacity>
            ),
        }
    }

    extractDataFromStore() {
        this.setState({
            language: this.props.language
        })
    }

    componentDidMount() {
        this.getDataFromApi()
    }

    performanceData = () => {
        if (this.state.data.length > 0 && this.state.currentIndexNum < 150) {
            let initIndex = this.state.currentIndexNum;
            let oldArr = this.state.data;
            let lowArr = [];
            let limit = initIndex + this.state.getDataNum
            for (let i = initIndex; i < limit; i++) {
                lowArr.push(oldArr[i])
            }
            this.setState(prevState => {
                return {
                    ...prevState,
                    currentIndexNum: this.state.currentIndexNum + prevState.getDataNum,
                    getDataNum: 10,
                    lowData: [...prevState.lowData, ...lowArr]
                }
            })
        }
    }

    moveToDetail = (item) => {
        this.props.navigation.navigate('DetailPage', {
            detail: item,
            title: item.property_name
        })
    }

    getDataFromApi = async () => {
        const data = await axios.get('https://s3.amazonaws.com/devops-infra/public/MOCK_DATA.json')
            .then((response) => {
                let res = response.data

                this.setState({data: [...res]}, () => {
                    this.performanceData()
                })
            })
            .catch((error) => {
            });
    }

    render() {
        const listItem = (item) => (
            <View style={{width: '100%', alignItems:'center', justifyContent: 'center'}}>
                <View style={styles.listItemContainer}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: 'grey',
                        width: 70,
                        height: 70,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5
                    }}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: item.avatar}}/>
                    </View>
                    <View style={{ flex: 6}}>
                        <Text style={{fontSize: 18}}>{item.property_name}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.moveToDetail(item)}>
                            <IconMaterial name="dots-horizontal-circle-outline" size={40} color="grey"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )

        if (this.state.data.length === 0) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="blue"/>
                </View>
            )
        }

        return (
            <View >
                <FlatList
                    initialNumToRender={20}
                    data={this.state.lowData}
                    onEndReachedThreshold={10}
                    onEndReached={({distanceFromEnd}) => {
                        this.performanceData()
                    }}
                    renderItem={({item}) => (
                        listItem(item)
                    )}
                    keyExtractor={item => item.id.toString()}
                />

            </View>
        );
    }
}

const SW = Dimensions.get('window').width
const SH = Dimensions.get('window').height


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    listItemContainer: {
        alignSelf: 'center',
        width: '95%',
        height: SH * 0.15,
        borderWidth: 0.5,
        borderColor: '#eff0f2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff'
    }
})

const mapStateToProps = state => {
    return {
        language: state.mainStore.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeStoreLanguage: (language) => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
