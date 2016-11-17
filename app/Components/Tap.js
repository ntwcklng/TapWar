import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default class Tap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: this.props.color}]} onPress={() => this.props.handleTap()}><Text>{this.props.actualTaps}</Text></TouchableOpacity>
    );
  }
}
