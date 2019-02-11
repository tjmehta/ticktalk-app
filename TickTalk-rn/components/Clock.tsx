import moment from 'moment'
import React, { PureComponent } from 'react'
import { StyleSheet, Text } from 'react-native'

type Props = {
  style: StyleProp<TextStyle>
}

type State = {
  time: String
}

function getTimeString(): String {
  return moment().format('h:mm A')
}

export default class Clock extends PureComponent<Props, State> {
  state: State = {
    time: getTimeString(),
  }

  componentDidMount() {
    setInterval(this._handleInterval, 1000)
  }

  _handleInterval = () => {
    this.setState({ time: getTimeString() })
  }

  render() {
    return <Text style={this.props.style}>{this.state.time}</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
