import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid, ScrollView } from "react-native"
import { vh, vw } from "../../constants"
import firebase from "firebase"
// import Animated from "react-native-reanimated"
import Entypo from "react-native-vector-icons/Entypo"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import fire from "../../../database"

var options = {
    title: 'Select Image',
    customButtons: [
        {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
        },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const SignIn = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [numberPlate, setNumberPlate] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [filePath, setFilePath] = useState(null);

    const signInUser = () => {
        if (selected == "Driver") {
            if (!name || !phone || !email || !password || !numberPlate) {
                ToastAndroid.showWithGravity("Please fill complete information", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                return;
            }
            if (password.length < 6) {
                ToastAndroid.showWithGravity("Password length must be greater than 6", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                return;
            }
            let params = {
                name,
                email,
                numberPlate,
                phone,
                type: "Driver"
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    setLoading(false)
                    let uid = firebase.auth().currentUser.uid
                    firebase.database().ref(`users/${uid}`).set({
                        ...params
                    })
                        .then(res => {
                            console.log(res, "RESSSSSSSSSSSSSSSSSSSSSSSSss");
                            setLoading(false)
                        })
                })
                .catch(err => {
                    ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
                    setLoading(false)
                })
                .catch(err => {
                    ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
                    setLoading(false)
                })
        }
        else if (selected == "User") {
            if (!name || !phone || !email || !password) {
                ToastAndroid.showWithGravity("Please fill complete information", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                return;
            }
            if (password.length < 6) {
                ToastAndroid.showWithGravity("Password length must be greater than 6", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                return;
            }
            let params = {
                name,
                email,
                phone,
                type: "User"
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    setLoading(false)
                    let uid = firebase.auth().currentUser.uid
                    firebase.database().ref(`users/${uid}`).set({
                        ...params
                    })
                        .then(res => {
                            console.log(res, "RESSSSSSSSSSSSSSSSSSSSSSSSss");
                            setLoading(false)
                        })
                })
                .catch(err => {
                    ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
                    setLoading(false)
                })
                .catch(err => {
                    ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
                    setLoading(false)
                })
        }
        else {
            ToastAndroid.showWithGravity("Please Select Type", ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }
    }
    // if (!name || !phone || !email || !password) {
    //     ToastAndroid.showWithGravity("Please fill complete information", ToastAndroid.LONG, ToastAndroid.BOTTOM)
    //     return;
    // }
    // if (password.length < 6) {
    //     ToastAndroid.showWithGravity("Password length must be greater than 6", ToastAndroid.LONG, ToastAndroid.BOTTOM)
    //     return;
    // }
    // setLoading(true)
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then(res => {
    //         setLoading(false)
    //         let uid = firebase.auth().currentUser.uid
    //         firebase.database().ref(`users/${uid}`).set({
    //             uid,
    //             name,
    //             cnic,
    //             email
    //         })
    //             .then(res => {
    //                 console.log(res, "RESSSSSSSSSSSSSSSSSSSSSSSSss");
    //                 setLoading(false)
    //             })
    //     })
    //     .catch(err => {
    //         ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    //         setLoading(false)
    //     })
    //     .catch(err => {
    //         ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    //         setLoading(false)
    //     })


    const [selected, SetSelected] = useState("")

    const renderDriver = () => {
        return (
            <>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={name}
                        placeholder="Driver Name"
                        onChangeText={(text) => setName(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={numberPlate}
                        placeholder="Car Number Plate"
                        onChangeText={(text) => setNumberPlate(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={phone}
                        placeholder="Phone Number"
                        onChangeText={(text) => setPhone(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={email}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={password}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
            </>
        )
    }

    const renderUser = () => {
        return (
            <>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={name}
                        placeholder="UserName"
                        onChangeText={(text) => setName(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={phone}
                        placeholder="Phone Number"
                        onChangeText={(text) => setPhone(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={email}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={password}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                    />
                </View>
            </>
        )
    }

    const handleUploadCoverImage = async (e) => {
        // console.log(e, "EEEEEEEEE");
        const data = new FormData()
        data.append('file', e)
        data.append("upload_preset", "gu8ylv22")
        data.append("cloud_name", "dhtjlhqw1")

        // this.setState({ loading: true })
        // setLoading(true)
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dhtjlhqw1/image/upload", {
                method: 'POST',
                body: data
            })
            const file = await res.json()
            // console.log(file, "FIEEEEE");
            if (file.error) {
                alert(file.error)
                // this.setState({ loading: false })
                // setLoading(false)
            }
            else {
                // this.setState({ avatarSource: file.secure_url, loading: false })
                setLoading(false)
                setFilePath(file.secure_url)
                console.log(file, "FILEeeeeeeeeeee")
            }
        } catch (error) {
            console.log(error, "ERRRRRRRRRRRRRRRRRRRRRR");
        }

    }

    const ImageSelection = () => {
        launchCamera(options, response => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;

                const source = {
                    uri,
                    type,
                    name: name == null ? "test" : name
                }

                handleUploadCoverImage(source)
                // console.log(response, "REEEEEEEEEEEEEE");
            }
        });
    }

    return (
        <>
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: "blue" }}>
                    <View style={{ marginTop: vh * 0.1, alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 30 }}>Welcome To Taxi Application</Text>
                    </View>

                    <View style={{ marginTop: 0.1 * vh, justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => SetSelected("Driver")}>
                            <View style={{ height: 80, backgroundColor: "pink", width: 0.3 * vw, paddingHorizontal: 30, justifyContent: "center" }}>
                                <Text style={{ textAlign: "center" }}>Driver</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => SetSelected("User")}>
                            <View style={{ height: 80, backgroundColor: "pink", width: 0.3 * vw, justifyContent: "center" }}>
                                <Text style={{ textAlign: "center" }}>User</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 20, borderRadius: 200 }}>
                        <View>
                            <Image
                                source={require("../../assets/download.jpg")}
                                style={{ borderRadius: 200, height: 100, width: 100 }}
                            />
                        </View>
                        <View style={{ position: "absolute", bottom: 0 }}>
                            <TouchableOpacity onPress={ImageSelection}>
                                <Entypo name="camera" size={24} color="white" style={{ marginLeft: vw * 0.1 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {selected == "Driver" ? renderDriver() : selected == "User" ? renderUser() : <Text>Please Select Option</Text>}
                    {/* <View style={{ alignItems: "center", marginTop: 20, borderRadius: 200 }}>
                        <View>
                            <Image
                                source={require("../../../assets/profile.jpg")}
                                style={{ borderRadius: 200, height: 100, width: 100 }}
                            />
                        </View>
                        <View style={{ position: "absolute", bottom: 0 }}>
                            <TouchableOpacity onPress={() => alert("image selection")}>
                                <Entypo name="camera" size={24} color="white" style={{ marginLeft: vw * 0.2 }} />
                            </TouchableOpacity>
                        </View>
                    </View> */}


                    <TouchableOpacity style={{
                        marginTop: 30,
                        alignItems: "center",
                        backgroundColor: "#7B68EE",
                        paddingVertical: 10,
                        borderRadius: 10
                    }}
                        onPress={signInUser}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Create Account</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

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