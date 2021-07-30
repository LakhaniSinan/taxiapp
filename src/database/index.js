

import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyD1b_HZhZ0WKvFP7xUziR-KYl4TvPOZFhA",
    authDomain: "taxi-app-12d70.firebaseapp.com",
    projectId: "taxi-app-12d70",
    storageBucket: "taxi-app-12d70.appspot.com",
    messagingSenderId: "388958605091",
    appId: "1:388958605091:web:78da90f7a70c22c14e8696",
    measurementId: "G-RHKQ0HW73M"
};

const app = firebase.initializeApp(firebaseConfig)

export default app