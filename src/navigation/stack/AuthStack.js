import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Register from '../../containers/auth/signIn'
import LogIn from '../../containers/auth/login'
import Choose from '../../containers/auth/choose'
import firebase from "firebase"

const Stack = createStackNavigator()

function AuthStack() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Choose"
                    component={Choose}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen
                    name="LogIn"
                    component={LogIn}
                    options={{
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false

                    }} />
            </Stack.Navigator>

    )
}

export default AuthStack