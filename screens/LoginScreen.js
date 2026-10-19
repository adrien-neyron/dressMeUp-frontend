import SignIn from "../Components/functionalcomponents/Signin";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/Logo.png")}
          resizeMode="contain"
        />
      </View>
      <SignIn navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#6B9080",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgContainer: {
    width: "100%",
    paddingBottom: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: Platform.OS === "web"
    ? {
        // Sur le web, aspectRatio est ignoré ici : le logo s'étirait sur toute la hauteur
        // et repoussait le formulaire hors de l'écran. Taille explicite (carrée).
        width: windowWidth * 0.5,
        height: windowWidth * 0.5,
      }
    : {
        width: "50%",
        height: undefined,
        aspectRatio: 1, // Permet de conserver les proportions de l'image pour qu'elle ne soit pas déformée
      },
});
