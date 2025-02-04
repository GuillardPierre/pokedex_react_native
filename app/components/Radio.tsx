import { StyleSheet, View } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

type Props = {
  checked: boolean;
};

export default function Radio({ checked, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {checked && (
        <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 16,
    height: 16,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    borderRadius: 7,
    height: 7,
    width: 7,
  },
});
