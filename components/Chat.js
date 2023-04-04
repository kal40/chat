import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container(backgroundColor)}>
      <Text>Hello {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //this way a variable can be passed to the style
  container: (backgroundColor) => {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
    };
  },
});

export default Chat;
