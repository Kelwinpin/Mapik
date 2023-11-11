import { View, StyleSheet, Image } from "react-native";
const foto = require("../../../assets/vale.png");

export function Announcement(){
    return(
        <View style={styles.categoryImage} >
            <Image source={foto} />
        </View>
    )
}

const styles = StyleSheet.create({
  categoryImage: {
    display:"flex",
    alignContent:"center",
    padding: 8,
  },
})