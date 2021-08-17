import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { vh, vw } from "../../../constants"
import firebase from "firebase"
import fire from "../../../database"
const MyRides = ({ }) => {

    const [rides, setRides] = useState([])

    useEffect(() => {
        let tempArr = []
        firebase.database().ref(`history`)
            .on("value", snapshot => {
                snapshot.forEach((inner) => {
                    inner.forEach(more => {
                        console.log(more.val(), "VVVVVVVVVVVVVVVVVVV");
                        if (more.val().userId == firebase.auth().currentUser.uid) {
                            tempArr.push(more.val())
                        }
                    })

                })
                setRides([...tempArr])
            })
    }, [])

    console.log(rides, "REEEEEEEEEEEEEEEEEEEEEE");

    return (
        <View style={{ flex: 1 }}>
            {rides.length > 0 ?
                rides.map((data, index) => {
                    return (
                        <View style={{ borderWidth: 1, paddingVertical: 30, margin: 10, borderRadius: 10, backgroundColor: "#046E4C" }}>
                            <Text style={{ color: "white", fontSize: 16 }}>Desination:{data.destination}</Text>
                            <Text style={{ color: "white", fontSize: 16 }}>Booking Time:{data.time}</Text>
                        </View>
                    )
                })
                :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No Record Found</Text>
                </View>
            }
        </View>
    )
}

export default MyRides