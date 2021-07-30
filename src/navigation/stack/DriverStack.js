import React from "react"
import { View, Text } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import firebase from "firebase"
import DriverHome from "../../containers/app/driver/DriverHome"
import HomeRight from "../../containers/app/driver/HomeRight"

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
                    headerLeft: () => <Text>Previous Rides</Text>,
                    headerRight: () => <HomeRight />
                }}
            />

        </Stack.Navigator>

    )
}

export default DriverStack