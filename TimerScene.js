import React, { Component, PropTypes } from 'react'; 
import { StyleSheet, View, Text, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Timer from './TimerComponent'

const exercise = {
    FLAT_PLANK: {
      name: 'Flat Plank',
      duration: 55
    },
    LEFT_PLANK: {
      name: 'Left Plank',
      duration: 35
    },
    RIGHT_PLANK: {
      name: 'Right Plank',
      duration: 35
    },
    WALL_SIT: {
      name: 'Wall Sit',
      duration: 55
    }
}

export default class TimerScene extends Component { 

  constructor() {
    super();
    this.state = {
      running: false,
      exercise: exercise.FLAT_PLANK,

      interval: null,
      alarm: null,
      elapsed: 0,
      duration: exercise.FLAT_PLANK.duration,

      toggleTitle: 'Plank'
    };
  }

  render() { 
    return ( 
      <View style={styles.container}>

        <Text style={styles.exercise}>{this.state.exercise.name}</Text>

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
        this._startUpdates();
        this._startTimer()
        this.setState({ toggleTitle: 'Flop' });
      } else {
        this._endUpdates();
        this._endTimer();
        this.setState({ toggleTitle: 'Plank' });
      }
    }
  }

  _startUpdates() {
    const interval = setInterval(() => {
        const lastTime = this.state.elapsed;
        this.setState({ elapsed: lastTime + 1 });
    }, 1000);

    this.setState({ interval: interval });
  }

  _endUpdates() {
    clearInterval(this.state.interval);
  }

  _startTimer() {
    const remainingSeconds = this.state.duration - this.state.elapsed;
    const alarm = setTimeout(() => {
      let nextExercise;
      switch (this.state.exercise.name) {
        case exercise.FLAT_PLANK.name:
          nextExercise = exercise.LEFT_PLANK;
          break;
        case exercise.LEFT_PLANK.name:
          nextExercise = exercise.RIGHT_PLANK;
          break;
        case exercise.RIGHT_PLANK.name:
          nextExercise = exercise.WALL_SIT;
          break;
        case exercise.WALL_SIT.name:
          nextExercise = exercise.FLAT_PLANK;
          break;
      }
      
      this.setState({ 
        elapsed: 0,
        duration: nextExercise.duration,
        exercise: nextExercise,
        running: false
      });
    }, remainingSeconds * 1000);
    this.setState({ alarm: alarm });
  }

  _endTimer() {
    clearTimeout(this.state.alarm);
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