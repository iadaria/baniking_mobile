import { fonts } from 'common/constants/fonts';
import React from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ margin: 20 }}>
          <Text style={styles.text1}>Test</Text>
          <Text style={styles.text11}>Test</Text>
          <Text style={styles.text12}>Test</Text>
          <Text style={styles.text2}>Test</Text>
          <Text style={styles.text3}>Test</Text>
          <Text style={styles.text4}>Test</Text>
          <Text style={styles.text5}>Test</Text>
          <Text style={styles.text6}>Test</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  text1: {
    fontSize: 20,
  },
  text2: {
    fontSize: 20,
    fontFamily: fonts.Gilroy.bold,
  },
  text11: {
    fontSize: 20,
    fontFamily: fonts.Gilroy.light,
  },
  text12: {
    fontSize: 20,
    fontFamily: fonts.Gilroy.medium,
  },
  text3: {
    fontSize: 20,
    fontFamily: fonts.Trajan.regular,
  },
  text4: {
    fontSize: 20,
    fontFamily: fonts.SeogoeUI.light,
  },
  text5: {
    fontSize: 20,
    fontFamily: fonts.SFProText.regular,
  },

  text6: {
    fontSize: 20,
    fontFamily: fonts.Gilroy.light,
  },
});
