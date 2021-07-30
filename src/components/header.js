import React from "react"
import { View, Text } from "react-native"

const Header = ({ name }) => {
    return (
        <View style={{height:80,justifyContent:"center",alignItems:"center",backgroundColor:"#7c7c7c"}}>
            <Text style={{fontSize:16,fontWeight:"bold"}}>{name}</Text>
        </View>
    )
}

export default Header