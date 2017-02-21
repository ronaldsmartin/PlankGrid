/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import TimerScene from './TimerScene'

export default class PlankGrid extends Component {
  render() {
    return (
      <TimerScene />
    );
  }
}

AppRegistry.registerComponent('PlankGrid', () => PlankGrid);
