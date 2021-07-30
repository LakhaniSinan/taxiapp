import React, { useEffect, useState } from "react"
import { View, StyleSheet, PermissionsAndroid, Platform } from "react-native"
import { vh, vw } from "../../../constants"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const DriverHome = () => {

    const [location, setLocation] = useState(null)
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

    console.log(location, "CCCCCCCCCCCCCCCCCC");

    return (
        <View>
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
        </View>
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