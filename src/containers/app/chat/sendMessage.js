import firebase from 'firebase'
export const senderMsg = async (msgValue, currentUserId, guestUserId, img, token, Sendername) => {
    console.log(msgValue, currentUserId, guestUserId, token, "VVVVVVVVVVVVVVVVVVV");
    try {
        return await firebase.database().ref('messages/' + currentUserId).child(guestUserId).push({
            message: {
                sender: currentUserId,
                receiver: guestUserId,
                msg: msgValue,
                img: img
            }
        }).then(res => {
        })

    } catch (error) {
        return error
    }
}

export const ReceivedMsg = async (msgValue, currentUserId, guestUserId, img) => {
    try {
        return await firebase.database().ref('messages/' + guestUserId).child(currentUserId).push({
            message: {
                sender: currentUserId,
                receiver: guestUserId,
                msg: msgValue,
                img: img
            }
        })

    } catch (error) {
        return error
    }
}