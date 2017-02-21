import React, { Component, PropTypes } from 'react'; 
import { StyleSheet, View, Text, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Timer from './TimerComponent'


export default class TimerScene extends Component { 

  constructor() {
    super();
    this.state = {
      running: false,

      interval: null,
      elapsed: 0,
      duration: 60,

      exerciseName: 'Flat Plank',
      toggleTitle: 'Plank'
    };
  }

  render() { 
    return ( 
      <View style={styles.container}>

        <Text style={styles.exercise}>{this.state.exerciseName}</Text>

        <Timer 
            elapsed={this.state.elapsed}
            duration={this.state.duration} />

        <Button 
            onPress={() => {
              this.setState({ running: !this.state.running });
            }} 
            title={this.state.toggleTitle} 
            color="#841584" 
            accessibilityLabel="Start or pause timers" />
      </View>
    ) 
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.running != this.state.running) {
      if (this.state.running) {
        this._startTimer();
      } else {
        clearInterval(this.state.interval);
        this.setState({ toggleTitle: 'Plank' });
      }
    }
  }

  _startTimer() {
    const interval = setInterval(() => {
        const lastTime = this.state.elapsed % this.state.duration;
        this.setState({ elapsed: lastTime + 1 });
    }, 1000);

    this.setState({ 
        toggleTitle: 'Flop',
        interval: interval
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#152d44',
    padding: 50
  },
  exercise: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    bottom: 20,
    color: '#FFFFFF',
    fontSize: 65,
    fontWeight: "100"
  }
});