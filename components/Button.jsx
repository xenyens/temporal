import { StyleSheet, Pressable, Text } from 'react-native';

const CustomButton = ({ title, onPress, customColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={StyleSheet.create({
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 20,
        backgroundColor: customColor,
      })}
    >
      <Text style={styles.buttonStyleText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
