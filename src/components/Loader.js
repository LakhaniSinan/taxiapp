import { ActivityIndicator,View } from "react-native"
import React from "react"

const Loader = () => {
    return (
        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
        <ActivityIndicator size="large" color="green"  />
        </View>
    )
}

export default Loader