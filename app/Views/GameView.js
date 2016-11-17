import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';

import Tap from '../Components/Tap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  tapField: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  tapFieldText: {
    fontSize: 36,
    color: 'rgba(255,255,255,.3)',
    alignSelf: 'center',
  },
  hide: {
    width: 0,
    height: 0,
  }

});

export default class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      animScore: new Animated.Value(0),
      activeGame: false,
      winner: '',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    }
  }
  _handleTap(id) {
    const { score, activeGame, animScore } = this.state;
    if (!activeGame) return;
    let actualScore = score;
    if (id === 1) {
      actualScore--;
    } else {
      actualScore++;
    }
    animScore.setValue(actualScore);
    this.setState({
      score: actualScore
    }, () => {
      if (this.state.score === 10 || this.state.score === -10) {
        const playerWon = (this.state.score >= 10) ? 'Rot' : 'Blau';
        this.setState({activeGame: false, winner: playerWon});
      }
    });
  }
  _initGame() {
    this.setState({
      activeGame: true,
      score: 0,
      animScore: new Animated.Value(0),
      winner: '',
    });
  }
  render() {
    const { score, winner, height, width, animScore, activeGame } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._handleTap(1)} style={[styles.tapField, {backgroundColor: '#44bcff'}]}>
          <Text style={[styles.tapFieldText, {transform: [{rotate: '180deg'}]}]}>{!winner && score} {winner && `${winner} hat Gewonnen!`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._handleTap(2)} style={[styles.tapField, {backgroundColor: '#e74c3c'}]}>
          <Text style={styles.tapFieldText}>{!winner && score} {winner && `${winner} hat Gewonnen!`}</Text>
        </TouchableOpacity>
        <Animated.View style={
          {
            backgroundColor: '#ecf0f1',
            borderRadius: 4,
            width: 50,
            height: 40,
            left: (width / 2) - 25,
            position: 'absolute',
            top: animScore.interpolate({ inputRange: [-10, 10], outputRange: [0, height - 40] })
          }
        }>
        {!activeGame &&
          <TouchableOpacity onPress={() => this._initGame()} style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center', lineHeight: 40}}>START</Text>
          </TouchableOpacity>
        }
        </Animated.View>
      </View>
    );
  }
}
