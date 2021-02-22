import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  keyboardAvoidingView: { flexGrow: 1, flexShrink: 1 },
  scrollView: { flexGrow: 1, flexShrink: 1 },
  scrollViewContainer: {},
  list: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});