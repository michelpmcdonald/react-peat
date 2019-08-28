import React, { Component } from 'react'

import ReplayComponent from './replayComponent'
import LightChart from './lightChart'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  ws = new WebSocket('ws://localhost:8080/ws')

  constructor(props) {
    super(props)
    this.state = { lastTrd: {amt: 0.0, vol: 0, time: null} }
  }

  componentDidMount() {
    this.ws.onOpen = () => { console.log('connected') }

    this.ws.onmessage = evt => {
      let trd = JSON.parse(evt.data)
      let dt = new Date(parseInt(trd.stamp, 10))
      dt.setMilliseconds(0)
      dt.setSeconds(0)
      let prc = parseFloat(trd.Amt)
      let vol = parseInt(trd.Vol)
      // console.log('...')
      this.setState(state => ({ lastTrd: {amt: prc, vol: vol, time: dt} }))
    }

    this.ws.onclose = () => { console.log('disconnected') }

    this.ws.onerror = function(e) {
      console.log('WebSocket Error: ', e)
    }
  }

  render() {
    return (
      <div className={styles.test}>
        <LightChart lastTrd={this.state.lastTrd} />
        <br />
        <ReplayComponent ws={this.ws} />
      </div>
    )
  }
}
