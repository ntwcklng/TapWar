import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import GameView from './Views/GameView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

const TapWar = function() {
  return (
    <View style={styles.container}>
      <GameView />
    </View>
  );
};
export default TapWar;
