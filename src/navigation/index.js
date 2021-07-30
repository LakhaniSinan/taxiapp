
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from "firebase"
import AuthStack from "./stack/AuthStack"
import DriverStack from "./stack/DriverStack"
import Loader from "../components/Loader"
import fire from "../database"

const Router = () => {

    const [component, setComponent] = useState(<Loader />)

    useEffect(() => {
        setTimeout(() => {
            let unsub = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    firebase.database().ref(`users/${user.uid}`).on("value", snapshot => {
                        // alert(JSON.stringify(snapshot.val()))
                        if (snapshot.val().type == "User") {
                        }
                        else {
                            setComponent(<DriverStack />)
                        }
                    })
                }
                else {
                    setComponent(<AuthStack />)
                }
            })
            return unsub
        }, 3000)

    }, [])

    return (
        <NavigationContainer>
            {component}
        </NavigationContainer>
    )
}

export default Router