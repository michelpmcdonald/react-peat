import React, { Component } from 'react'

import ReplayComponent from './replayComponent'
import LightChart from './lightChart'

import styles from './styles.css'

export default class MarketReplay extends Component {
  ws = new WebSocket('ws://localhost:8080/ws')

  constructor(props) {
    super(props)
    this.state = { lastTrd: {amt: 0.0, vol: 0, time: null} }
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    this.ws.onOpen = () => { console.log('connected') }

    this.ws.onmessage = evt => {
      let trd = JSON.parse(evt.data)
      let dt = new Date(parseInt(trd.stamp, 10))
      //dt.setMilliseconds(0)
      //dt.setSeconds(0)
      let prc = parseFloat(trd.Amt)
      let vol = parseInt(trd.Vol)
      this.chartRef.current.onTrade({amt: prc, vol: vol, time: dt})
    }

    this.ws.onclose = () => { console.log('disconnected') }

    this.ws.onerror = function(e) {
      console.log('WebSocket Error: ', e)
    }
  }

  componentWillUnmount () {
    this.ws.close()
  }

  render() {
    return (
      <div className={styles.test}>
        <LightChart ref={this.chartRef} />
        <br />
        <ReplayComponent ws={this.ws} />
      </div>
    )
  }
}
