import React from 'react';
import { Text, View, StyleSheet} from "react-native";
import Modal from "react-native-modal";

const PopUp = ({title, visibility, changeVisibility}) => {
    setTimeout(() => {changeVisibility(false)}, 2500)
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visibility}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>{title}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center"
    }
});

export default PopUp;