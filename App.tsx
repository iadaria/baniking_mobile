import React from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text>Test</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
