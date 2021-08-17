import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { vh, vw } from "../../../constants"
import firebase from "firebase"
import fire from "../../../database"
const Completed = ({ }) => {

    const [rides, setRides] = useState([])

    useEffect(() => {
        firebase.database().ref(`history/${firebase.auth().currentUser.uid}`)
            .on("value", snapshot => {
                setRides(snapshot.val())
            })
    }, [])

    let data = Object.keys(rides)

    console.log(rides, "REEEEE");

    return (
        <View style={{ flex: 1 }}>
            {data.length > 0 ?
                data.map((datax, index) => {
                    console.log(rides[datax],"DDDDDDDDDDDD");
                    return (
                        <View style={{ borderWidth: 1, paddingVertical: 30, margin: 10, borderRadius: 10, backgroundColor: "#046E4C" }}>
                            <Text style={{ color: "white", fontSize: 16 }}>Desination:{rides[datax].destination}</Text>
                            <Text style={{ color: "white", fontSize: 16 }}>Booking Time:{rides[datax].time}</Text>
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

export default Completed