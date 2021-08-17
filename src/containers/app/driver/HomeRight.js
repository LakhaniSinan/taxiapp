import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { vh, vw } from "../../../constants"
import firebase from "firebase"
import fire from "../../../database"
import Geolocation from 'react-native-geolocation-service';
const HomeRight = () => {

    const [location, setLocation] = useState(null)
    const [status, setStatus] = useState("")

    const userOnline = (val) => {
        let params = {
            uid: firebase.auth().currentUser.uid,
            isActive: val == undefined ? true : val == true ? false : true
        }
        Geolocation.getCurrentPosition(position => {
            setLocation(position.coords)
            firebase.database().ref(`locations/${firebase.auth().currentUser.uid}`).update({
                ...params,
                location: position,
            }).then(res => {
                if (val == undefined) {
                    alert(`You Are Now Online`)
                }
                else if (val == true) {
                    alert(`You Are Now Offline`)
                }
                else {
                    alert(`You Are Now Online`)
                }

            })
        })
    }

    useEffect(() => {
        firebase.database().ref(`locations/${firebase.auth().currentUser.uid}`).on("value", snapshot => {
            setStatus(snapshot?.val()?.isActive)
        })
    }, [])

    console.log(status, "SSSSS");

    return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Text style={{ marginRight: 10 }}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => userOnline(status)}>
                <Text style={{ marginRight: 5 }}>
                    {status == undefined ? "Go Online" : status == true ? "Go Offline" : "Go Online"}
                </Text>

            </TouchableOpacity>
        </View>
    )
}

export default HomeRight