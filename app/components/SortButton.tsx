import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import React, { useRef } from 'react';
import ThemedText from './ThemedText';
import Card from './Card';
import Row from './row';
import Radio from './Radio';
import { Shadows } from '../constants/Shadows';

type Props = {
  value: 'id' | 'name';
  onChange: (s: 'id' | 'name') => void;
};

const options = [
  { label: 'Number', value: 'id' },
  { label: 'Name', value: 'name' },
] as const;

export default function SortButton({ value, onChange, ...rest }: Props) {
  const buttonRef = useRef<View>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [position, setPosition] = React.useState<null | {
    top: number;
    right: number;
  }>({ top: 0, right: 0 });

  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get('window').width - x - width,
      });
      setModalVisible(true);
    });
  };
  const onClose = () => {
    setModalVisible(false);
  };
  const colors = useThemeColors();
  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            style={{ width: 32, height: 32 }}
            source={
              value === 'id'
                ? require('@/assets/images/sortId.png')
                : require('@/assets/images/sortName.png')
            }
          ></Image>
        </View>
      </Pressable>
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={onClose}
        animationType="fade"
      >
        <Pressable style={styles.backdrop}></Pressable>
        <View
          style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
        >
          <ThemedText
            style={styles.title}
            variant="subtitle2"
            color="grayWhite"
          >
            Sort by:
          </ThemedText>
          <Card style={styles.card}>
            {options.map((option) => (
              <Pressable
                onPress={() => onChange(option.value)}
                key={option.value}
              >
                <Row key={option.value} gap={8}>
                  <Radio checked={option.value === value} />
                  <ThemedText>{option.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popup: {
    position: 'absolute',
    width: 113,
    padding: 4,
    borderRadius: 12,
    paddingTop: 16,
    gap: 16,
    ...Shadows.dp2,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
});
