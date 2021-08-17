import React from "react"
import { View, Text } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import firebase from "firebase"
import DriverHome from "../../containers/app/driver/DriverHome"
import HomeRight from "../../containers/app/driver/HomeRight"
import chatNow from "../../containers/app/chat/chatNow"
import HomeLeft from "../../containers/app/driver/HomeLeft"
import Completed from "../../containers/app/driver/completed"

const Stack = createStackNavigator()

const DriverStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DriverHome"
                component={DriverHome}
                options={{
                    // headerShown: false
                    headerTitleAlign: "center",
                    headerTitle: "Home",
                    headerLeft: () => <HomeLeft />,
                    headerRight: () => <HomeRight />
                }}
            />
            <Stack.Screen
                name="Completed"
                component={Completed}
                options={{
                    // headerShown: false
                    headerTitleAlign: "center",
                    headerTitle: "Completed Rides",
                 
                }}
            />
            <Stack.Screen
                name="ChatNow"
                component={chatNow}
                options={{
                    headerStyle: {
                        backgroundColor: "#355C7D",
                    },
                    headerTitleStyle: {
                        color: "white"
                    }

                }}
            />

        </Stack.Navigator>

    )
}

export default DriverStack