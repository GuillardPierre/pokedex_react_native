import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from './components/ThemedText';
import { useThemeColors } from './hooks/useThemeColors';
import Card from './components/Card';

export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: colors.tint },
        style.container,
      ]}
    >
      <Card>
        <ThemedText variant="headline" color="grayDark">
          Pokedex
        </ThemedText>
      </Card>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
