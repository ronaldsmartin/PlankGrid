import React, { Component } from 'react'; 
import { StyleSheet, View, Text, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default class Timer extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     elapsed: 0,
  //     duration: 60
  //   };
  // }

  render() {
    const fillPercent = this.props.elapsed / this.props.duration * 100;

    return (
      <AnimatedCircularProgress
        ref='progressBar'
        size={200}
        width={3}
        fill={fillPercent}
        tintColor="#00e0ff"
        backgroundColor="#3d5875">
        {
          (fill) => (
            <Text style={styles.timeText}>
              { Math.round(this.props.duration - this.props.elapsed) }
            </Text>
          )
        }
      </AnimatedCircularProgress>
    )
  }
}


const styles = StyleSheet.create({
  timeText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 72,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: "100"
  },
  progressBar: {
    tintColor: '#00e0ff',
    backgroundColor: '#3d5875'
  }
});