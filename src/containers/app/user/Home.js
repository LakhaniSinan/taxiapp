import React, { useEffect, useState } from "react"
import { View, StyleSheet, PermissionsAndroid, Platform, Image, Alert, Text, TextInput, TouchableOpacity, Linking, ToastAndroid } from "react-native"
import { vh, vw } from "../../../constants"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from "firebase"
const UserHome = ({ navigation }) => {

    const [location, setLocation] = useState(null)
    const [userId, setuserIds] = useState([])
    const [driverData, setDriverData] = useState([])
    const [currentDriver, setCurrentDriver] = useState("")
    const [bookStatus, setBookStatus] = useState(null)
    const [currentUser, setCurrentUser] = useState("")
    const [where, setWhere] = useState("")

    useEffect(() => {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`)
            .on("value", snapshot => {
                setCurrentUser(snapshot.val())
            })
    }, [])

    // async function getLocationPermissions() {
    //     const granted = await PermissionsAndroid.request(
    //         {
    //             title: "Taxi  App Location Permission",
    //             message:
    //                 "Taxi  App needs access to your Location " +
    //                 "so you can take awesome pictures.",
    //             buttonNegative: "Cancel",
    //             buttonPositive: "OK"
    //         }
    //     );

    //     return granted === RESULTS.GRANTED;
    // }

    useEffect(() => {
        let driverArr = []
        let keyArr = []
        firebase.database().ref(`locations`).on("value", snapshot => {
            snapshot.forEach(values => {
                keyArr.push(values.key)
                driverArr.push(values.val())
            })
            setuserIds(keyArr)
            setDriverData(driverArr)
        })

    }, [])

    useEffect(() => {
        Geolocation.getCurrentPosition(position => setLocation(position.coords))
    }, [])

    // const requestpermission = async () => {
    //     const granted = await getLocationPermissions();
    //     console.log(granted, "GREANTTTTAODMASOMDAS");
    //     if (granted) {
    //         // alert("called")
    //         permission()
    //     }
    //     else {

    //     }
    // }

    // const permission = () => {
    //     if (Platform.OS === "ios") {
    //         Geolocation.requestAuthorization("always")
    //     }
    //     setHomeloader(true)
    //     // navigator.geolocation.getCurrentPosition(position=>{
    //     //     const location = JSON.stringify(position);
    //     //     console.log(location,"locationlocation");
    //     // })
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log(position, "POOOOOOOOOOOOOOOOOOO");
    //             // setStatus(true)
    //         },
    //         (error) => {
    //             // console.log(error, "ERRRRR");
    //             alert(error.message)
    //             // See error code charts below.
    //             // setStatus(false)
    //         },
    //         Platform.OS == "ios" ?
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //             :
    //             { enableHighAccuracy: true, timeout: 10000, }
    //     );
    // }

    // console.log(driverData, userId, "CCCCCCCCCCCCCCCCCC");



    const handlePress = (e, index) => {
        // firebase.database()
        Alert.alert(
            "Are you sure you want to book ride?",
            "",
            [

                {
                    text: "Not Right Now",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes I am Sure", onPress: () => BookRide(index) }
            ]
        );
    }

    const [bookRide, SetBookRide] = useState(false)

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    const BookRide = (value) => {
        let result = makeid()
        // console.log(res, "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        SetBookRide(true)
        firebase.database().ref(`users/${value}`).once("value", snapshot => {
            setCurrentDriver(snapshot.val())
        })
            .then(res => {
                firebase.database().ref(`driverRides/${value}`).push({
                    driverId: value,
                    userId: firebase.auth().currentUser.uid,
                    time: new Date().toLocaleString(),
                    destination: where,
                    userDetails: currentUser
                })
            })
            .then(res => {
                firebase.database().ref(`userRides/${firebase.auth().currentUser.uid}`).push({
                    driverId: value,
                    userId: firebase.auth().currentUser.uid,
                    time: new Date().toLocaleString(),
                    isAssgined: false,
                    completed: false,
                    destination: where,
                    userDetails: currentUser,
                    Rideid: result
                })
                setBookStatus(false)
            })
        setTimeout(() => {

        }, 15000);
    }

    const [bookingDetails, setBookingDetails] = useState(null)
    const [rideData, setRideData] = useState(null)
    const [assignStatus, setAssignStatus] = useState(false)

    const [datalength, setDataLength] = useState([])

    useEffect(() => {
        let temp = []
        firebase.database().ref(`userRides/${firebase.auth().currentUser.uid}`)
            .on("value", snapshot => {
                snapshot.forEach(value => {
                    console.log(value.val(), "INDDDDDDDDDDDDDDDDDDDDDDDDDD");
                    if (value.val().isAssgined == false && value.val().completed == false) {
                        // alert("if")
                        setBookStatus(true)
                        setAssignStatus(false)
                        setRideData(value.val())
                        setBookingDetails(null)
                    }
                    else if (value.val().isAssgined == true && value.val().completed == true) {
                        setRideData(null)
                        SetBookRide(false)
                        return ToastAndroid.showWithGravity("Ride Ended Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    }
                    else if (value.val().isAssgined == "Rejected" && value.val().completed == false) {
                        SetBookRide(false)
                        setBookingDetails(value.val())
                        return ToastAndroid.showWithGravity("Ride Rejected By Driver", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    }
                    else {
                        // alert("els")
                        setAssignStatus(true)
                        setRideData(value.val())
                        firebase.database().ref(`users/${value.val().driverId}`).once("value", snapshot => {
                            setBookingDetails(snapshot.val())
                        })
                        setBookStatus(true)
                    }
                    temp.push(temp.length + 1)
                })
            })
        setDataLength(temp)
    }, [])

    console.log(rideData, bookingDetails, assignStatus, "THINGSSSSSSSSSSSSS");

    const startChating = (data, booking) => {
        console.log(data.userDetails.name, data.driverId, firebase.auth().currentUser.uid, "IMPPPPPPPPPPPPPPPPPPP")
        navigation.navigate("ChatNow", { name: booking.name, guestId: data.driverId, ActiveUserId: firebase.auth().currentUser.uid })
    }

    return (
        <View>
            {rideData ?
                <>
                    {bookingDetails == null && assignStatus == false ?
                        <View style={{
                            justifyContent: "center", alignItems: "center",
                            backgroundColor: "#046E4C", position: "absolute", height: 100, width: vw, zIndex: 1000
                        }}
                        >
                            <Text style={{ fontWeight: "bold", fontStyle: "italic", color: "white" }}>Finding a ride for you please wait</Text>
                        </View>
                        :
                        rideData?.completed == false && rideData?.isAssgined == true ?
                            < View style={{ height: vh * 0.3, backgroundColor: "#046E4C" }}>
                                <Text style={{ textAlign: "center", fontSize: 16, color: "white", marginTop: 1 }}>Your Ride is been Accepted</Text>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 10 }}>Destination:<Text>{rideData?.destination}</Text></Text>
                                    <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 5 }}>Driver Name:<Text>{bookingDetails?.name}</Text></Text>
                                    <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 5 }}>Driver Contact Number:<Text>{bookingDetails?.phone}</Text></Text>
                                    <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 5 }}>Driver Car Number:<Text>{bookingDetails?.numberPlate}</Text></Text>
                                    <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 5 }}>Driver Car Name:<Text>{bookingDetails?.carName}</Text></Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(`tel:${bookingDetails.phone}`)}
                                            style={{ width: "48%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 20, marginHorizontal: 20 }}>
                                            <Text style={{ fontWeight: "bold", color: "#046E4C" }}>Call Driver</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            // onPress={() => Linking.openURL(`tel:${rideData.userDetails.phone}`)}
                                            onPress={() => startChating(rideData, bookingDetails)}
                                            style={{ width: "48%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 20, marginHorizontal: 20 }}>
                                            <Text style={{ fontWeight: "bold", color: "#046E4C" }}>Chat With Driver</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                            : null
                    }
                </>
                : null
            }
            {
                bookRide == false ?
                    <View style={{ height: 100, width: vw, justifyContent: "center", alignItems: 'center' }}>
                        <TextInput value={where}
                            onChangeText={(text) => setWhere(text)}
                            placeholder="where you want to go?"
                            placeholderTextColor="black"
                            style={{ color: "black" }}
                        />
                    </View>
                    : null
            }
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    // latitude: this.state.latitude,
                    // longitude: this.state.longitude,
                    // latitudeDelta: 0.0043,
                    // longitudeDelta: 0.0034
                    latitude: 24.8804,
                    longitude: 67.0391,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            // onPress={(e) => this.handlePress(e.nativeEvent)}

            >
                {driverData.map((res, index) => {
                    // console.log(res.location.coords, "RRRRRRRRRRRRRRRRRRRRRR");
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: res.location?.coords?.latitude,
                                longitude: res.location?.coords?.longitude
                            }}
                            onPress={(e) => handlePress(e.nativeEvent, userId[index])}
                        >
                            <Image
                                source={require("../../../assets/car.jpg")}
                                style={{ height: 40, width: 30 }}
                            />
                        </Marker>
                    )
                })
                }

            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    map: {
        // top: vw* 0.4,
        // left: 0,
        // right: 0,
        // bottom: 0,
        width: vw,
        height: vh
        // zIndex: 1,
    },
});
export default UserHome