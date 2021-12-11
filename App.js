import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
let work_time = 25*60;
let break_time = 5*60;

export default class App extends React.Component {
  state = {
    time: work_time,
    mode: 'WORK',
    type: 'START',
  };

  componentDidMount() {
    setInterval(this.dec, 1000);
  }

  dec = () => {
    if (this.state.time > 0 && this.state.type === 'START') {
      this.setState({ time: this.state.time - 1 });
    }
    if (this.state.time === 0 && this.state.mode == 'WORK') {
      this.setState({ time: break_time, mode: 'BREAK' });
    }
    if (this.state.time === 0 && this.state.mode == 'BREAK') {
      this.setState({ time: work_time, mode: 'WORK' });
    }
  };

  stop = () => {
    this.setState({ type: 'STOP' });
  };
  start = () => {
    this.setState({ type: 'START' });
  };
  reset = () => {
    this.setState({ type: 'STOP', time: work_time , mode: 'WORK' });
  };

  render() {
    return (
      <View
        style={[
          this.state.mode === 'WORK'
            ? styles.container_work
            : styles.container_break,
        ]}>
        <Text style={styles.heading}> POMODORO </Text>
        <Text style={styles.text}> {this.state.mode} </Text>
        <Text style={styles.text}>
          {Math.floor(this.state.time / 60)} {': '}
          {this.state.time % 60}
        </Text>
        {this.state.type === 'START' && (
          <Pressable onPress={this.stop} style={styles.button}>
            <Text style={[
                styles.text_button,
                this.state.mode === 'WORK'
                  ? {color:'#ff6e6e'}
                  : {color:"#6eb7ff"}
              ]}>STOP</Text>
          </Pressable>
        )}
        {this.state.type === 'STOP' && (
          <Pressable onPress={this.start} style={styles.button}>
            <Text
              style={[
                styles.text_button,
                this.state.mode === 'WORK'
                  ? {color:'#ff6e6e'}
                  : {color:"#6eb7ff"}
              ]}>
              START
            </Text>
          </Pressable>
        )}
        <Pressable onPress={this.reset} style={styles.button} color="white">
          <Text style={[
                styles.text_button,
                this.state.mode === 'WORK'
                  ? {color:'#ff6e6e'}
                  : {color:"#6eb7ff"}
              ]}>RESET</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_work: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#ff6e6e',
  },
  container_break: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#6eb7ff',
  },
  heading: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  text: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    alignItems: 'center',
    margin:2,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text_button: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    // color: 'blue',
  },
});
