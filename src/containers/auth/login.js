import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from "react-native"
import { vh } from "../../constants"
import firebase from "firebase"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import Animated from "react-native-reanimated"
const SignIn = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '388958605091-21pkkfmappjrqcbp6rir3os2oavnd7fj.apps.googleusercontent.com',
        });
    }, [])

    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '738989965571-k9tal3cqhs50te3726chm92is23a5759.apps.googleusercontent.com',
    //     });
    // }, [])
    // let opacity = new Animated.Value(0);

    // const animate = easing => {
    //     opacity.setValue(0);
    //     Animated.timing(opacity, {
    //         toValue: 1,
    //         duration: 1200,
    //         easing
    //     }).start();
    // };

    // const size = opacity.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 80]
    // });

    // const animatedStyles = [
    //     styles.box,
    //     {
    //         opacity,
    //         width: size,
    //         height: size
    //     }
    // ];

    const loginWithFacebook = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        console.log(result, "RESSSSSSSSSSSSSSSS");
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        // alert(JSON.stringify(data.accessToken))
        // getInfo(data.accessToken)
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        // console.log(credential, "CRRRRRRRRRRRRRRRRRRRRR");
        if (credential) {
            return firebase.auth().signInWithCredential(credential)
        }
        // alert("fb login successfull")
        console.log(data, "DAAAAAAAAAAAAAAAAAAa");
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
    }

    // const getInfo = (token) => {
    //     const PROFILE_REQUEST_PARAMS = {
    //         fields: {
    //             string: 'id,name,first_name,last_name',
    //         },
    //     };
    //     const profileRequest = new GraphRequest(
    //         '/me',
    //         { token, parameters: PROFILE_REQUEST_PARAMS },
    //         (error, user) => {
    //             if (error) {
    //                 // console.log('login info has error: ' + error);
    //             } else {
    //                 // this.setState({ userInfo: user });
    //                 console.log('resulttttttttttttttt:', user);
    //             }
    //         },
    //     );
    //     new GraphRequestManager().addRequest(profileRequest).start();
    // }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // this.setState({ userInfo });
            console.log(userInfo, "INFOOOOOOOOOOOOOOOO");
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken)
            if (credential) {
                console.log(credential,"credentialcredentialcredential");
                // firebase.database().ref(`users`)
                // return firebase.auth().signInWithCredential(credential)
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                console.log(error, "OHTEEEEEEEEEEEEEEE");
                alert(JSON.stringify(error))
                // some other error happened
            }
        }
    }

    const loginUser = () => {
        if (!email || !password) {
            ToastAndroid.showWithGravity("Please Enter Completete information", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        // alert(email)
        // setLoading(true)
        firebase.auth().signInWithEmailAndPassword(email, password)

            .then(res => {
                // setLoading(false)
                console.log(res, "RESSSSSSSSSSSSSSS");

            })
            .catch(err => {
                // setLoading(false)
                console.log(err.message, "ERRRRRRRRRRRRRRRRRRRR");
                alert(err.message)
            })
    }


    // const signInWithGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         // this.setState({ userInfo });
    //         console.log(userInfo, "INFOOOOOOOOOOOOOOOO");
    //         const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken)
    //         if (credential) {
    //             return firebase.auth().signInWithCredential(credential)
    //         }
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             console.log(error, "OHTEEEEEEEEEEEEEEE");
    //             alert(JSON.stringify(error))
    //             // some other error happened
    //         }
    //     }
    // }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#046E4C" }}>
                <View style={{ marginTop: vh * 0.05, alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 30 }}>Welcome To Taxi App!</Text>
                </View>
                <View style={{ marginTop: 30, backgroundColor: "white", flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <View style={{ marginTop: 20, marginLeft: 20 }}>
                        <TextInput
                            value={email}
                            placeholder="Email"
                            placeholderTextColor="#046E4C"
                            onChangeText={(text) => setEmail(text)}
                            style={{ color: "black", borderBottomColor: "black", borderBottomWidth: 1, fontWeight: "bold", fontSize: 16 }}
                        />
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 20 }}>
                        <TextInput
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="#046E4C"
                            onChangeText={(text) => setPassword(text)}
                            style={{
                                borderBottomColor: "black",
                                borderBottomWidth: 1,
                                fontWeight: "bold", fontSize: 16,
                                color: "black"
                            }}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={{
                        marginTop: 30,
                        marginHorizontal: 30,
                        alignItems: "center",
                        backgroundColor: "#046E4C",
                        paddingVertical: 10,
                        borderRadius: 10
                    }}
                        onPress={loginUser}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Log In</Text>
                    </TouchableOpacity>

                    <View>
                        <View>
                            <TouchableOpacity style={{
                                marginTop: 30,
                                alignItems: "center",
                                backgroundColor: "white",
                                paddingVertical: 10,
                                borderRadius: 10,
                                marginHorizontal: 30,
                                borderColor: "#046E4C",
                                borderWidth: 2
                            }}
                                onPress={() => navigation.navigate("Register")}
                            >
                                <Text style={{ fontSize: 20, color: "#046E4C" }}>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={{
                        marginTop: 30,
                        alignItems: "center",
                        backgroundColor: "#E74C3C",
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginHorizontal: 30,
                    }}
                        onPress={signInWithGoogle}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Login With Google</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center", flex: 1 }}>
                        <Text style={{ color: "white" }}>Dont have a Account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={{ color: "white", fontSize: 16 }}>   Register</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

            </View>

        </>
    )
}

var styles = StyleSheet.create({
    textStyle: {

    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default SignIn