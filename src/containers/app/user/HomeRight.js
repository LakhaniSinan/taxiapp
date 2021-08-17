import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { vh, vw } from "../../../constants"
import firebase from "firebase"
import fire from "../../../database"
const HomeRight = () => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Text style={{ marginRight: 10 }}>Log Out</Text>
            </TouchableOpacity>
          
        </View>
    )
}

export default HomeRight