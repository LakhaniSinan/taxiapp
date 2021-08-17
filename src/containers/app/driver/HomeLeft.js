import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { vh, vw } from "../../../constants"
import firebase from "firebase"
import fire from "../../../database"
import { useNavigation } from '@react-navigation/native';
const HomeLeft = (props) => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Completed")}>
                <Text style={{ marginRight: 10 }}>Completed Rides</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeLeft