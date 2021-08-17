import React from "react"
import { View, Text } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import firebase from "firebase"
import UserHome from "../../containers/app/user/Home"
import HomeRight from "../../containers/app/user/HomeRight"
import HomeLeft from "../../containers/app/user/HomeLeft"
import MyRides from "../../containers/app/user/myRides"
import chatNow from "../../containers/app/chat/chatNow"
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator()

const UserStack = () => {
   
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserHome"
                component={UserHome}
                options={{
                    // headerShown: false
                    headerTitleAlign: "center",
                    headerTitle: "Home",
                    headerLeft: props => <HomeLeft {...props} />,
                    headerRight: () => <HomeRight />
                }}
            />
            <Stack.Screen
                name="MyRides"
                component={MyRides}
                options={{
                    // headerShown: false
                    headerTitleAlign: "center",
                    headerTitle: "My Rides",

                }}
            />
            <Stack.Screen
                name="ChatNow"
                component={chatNow}
                // options={{ headerShown: false }}
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

export default UserStack