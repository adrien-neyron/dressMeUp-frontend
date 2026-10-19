import "./webFrame";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { LogBox, Text, View, Platform, StyleSheet } from "react-native";
import { WEB_FRAME_MAX_WIDTH } from "./webFrame";
LogBox.ignoreAllLogs();

const fetchFonts = async () => {
  await Font.loadAsync({
    "Lora-Regular": require("./assets/fonts/Lora/static/Lora-Regular.ttf"),
    "Lora-MediumItalic": require("./assets/fonts/Lora/static/Lora-MediumItalic.ttf"),
    "Lora-Bold": require("./assets/fonts/Lora/static/Lora-Bold.ttf"),
    "Lora-SemiBoldItalic": require("./assets/fonts/Lora/static/Lora-SemiBoldItalic.ttf"),
    "Lora-SemiBold": require("./assets/fonts/Lora/static/Lora-SemiBold.ttf"),
    "Lora-Medium": require("./assets/fonts/Lora/static/Lora-Medium.ttf"),
    // Vous pouvez charger d'autres polices ici si nécessaire
  });
};

import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import clothes from "./reducers/clothes";
import outfits from "./reducers/outfits";
// Pensez à importer vos reducers une fois qu'ils sont été exportés dans leurs fichiers respectifs

//import des différents screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

import CreateClotheA from "./screens/CreateClothes/CreateClotheA";
import CreateClotheB from "./screens/CreateClothes/CreateClotheB";
import CreateClotheC from "./screens/CreateClothes/CreateClotheC";
import CreateClotheD from "./screens/CreateClothes/CreateClotheD";
import CreateClotheE from "./screens/CreateClothes/CreateClotheE";
import CreateClotheF from "./screens/CreateClothes/CreateClotheF";
import SnapScreen from "./screens/SnapScreen";

import CreateOutfitA from "./screens/CreateOutfits/CreateOutfitA";
import CreateOutfitB from "./screens/CreateOutfits/CreateOutfitB";
import CreateOutfitC from "./screens/CreateOutfits/CreateOutfitC";
import CreateOutfitD from "./screens/CreateOutfits/CreateOutfitD";
import OverviewOutfit from "./screens/CreateOutfits/OverviewOutfit";

import ViewClotheA from "./screens/ViewClothes/ViewClotheA";
import ViewClotheB from "./screens/ViewClothes/ViewClotheB";
import ViewClotheC from "./screens/ViewClothes/ViewClotheC";
import ViewClotheD from "./screens/ViewClothes/ViewClotheD";

import ViewOutfitA from "./screens/ViewOutfits/ViewOutfitA";
import ViewOutfitB from "./screens/ViewOutfits/ViewOutfitB";
import ViewOutfitC from "./screens/ViewOutfits/ViewOutfitC";

// Fin de l'import des différents screens

const reducers = combineReducers({ user, clothes, outfits });
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "clothes", "outfits"]
};

// On crée un reducer persistant à partir de la config ci-dessus
const persistedReducer = persistReducer(persistConfig, reducers);

// On crée le store Redux avec la bonne configuration de middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // évite les erreurs liées à redux-persist
    }),
});

// On crée le persistor (passé ensuite au PersistGate)
const persistor = persistStore(store);

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

 if (!fontLoaded) {
  return <Text>Loading...</Text>;
}

  return (
    <View style={styles.page}>
    <View style={styles.frame}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />

            <Stack.Screen name= "CreateClotheA" component={CreateClotheA} />
            <Stack.Screen name="CreateClotheB" component={CreateClotheB} />
            <Stack.Screen name="CreateClotheC" component={CreateClotheC} />
            <Stack.Screen name="CreateClotheD" component={CreateClotheD} />
            <Stack.Screen name="CreateClotheE" component={CreateClotheE} />
            <Stack.Screen name="CreateClotheF" component={CreateClotheF} />
            <Stack.Screen name="SnapScreen" component={SnapScreen} />

            <Stack.Screen name="CreateOutfitA" component={CreateOutfitA} />
            <Stack.Screen name="CreateOutfitB" component={CreateOutfitB} />
            <Stack.Screen name="CreateOutfitC" component={CreateOutfitC} />
            <Stack.Screen name="CreateOutfitD" component={CreateOutfitD} />
            <Stack.Screen name="OverviewOutfit" component={OverviewOutfit} />

            <Stack.Screen name="ViewClotheA" component={ViewClotheA} /> 
            <Stack.Screen name="ViewClotheB" component={ViewClotheB} />
            <Stack.Screen name="ViewClotheC" component={ViewClotheC} />
            <Stack.Screen name="ViewClotheD" component={ViewClotheD} />

            <Stack.Screen name="ViewOutfitA" component={ViewOutfitA} />
            <Stack.Screen name="ViewOutfitB" component={ViewOutfitB} />
            <Stack.Screen name="ViewOutfitC" component={ViewOutfitC} /> 

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </View>
    </View>
  );
}

// Sur le web, l'app est centrée dans un cadre de largeur "téléphone".
// Sur mobile (Expo Go), ces styles n'ont aucun effet de mise en page.
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Platform.OS === "web" ? "#dfe8e4" : undefined,
  },
  frame: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? WEB_FRAME_MAX_WIDTH : undefined,
    overflow: "hidden",
  },
});
