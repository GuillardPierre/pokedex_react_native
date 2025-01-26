import { StyleSheet, Text, View } from "react-native";
import { Link, useNavigation } from '@react-navigation/native';


export default function Index() {

  // Permet de créer les styles de manières plus propre
  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    }
  })

  const navigation = useNavigation();

  return (
      // View permet de créer un container un peu comme une div en HTML
      <View
        style={style.container}
      >
        <Text>Edit app/index.tsx to edit this screen </Text>
        <Link href="/page2">About</Link>
      </View>
  );
}
