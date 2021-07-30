import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Header from "../../components/header"
import { vh, vw } from "../../constants"
const Choose = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Header name="Welcome To Taxi Application" />
            <Text style={{ marginTop: 30, textAlign: "center", fontSize: 14, fontWeight: "bold" }}>Please Select One Option</Text>
            <View style={{ marginTop: 0.1 * vh, justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity>
                    <View style={{ height: 80, backgroundColor: "pink", width: 0.3 * vw, paddingHorizontal: 30, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center" }}>Driver</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{ height: 80, backgroundColor: "pink", width: 0.3 * vw, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center" }}>User</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 0.1 * vh, }}>
                <Text style={{ textAlign: "center" }}>New To Application?</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("Register") }>
                <View style={{ marginTop: 0.02 * vh, }}>
                    <Text style={{ textAlign: "center" }}>Create Account</Text>
                </View>
            </TouchableOpacity>

        </View >
    )
}

export default Choose