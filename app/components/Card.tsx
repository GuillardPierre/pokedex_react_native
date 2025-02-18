import { View, ViewProps, ViewStyle } from 'react-native';
import { Shadows } from '../constants/Shadows';
import { useThemeColors } from '../hooks/useThemeColors';

type Props = ViewProps;

export default function Card({ style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[style, styles, { backgroundColor: colors.grayWhite }]}
      {...rest}
    ></View>
  );
}

const styles = {
  borderRadius: 8,
  ...Shadows.dp2,
  overflow: 'hidden',
} satisfies ViewStyle;
