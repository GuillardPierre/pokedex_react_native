import { StyleProp, View, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  gap?: number;
  children?: React.ReactNode; // Ajoutez cette ligne pour accepter les enfants
};

export default function Row({ style, gap, children, ...rest }: Props) {
  return (
    <View style={[rowStyle, style, gap ? { gap: gap } : undefined]} {...rest}>
      {children}
    </View>
  );
}

const rowStyle: ViewStyle = {
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
};
