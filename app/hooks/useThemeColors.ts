import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function useThemeColors() {
  const scheme = useColorScheme() ?? 'light';
  return Colors[scheme];
}
