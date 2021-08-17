import React, { useEffect, useState } from "react"
import { View, StyleSheet, PermissionsAndroid, Platform, Text, Touchable, TouchableOpacity, Linking } from "react-native"
import { vh, vw } from "../../../constants"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from "firebase"
const DriverHome = ({ navigation }) => {

    const [location, setLocation] = useState(null)
    const [rideData, setRideData] = useState(null)
    const [userId, setUserId] = useState("")
    const [userInnerId, setuserInner] = useState("")
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
        Geolocation.getCurrentPosition(position => setLocation(position.coords))
    }, [])

    const [isAssigned, setIsAssigned] = useState([])



    useEffect(() => {
        let tempArr = []
        firebase.database().ref(`userRides`).on("value", snapshot => {
            snapshot.forEach(value => {
                value.forEach(inner => {
                    console.log(inner.key, "VVVVVVVVVVVVVVVVVVVVVVV");
                    if (inner.val().driverId == firebase.auth().currentUser.uid && inner.val().isAssgined == false) {
                        // alert("if")
                        setUserId(value.key)
                        setuserInner(inner.key)
                        setRideData(inner.val())
                        tempArr.push(false)
                    }
                    else if (inner.val().driverId == firebase.auth().currentUser.uid && inner.val().isAssgined == true) {
                        // alert("if")
                        setUserId(value.key)
                        setuserInner(inner.key)
                        setRideData(inner.val())
                        tempArr.push(true)
                    }

                    else if (inner.val().driverId == firebase.auth().currentUser.uid && inner.val().isAssgined == "Rejected") {
                        // alert("if")
                        setUserId(value.key)
                        setuserInner(inner.key)
                        setRideData(null)
                    }
                    else {
                        setRideData(inner.val())
                    }
                })
            })
            setIsAssigned(tempArr)
        })
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

    // console.log(rideData, "CCCCCCCCCCCCCCCCCC");

    const acceptRide = () => {
        firebase.database().ref(`userRides/${userId}/${userInnerId}`).update({
            isAssgined: true
        }).then(res => {
            firebase.database().ref(`locations/${firebase.auth().currentUser.uid}`).update({
                isActive: false
            })
            alert("you have accepted the ride")
        })
    }

    const rejectRide = () => {
        firebase.database().ref(`userRides/${userId}/${userInnerId}`).update({
            isAssgined: "Rejected"
        }).then(res => {
            firebase.database().ref(`userRides`).remove()
                .then(res => {
                    alert("you Rejected the ride")
                })
        })
    }

    const endRide = () => {
        // console.log(userInnerId, "INN");
        firebase.database().ref(`userRides/${userId}/${userInnerId}`).update({
            completed: true
        })
            .then(res => {
                firebase.database().ref(`history/${firebase.auth().currentUser.uid}`).push({
                    ...rideData
                })
            })
            .then(res => {
                firebase.database().ref(`locations/${firebase.auth().currentUser.uid}`).update({
                    isActive: true
                })
                alert("you have Completed the ride")
            })
            .then(res => {
                firebase.database().ref(`userRides`).remove()
            })
    }

    const startChating = (data) => {
        console.log(data.userDetails.name, data.userId, firebase.auth().currentUser.uid, "IMPPPPPPPPPPPPPPPPPPP")
        navigation.navigate("ChatNow", { rideId: data.Rideid, name: data.userDetails.name, guestId: data.userId, ActiveUserId: firebase.auth().currentUser.uid })
    }

    console.log(isAssigned, "DIRRRRRRRRRRRRRRRRRRs");

    let res = isAssigned.includes(false)
    console.log(res, "rrrrrrrrrrrr")
    return (
        <View>
            {rideData && !rideData?.isAssgined ?
                <View style={{ height: vh * 0.2, backgroundColor: "#046E4C" }}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white", marginTop: 1 }}>Hello You Have a new Ride Request</Text>
                    <View>
                        <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 10 }}>Destination:<Text>{rideData?.destination}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", flex: 1 }}>
                        <TouchableOpacity onPress={acceptRide}
                            style={{ backgroundColor: "white", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5 }}
                        >
                            <Text style={{ fontWeight: "bold", color: "046E4C" }}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={rejectRide}
                            style={{ backgroundColor: "white", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5 }}>
                            <Text style={{ fontWeight: "bold", color: "046E4C" }}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                rideData && !rideData?.completed ?
                    < View style={{ height: vh * 0.3, backgroundColor: "#046E4C" }}>
                        <Text style={{ textAlign: "center", fontSize: 16, color: "white", marginTop: 1 }}>Ride Accepted</Text>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 10 }}>Destination:<Text>{rideData?.destination}</Text></Text>
                            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 5 }}>Customer Name:<Text>{rideData?.userDetails.name}</Text></Text>
                            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 16, marginLeft: 10, marginTop: 5 }}>Customer Contact Number:<Text>{rideData?.userDetails?.phone}</Text></Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(`tel:${rideData.userDetails.phone}`)}
                                    style={{ width: "48%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 20, marginHorizontal: 20 }}>
                                    <Text style={{ fontWeight: "bold", color: "#046E4C" }}>Call Customer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => startChating(rideData)}
                                    style={{ width: "48%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 20, marginHorizontal: 20 }}>
                                    <Text style={{ fontWeight: "bold", color: "#046E4C" }}>Chat With Customer</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={endRide}
                                    style={{ width: "48%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 20, marginHorizontal: 20 }}>
                                    <Text style={{ fontWeight: "bold", color: "#046E4C" }}>End Ride</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                {location ?
                    <Marker
                        coordinate={{
                            latitude: location?.latitude,
                            longitude: location?.longitude
                        }}
                    // onPress={(e) => this.handlePress(e.nativeEvent)}
                    >
                        {/* <Image
                            source={require("../images/drawable-ldpi/husylpointer.png")}
                            style={{ height: 40, width: 30 }}
                        /> */}
                    </Marker>
                    : null}
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
export default DriverHome