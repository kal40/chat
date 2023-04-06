import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert } from "react-native";

import Welcome from "./components/Welcome";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAF1iTjATeVxab7gf6fXryHNmh1w9vZsgU",
    authDomain: "chat-smartcoder.firebaseapp.com",
    projectId: "chat-smartcoder",
    storageBucket: "chat-smartcoder.appspot.com",
    messagingSenderId: "292555548015",
    appId: "1:292555548015:web:3e8884e05c86d3ca46749a",
  };
  const connectionStatus = useNetInfo();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
