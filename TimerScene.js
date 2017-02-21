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

      toggleTitle: 'Plank'
    };
  }

  render() { 
    return ( 
      <View style={styles.container}>

        <Timer 
            elapsed={this.state.elapsed}
            duration={this.state.duration} />

        <Button 
            onPress={() => {
              this.setState({ running: !this.state.running });

              if (this.state.running) {

                const interval = setInterval(() => {
                    const lastTime = this.state.elapsed;
                    this.setState({ elapsed: lastTime + 1 });
                }, 1000);

                this.setState({ 
                    toggleTitle: 'Flop',
                    interval: interval
                });
              } else {
                clearInterval(this.state.interval);

                this.setState({ toggleTitle: 'Plank' });
              }
            }} 
            title={this.state.toggleTitle} 
            color="#841584" 
            accessibilityLabel="Start or pause timers" />
      </View>
    ) 
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
  }
});